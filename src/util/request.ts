import i18n from "./i18n";

export interface RequestOptions extends RequestInit {
	errorToast?: boolean;
	returnRequest?: boolean;
	returnBuffer?: boolean;
	throwNonJson?: boolean;
	timeout?: number;
	awaitRateLimit?: boolean;
}

export type RequestResult =
	| string
	| {
			response: Response;
			body: string;
	  };

export var defaultTimeout = 5000;

// TODO: rate limit buckets (but aren't high priority for normal user clients)
const RateLimitBuckets = new Map();

// TODO: make different rate limit buckets for different instances
// TODO: optimistic/predict rate limits with instance config
// TODO: decide what default value throwNonJson should have

export async function request(url: string, opts?: RequestOptions): Promise<RequestResult> {
	try {
		if (!opts) opts = {};
		if (!opts.headers) opts.headers = {};
		const controller = new AbortController();
		var timeout;
		var response: Response;
		if (opts.timeout == null) opts.timeout = defaultTimeout;
		if (opts.awaitRateLimit == null) opts.awaitRateLimit = true;
		if (opts.timeout && opts.timeout > 0) {
			opts.signal = controller.signal;

			timeout = setTimeout(() => controller.abort(), opts.timeout);
		}
		if (opts.body) {
			if (!opts.method) opts.method = "POST";
			if (typeof opts.body === "object") {
				opts.body = JSON.stringify(opts.body);
				// @ts-ignore
				opts.headers["content-type"] = "application/json";
			}
		}

		try {
			response = await fetch(url, opts);
			if (timeout) clearTimeout(timeout);
			if (response.status === 429) {
				// rate limit is given in seconds: https://discord.com/developers/docs/topics/rate-limits
				var rateLimit = Number(
					response.headers.get("X-RateLimit-Reset-After") || response.headers.get("Retry-After")
				);
				if (isNaN(rateLimit)) rateLimit = 5;
				if (opts.awaitRateLimit)
					return new Promise((res) => setTimeout(() => res(request(url, opts)), rateLimit * 1000));

				throw i18n.t("rateLimit", { seconds: rateLimit });
			}
		} catch (error) {
			if (!window.navigator?.onLine) {
				defaultTimeout += 3000; // for poor connections make timeout higher
				if (defaultTimeout > 30000) defaultTimeout = 30000;
				throw i18n.t("offline");
			}
			throw i18n.t("serverOffline");
		}

		// TODO: if 500 internal error or opts.errorToast => show error toast

		var { ok } = response;
		var result: any;
		if (opts.returnBuffer) {
			result = await response.arrayBuffer();
		} else {
			const body = await response.text();

			try {
				result = JSON.parse(body);
			} catch (error) {
				if (opts.throwNonJson) ok = false;
				result = body;
			}
		}

		if (!ok) {
			if (result) {
				if (typeof result === "object") {
					if (result?.code === 50035) {
						opts.errorToast = false;
						throw result.errors;
					}
					throw result.message || result.error;
				}
				throw result;
			}
			throw response.statusText;
		}

		if (opts.returnRequest)
			return {
				response,
				body: result,
			};

		return result;
	} catch (error) {
		if (opts?.errorToast) {
			// TODO: show error toast
		}
		throw error;
	}
}

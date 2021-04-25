import { Network } from "../reducers/networks";
import i18n from "./i18n";

export interface RequestOptions extends RequestInit {
	errorToast?: boolean;
	returnBuffer?: boolean;
	throwErrors?: boolean;
	throwNonJson?: boolean;
	timeout?: number;
	awaitRateLimit?: boolean;
	network?: Network;
	body?: any;
}

export type RequestResult = {
	response?: any;
	body?: string | any;
	error?: any;
};

export var defaultTimeout = 5000;

// TODO: rate limit buckets (but aren't high priority for normal user clients)
const RateLimitBuckets = new Map();

// TODO: make different rate limit buckets for different networks
// TODO: optimistic/predict rate limits with network config

export async function request(url: string, opts?: RequestOptions): Promise<RequestResult> {
	if (!opts) opts = {};
	if (!url.startsWith("http") && opts.network) {
		if (url.startsWith("/")) url = url.slice(1);
		url = `${opts.network.api}/v${opts.network.version}/${url}`;
	}
	if (!opts.headers) opts.headers = {};
	if (!opts.mode) opts.mode = "cors";
	if (!opts.referrerPolicy) opts.referrerPolicy = "no-referrer";

	var result: any;
	const controller = new AbortController();
	var timeout;
	var response: Response | undefined = undefined;

	if (opts.timeout == null) opts.timeout = defaultTimeout;
	if (opts.awaitRateLimit == null) opts.awaitRateLimit = true;
	if (opts.throwNonJson == null) opts.throwNonJson = true;
	if (opts.throwErrors == null) opts.throwErrors = false;
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
			if (opts.network?.discord) throw i18n.t("discordCORSIssue");
			throw i18n.t("serverOffline");
		}

		// TODO: if 500 internal error or opts.errorToast => show error toast

		var { ok } = response;
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
			if (typeof result === "string" && result.length === 0) result = null;
			if (result && !(result instanceof ArrayBuffer)) {
				if (typeof result === "object") {
					if (result?.code === 50035) {
						opts.errorToast = false;
						throw result.errors;
					}
					const message = result.message || result.error;
					if (message) throw message;
				}
				throw result;
			}
			throw response.statusText || response.status;
		}

		return {
			response,
			body: result,
			error: null,
		};
	} catch (error) {
		if (opts?.errorToast) {
			// TODO: show error toast
		}
		if (opts?.throwErrors) {
			throw error;
		}

		return { error, response, body: result };
	}
}

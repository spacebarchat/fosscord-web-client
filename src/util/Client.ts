import OPCodeHandlers from "./opcodes/";
import "missing-native-js-functions";
import { UAParser } from "ua-parser-js";

// TODO: zlib
window.sleep = function (ms) {
	return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

export class Client {
	connection!: WebSocket;
	heartbeat_interval?: number;
	heartbeat_timeout?: number;
	last_sequence?: number;
	last_connect: number = 0;

	constructor(
		public url: string,
		public options: {
			token: string;
			presence?: any;
		}
	) {
		if (!window.WebSocket) throw new Error("Your browser is not supported");
		this.connect();
	}

	async connect() {
		const last_connect = Date.now() - this.last_connect;
		console.log("[WebSocket] last_connect: ", last_connect);
		if (last_connect <= 1000) {
			console.log("[WebSocket] Delaying connect: prevent rate limit");
			await window.sleep(1000 - last_connect);
		}
		this.connection = new WebSocket(this.url);

		this.connection.onclose = this.onClose;
		this.connection.onerror = this.onError;
		this.connection.onmessage = this.onMessage;
		this.connection.onopen = this.onOpen;
		this.last_connect = Date.now();
	}

	sendHeartbeat = () => {
		this.send({ op: 1, d: this.last_sequence });
		if (!this.heartbeat_timeout) clearTimeout(this.heartbeat_timeout);

		this.heartbeat_timeout = setTimeout(() => {
			console.log("timeout");
			this.connection.close(4009);
		}, 1000 * 60) as any;
	};

	send = (data: any) => {
		console.log("[WebSocket] send ~>", data);
		this.connection.send(JSON.stringify(data));
	};

	identify = () => {
		const UAData = new UAParser().getResult();

		var platform = window.cordova?.platformId;

		var browser;
		if (["osx", "windows"].includes(platform)) browser = "Discord Client";
		else if (platform === "ios") browser = "Discord iOS";
		else if (platform === "android") browser = "Discord Android";
		else browser = UAData.browser.name || "Unknown";

		this.send({
			op: 2,
			d: {
				token: this.options.token,
				properties: {
					browser,
					browser_user_agent: UAData.ua,
					browser_version: UAData.browser.version,
					client_build_number: 83364,
					client_event_source: null,
					client_version: "0.0.262",
					device: "",
					os: UAData.os.name,
					os_version: UAData.os.version,
					os_arch: "x64",
					referrer: "",
					referrer_current: "",
					referring_domain: "",
					referring_domain_current: "",
					release_channel: "stable",
					system_locale: window.navigator.language,
				},
				capabilities: 61,
				client_state: {
					guild_hashes: {},
					highest_last_message_id: "0",
					read_state_version: 0,
					user_guild_settings_version: -1,
				},
				compress: false,
				presence: {
					activities: [],
					afk: false,
					since: 0,
					status: "online",
				},
			},
		});
	};

	onMessage = async (event: MessageEvent) => {
		const data = JSON.parse(event.data);
		console.log(`[WebSocket] got <~`, data);
		if (!data) return;
		if (data.s) this.last_sequence = data.s;

		try {
			// @ts-ignore
			const handler = OPCodeHandlers[data.op];

			await handler.call(this, data);
		} catch (error) {
			console.error("[WebSocket] OP unkown", data);
		}
	};

	onOpen = () => {
		console.log(`[WebSocket] Connected`);
	};

	onError = (error: Event) => {
		console.error(`[WebSocket] Error`, error);
		if (!this.connection.CLOSED && this.connection.CLOSING) this.connection.close(4000);
	};

	onClose = (event: CloseEvent) => {
		console.error(`[WebSocket] Closed`, event.code);
		if (this.heartbeat_interval) clearInterval(this.heartbeat_interval);

		this.connect();
	};
}

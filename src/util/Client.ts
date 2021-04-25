export class Client {
	connection!: WebSocket;

	constructor(public url: string, options: {}) {
		if (!window.WebSocket) throw new Error("Your browser is not supported");
		this.connect();
	}

	connect() {
		this.connection = new WebSocket(this.url);

		this.connection.onclose = this.onClose;
		this.connection.onerror = this.onError;
		this.connection.onmessage = this.onMessage;
		this.connection.onopen = this.onOpen;
	}

	onMessage = (event: MessageEvent) => {
		console.log(`[WebSocket] Message`, event);
	};

	onOpen = () => {
		console.error(`[WebSocket] Opened`);
	};

	onError = (error: Event) => {
		console.error(`[WebSocket] Error`, error);
		this.connection.close(4000);
	};

	onClose = (event: CloseEvent) => {
		console.error(`[WebSocket] Closed`, event.code);
		this.connect();
	};
}

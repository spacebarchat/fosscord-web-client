import { Client } from "../Client";

export function Heartbeat(this: Client) {
	this.sendHeartbeat();
}

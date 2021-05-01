import { Payload } from ".";
import { Client } from "../Client";

export function Hello(this: Client, data: Payload) {
	this.heartbeat_interval = setInterval(this.sendHeartbeat, data.d.heartbeat_interval) as any;
	this.identify();
}

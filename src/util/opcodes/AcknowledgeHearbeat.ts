import { Client } from "../Client";

export function AcknowledgeHearbeat(this: Client) {
	clearTimeout(this.heartbeat_timeout);
}

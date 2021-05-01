import { Client } from "../Client";
import { Payload } from "../opcodes";

export function READY(this: Client, data: Payload) {
	console.log("READY", this, data);
}

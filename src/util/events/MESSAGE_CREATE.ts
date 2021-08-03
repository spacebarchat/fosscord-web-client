import { Client } from "../Client";
import { Payload } from "../opcodes";

export function MESSAGE_CREATE(this: Client, data: Payload) {
	// @ts-ignore
	console.log(`[Event] MESSAGE_CREATE in `, performance.now() - window.startTime);
	//const { d } = data;

	//console.log(d);
}

import { Client } from "../Client";
import { Payload } from "../opcodes";
import store from "../store";

export function CHANNEL_CREATE(this: Client, data: Payload) {
	// @ts-ignore
	console.log(`[Event] CHANNEL_CREATE in `, performance.now() - window.startTime);
	const { d } = data;

	console.log(d);

	store.dispatch({ type: "UPDATE_GUILDS", payload: d });
}

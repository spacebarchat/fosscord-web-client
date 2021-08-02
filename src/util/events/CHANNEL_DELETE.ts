import { Client } from "../Client";
import { Payload } from "../opcodes";
import store from "../store";

export function CHANNEL_DELETE(this: Client, data: Payload) {
	// @ts-ignore
	console.log(`[Event] CHANNEL_DELETE in `, performance.now() - window.startTime);
	const { d } = data;

	console.log(d);

	store.dispatch({ type: "REMOVE_CHANNELS", payload: d });
}

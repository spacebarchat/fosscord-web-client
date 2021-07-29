import { Client } from "../Client";
import { Payload } from "../opcodes";
import store from "../store";

export function GUILD_DELETE(this: Client, data: Payload) {
	// @ts-ignore
	console.log(`[Event] DELETE_GUILD in `, performance.now() - window.startTime);
	const { d } = data;

	console.log(d);

	store.dispatch({ type: "REMOVE_GUILDS", payload: d });
}

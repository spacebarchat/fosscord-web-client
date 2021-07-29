import { Client } from "../Client";
import { Payload } from "../opcodes";
import store from "../store";

export function GUILD_CREATE(this: Client, data: Payload) {
	// @ts-ignore
	console.log(`[Event] GUILD_CREATE in `, performance.now() - window.startTime);
	const { d } = data;

	console.log(d);

	store.dispatch({ type: "ADD_GUILDS", payload: d });
}

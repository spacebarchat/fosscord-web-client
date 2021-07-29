import { Client } from "../Client";
import { Payload } from "../opcodes";
import store from "../store";

export function READY(this: Client, data: Payload) {
	// @ts-ignore
	console.log(`[Event] Ready in `, performance.now() - window.startTime);
	const { d } = data;

	//console.log(this);
	console.log(d);

	store.dispatch({ type: "UPDATE_GUILDS", payload: d.guilds });
	store.dispatch({ type: "UPDATE_USERS", payload: d.users });
	store.dispatch({ type: "UPDATE_USER", payload: d.user });
}

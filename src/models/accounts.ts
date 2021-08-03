import Model from "redux-orm";
import { Client } from "../util/Client";
import { Guild } from "./guilds";

export class NetworkModel extends Model {
	static modelName = "Network";
}

export function accounts(state = [], action: any) {
	switch (action.type) {
		case "ADD_ACCOUNT":
			return [...state, action.payload];
		case "REMOVE_ACCOUNT":
			return state.filter((x) => x !== action.payload);
		default:
			return state;
	}
}

export interface Account {
	network_id?: string;
	user_id: string;
	token: string;
	client: Client;
	user_settings: any;
	guilds: Guild[];
}

export interface AccountState {
	accounts: string[];
}

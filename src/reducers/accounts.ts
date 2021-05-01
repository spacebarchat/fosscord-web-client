import { Client } from "../util/Client";

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

export interface AccountAction {
	type: "ADD_ACCOUNT";
}

export interface Account {
	network_id: string;
	user_id: string;
	token: string;
	client: Client;
	user_settings: any;
}

export interface AccountState {
	accounts: string[];
}

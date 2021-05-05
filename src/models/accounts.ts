import { arrayReducer } from ".";
import { Client } from "../util/Client";
import { Network } from "./networks";

export const accounts = arrayReducer<Account>("ACCOUNT");

export interface AccountAction {
	type: "ADD_ACCOUNT";
}

export interface Account {
	network: Network;
	user_id: string;
	token: string;
	client: Client;
	user_settings: any;
}

export interface AccountState {
	accounts: string[];
}

import { Account } from "../models/accounts";
import { Client } from "../util/Client";
import store from "../util/store";

export function connectAccount(account: Partial<Account>) {
	if (!account.token) return null;
	// @ts-ignore
	if (!account.client || !(account.client instanceof Client)) {
		console.log("connectAccount", account);
		// @ts-ignore
		account.client = new Client(account.network.gateway, { token: account.token });
	}

	return account;
}

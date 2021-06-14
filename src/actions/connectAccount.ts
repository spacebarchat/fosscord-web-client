import { Account } from "../models/accounts";
import { Client } from "../util/Client";
import store from "../util/store";
import { networks } from "../models/networks";

export function connectAccount(account: Partial<Account>) {
	if (!account.token) return null;
	// @ts-ignore
	if (!account.client || !(account.client instanceof Client)) {
		console.log("connectAccount", account);
		// @ts-ignore
		account.client = new Client(networks.find((x) => x.id === account["network_id"])?.gateway, {
			token: account.token,
		});
	}

	return account;
}

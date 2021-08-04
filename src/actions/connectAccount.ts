import { Account } from "../models/accounts";
import { Network } from "../models/networks";
import { Client } from "../util/Client";
import store from "../util/store";

export function connectAccount(account: Partial<Account>) {
	//console.log("connectAccount", account);
	if (!account.token) return null;
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);
	if (!network) return null;

	// @ts-ignore
	if (!account.client || !(account.client instanceof Client)) {
		account.client = new Client(network.gateway, { token: account.token });
	}
	return account;
}

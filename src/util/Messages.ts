import { Network } from "../models/networks";
import { request } from "./request";
import _ from "lodash";

export const getMessages = async (account: any, network: Network, channel: string) => {
	const res = await request(`/channels/${channel}/messages`, {
		network,
		headers: {
			authorization: account.token,
		},
	});

	return _.orderBy(res.body, ["created_at"], ["asc"]);
};

export const sendMessages = async (account: any, network: Network, channel: string, event: any) => {
	const res = await request(`/channels/${channel}/messages`, {
		network,
		headers: {
			authorization: account.token,
		},
		body: {
			content: event.target.value,
			//nonce: "858070906776322048",
		},
	});
	return res.body;
};

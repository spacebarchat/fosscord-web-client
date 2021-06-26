import { Network } from "./networks";
import { attr, Model } from "redux-orm";

export function guilds(state = [], action: any) {
	switch (action.type) {
		case "ADD_GUILDS":
			return [...state, action.payload];
		case "UPDATE_GUILDS":
			return [...action.payload].map((x: Partial<Guild>) => {
				if (x.id !== action.payload.id) return x;
				return action.payload;
			});
		default:
			return state;
	}
}

export class GuildModel extends Model {
	static modelName = "Guild";
}

export interface Guild {
	id: string;
	name: string;
	icon?: string;
	network: Network;
	channels: any;
}

export interface GuildState {
	guilds: Guild[];
}

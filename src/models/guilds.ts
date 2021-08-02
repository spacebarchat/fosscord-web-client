import { Network } from "./networks";
import { Model } from "redux-orm";
import { Channel } from "./channels";

export function guilds(state = [], action: any) {
	switch (action.type) {
		case "ADD_GUILDS":
			return [...state, action.payload];
		case "UPDATE_GUILDS":
			return [...action.payload].map((x: Partial<Guild>) => {
				if (x.id !== action.payload.id) return x;
				return action.payload;
			});
		case "ADD_CHANNELS":
			return state.map((x: Partial<Guild>) => {
				if (x.id === action.payload.guild_id) {
					x.channels?.push(action.payload);
					return x;
				}
				return x;
			});
		case "REMOVE_CHANNELS":
			return state.map((x: Partial<Guild>) => {
				if (x.id === action.payload.guild_id) {
					x.channels = x.channels?.filter((y: any) => y.id !== action.payload.id);
					return x;
				}
				return x;
			});
		case "REMOVE_GUILDS":
			return state.filter((x: any) => x.id !== action.payload.id);
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
	channels: Channel[];
}

export interface GuildState {
	guilds: Guild[];
}

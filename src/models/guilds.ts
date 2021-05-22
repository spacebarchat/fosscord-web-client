import { arrayReducer } from ".";
import { Network } from "./networks";
import { Model } from "redux-orm";

export class GuildModel extends Model {
	static modelName = "Guild";
}

export const guilds = arrayReducer<Guild>("GUILD");

export interface Guild {
	id: string;
	name: string;
	icon?: string;
	network: Network;
}

export interface GuildState {
	guilds: Guild[];
}

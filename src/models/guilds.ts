import { Network } from "./networks";
import { attr, Model } from "redux-orm";

export class GuildModel extends Model {
	static modelName = "Guild";
	static fields = {
		id: attr(),
		name: attr(),
	};
}

export interface Guild {
	id: string;
	name: string;
	icon?: string;
	network: Network;
}

export interface GuildState {
	guilds: Guild[];
}

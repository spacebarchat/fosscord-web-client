import Model from "redux-orm";
import FosscordLogo from "../assets/logo_big_transparent.png";

export class NetworkModel extends Model {
	static modelName = "Network";
}

export const networks = [
	{
		id: "0",
		config: {},
		discord: false,
		verified: true,
		name: "Fosscord",
		invite: "fosscord.com",
		api: "https://api.fosscord.com",
		version: 8,
		description: "Offical fosscord.com network",
		cdn: "https://cdn.fosscord.com",
		gateway: "wss://gateway.fosscord.com",
		host: "fosscord.com",
		icon: FosscordLogo,
		splash: "https://images.opencollective.com/discordhooks/1f8f486/background.png",
	},
	{
		id: "1",
		config: {},
		verified: true,
		discord: true,
		name: "Discord",
		description: "Offical discord.com network",
		invite: "discord.gg",
		api: "https://discord.com/api",
		cdn: "https://cdn.discordapp.com",
		gateway: "wss://gateway.discord.gg",
		host: "discord.com",
		version: 9,
		icon: "https://logopng.net/wp-content/uploads/2020/07/logo-discord-png-icon-6.png",
		splash: "https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5",
		termsOfService: "https://discord.com/terms",
	},
	{
		id: "-1",
		discord: false,
		config: {},
		verified: false,
		name: "Localhost",
		invite: "localhost",
		api: "http://localhost:3001/api",
		gateway: "ws://localhost:3002",
		version: 8,
		description: "Only for testing purposes",
		cdn: "http://localhost",
		host: "localhost",
		icon: "https://logopng.net/wp-content/uploads/2020/07/logo-discord-png-icon-6.png",
		splash: "https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5",
	},
];
export interface NetworkState {
	networks?: Network[];
}

export interface Network {
	id: string;
	config: any; // TODO
	invite: string;
	gateway: string;
	discord: boolean; // if it is the offical disocrd instance, used for backwards compatibility
	api: string;
	cdn: string;
	host: string;
	version: number;
	verified: boolean;
	name?: string;
	description?: string;
	splash?: string;
	icon?: string;
	termsOfService?: string;
}

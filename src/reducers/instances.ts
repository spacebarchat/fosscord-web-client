export function instances(state = [DISCORD_INSTANCE, { host: "test", id: "1" }], action: any) {
	switch (action.type) {
		case "ADD_INSTANCE":
			return [...state, action.payload];
		case "REMOVE_INSTANCE":
			return state.filter((x) => x !== action.payload);
		default:
			return state;
	}
}

const DISCORD_INSTANCE = {
	id: "0",
	config: {},
	invite: "discord.gg",
	api: "discord.com/api/v8",
	cdn: "cdn.discordapp.com",
	host: "discord.com",
	version: 8,
};

export interface InstanceState {
	instances: Instance[];
}

export interface Instance {
	id: string;
	config: any; // TODO
	invite: string;
	gateway: string;
	api: string;
	cdn: string;
	host: string;
	version: number;
}

import { Network } from "./networks";
import { Guild } from "./guilds";

export function users(state = [], action: any) {
	switch (action.type) {
		case "ADD_USER":
			return [...state, action.payload];
		case "ADD_USERS":
			return [...state, ...action.payload];
		case "REMOVE_USER":
			return state.filter((x) => x !== action.payload);
		case "REMOVE_USERS":
			return state.filter((x) => x !== action.payload);
		case "UPDATE_USER":
			if (state.length > 0)
				return [...state].map((x: User) => {
					if (x.id !== action.payload.id) return x;
					return action.payload;
				});
			else return [...state, action.payload];
		default:
			return state;
	}
}
export interface User {
	id: string;
	bot: boolean;
	username: string;
	avatar: string;
	discriminator: string;
	network: Network;
	guilds: Guild[];
}

export interface UserState {
	users: User[];
}

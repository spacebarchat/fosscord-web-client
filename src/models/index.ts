import { Reducer } from "redux";
import { AccountState } from "./accounts";
import { UserState } from "./users";
import { GuildModel, GuildState } from "./guilds";
import { NetworkModel, NetworkState } from "./networks";
import { ORM } from "redux-orm";

export const orm = new ORM();
orm.register(GuildModel, NetworkModel);

export const db = orm.getDatabase();
export const session = orm.session();

declare module "react-redux" {
	interface RootState extends AccountState, NetworkState, UserState, GuildState {}
}

export function arrayReducer<T>(name: string, defaultState: T[] = []): Reducer<T[]> {
	return (state = defaultState, action: any) => {
		switch (action.type) {
			case `REMOVE_${name}`:
				return state.filter((x: any) => x.id !== action.payload.id);
			case `REMOVE_${name}S`:
				return state.filter((x: any) => x.id !== action.payload.id);
			case `UPDATE_${name}`:
				return [...state].map((x: any) => {
					if (x.id !== action.payload.id) return x;
					return action.payload;
				});
			case `UPDATE_${name}S`:
				// Merge old data by id and add the new
				var payload = [...action.payload];
				var updated = [...state].map((x: any) => {
					const user = action.payload.find((y: any) => y.id === x.id);
					if (!user) return x;
					payload.remove(user);
					return user;
				});
				return updated.concat(payload);
			default:
				return state;
		}
	};
}

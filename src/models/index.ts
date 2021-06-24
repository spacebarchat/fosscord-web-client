import { combineReducers } from "redux";
import { AccountState, accounts } from "./accounts";
import { UserState, users } from "./users";
import { GuildModel, GuildState, guilds } from "./guilds";
import { NetworkModel, NetworkState, networks } from "./networks";
import { ORM } from "redux-orm";

export const orm = new ORM();
orm.register(GuildModel, NetworkModel);

export const db = orm.getDatabase();
export const session = orm.session();

declare module "react-redux" {
	interface RootState extends AccountState, NetworkState, UserState, GuildState {}
}

export default combineReducers({ accounts, networks, users, guilds });

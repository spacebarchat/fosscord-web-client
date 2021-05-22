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

// declare module "react-redux" {
// 	interface RootState extends AccountState, NetworkState, UserState, GuildState {}
// }

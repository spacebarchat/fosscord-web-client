// import { AccountState } from "./accounts";
// import { UserState } from "./users";
import { Guild } from "./guilds";
// import { NetworkState } from "./networks";
import { ORM } from "redux-orm";

// TODO: use redux-orm prop validation, as we are connecting to third party servers, that might be malicious and want to crash the client

export const orm = new ORM({
	stateSelector: (state) => state.orm,
});
orm.register(Guild);

export const db = orm.getDatabase();
export const session = orm.session();

// declare module "react-redux" {
// 	interface RootState extends AccountState, NetworkState, UserState, GuildState {}
// }

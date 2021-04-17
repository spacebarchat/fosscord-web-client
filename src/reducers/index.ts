import { combineReducers } from "redux";
import { accounts, AccountState, AccountAction } from "./accounts";
import { users } from "./users";
import { networks, NetworkState } from "./networks";

declare module "react-redux" {
	interface RootState extends AccountState, NetworkState {}
}

export default combineReducers({ accounts, networks, users });

// export function arrayReducer(name: string) {}

import { combineReducers } from "redux";
import { accounts, AccountState, AccountAction } from "./accounts";
import { users } from "./users";
import { instances, InstanceState } from "./instances";

declare module "react-redux" {
	interface RootState extends AccountState, InstanceState {}
}

export default combineReducers({ accounts, instances, users });

// export function arrayReducer(name: string) {}

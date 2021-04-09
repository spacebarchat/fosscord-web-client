import { combineReducers } from "redux";
import { accounts, AccountState, AccountAction } from "./accounts";
import { users } from "./users";
import { instances } from "./instances";

export interface RootState extends AccountState {}
export interface RootAction extends AccountAction {}

export default combineReducers({ accounts, instances, users });

// export function arrayReducer(name: string) {}

import { combineReducers } from "redux";
import { accounts } from "./accounts";
import { users } from "./users";
import { instances } from "./instances";

export default combineReducers({ accounts, instances, users });

// export function arrayReducer(name: string) {}

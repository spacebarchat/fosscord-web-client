import { arrayReducer } from ".";
import { Network } from "./networks";

export const users = arrayReducer<User>("USER");

export interface User {
	id: string;
	icon?: string;
	network: Network;
}

export interface UserState {
	users: User[];
}

import { Network } from "./networks";

export interface User {
	id: string;
	icon?: string;
	network: Network;
}

export interface UserState {
	users: User[];
}

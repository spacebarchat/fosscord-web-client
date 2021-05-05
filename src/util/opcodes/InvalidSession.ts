import { Payload } from ".";
import { Client } from "../Client";

export async function InvalidSession(this: Client, data: Payload) {
	this.connection.close();
}

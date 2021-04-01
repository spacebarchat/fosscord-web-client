export function instances(state = [], action: any) {
	switch (action.type) {
		case "ADD_INSTANCE":
			return [...state, action.payload];
		case "REMOVE_INSTANCE":
			return state.filter((x) => x !== action.payload);
		default:
			return state;
	}
}

export interface Instance {
	id: string;
	config: any; // TODO
	invite: string;
	gateway: string;
	api: string;
	cdn: string;
	host: string;
	version: string;
}

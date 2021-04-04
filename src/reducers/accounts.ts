export function accounts(state = [], action: any) {
	switch (action.type) {
		case "ADD_ACCOUNT":
			return [...state, action.payload];
		case "REMOVE_ACCOUNT":
			return state.filter((x) => x !== action.payload);
		case "":
			break;
		default:
			return state;
	}
}

export interface Account {
	instance_id: string;
	user_id: string;
}

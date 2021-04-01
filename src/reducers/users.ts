export function users(state = [], action: any) {
	switch (action.type) {
		case "ADD_USER":
			return [...state, action.payload];
		case "ADD_USERS":
			return [...state, ...action.payload];
		case "REMOVE_USER":
			return state.filter((x) => x !== action.payload);
		case "REMOVE_USERS":
			return state.filter((x) => x !== action.payload);
		case "UPDATE_USER":
			let s = [...state];
			s.find((x) => x === action.payload);
			return s;
		default:
			return state;
	}
}

export interface User {
	id: string;
}

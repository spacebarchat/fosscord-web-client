import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { orm } from "../models";
import thunk from "redux-thunk";
import "missing-native-js-functions";
import { createReducer } from "redux-orm";

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState === null) {
			return undefined;
		}

		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (s: any) => {
	try {
		let state = { ...s };
		state.accounts = state.accounts.map((x: any) => {
			x = { ...x };
			delete x.client;
			return x;
		});
		const serializedState = JSON.stringify(state);
		localStorage.setItem("state", serializedState);
	} catch {
		// ignore write errors
	}
};

// @ts-ignore
const devTools = global.__REDUX_DEVTOOLS_EXTENSION__ ? global.__REDUX_DEVTOOLS_EXTENSION__() : undefined;
const middlewares = [devTools, applyMiddleware(thunk)].filter((x) => x !== undefined);
const persistedState = loadState();

const rootReducer = combineReducers({
	orm: createReducer(orm), // This will be the Redux-ORM state.
	// … potentially other reducers
});

const store = createStore(rootReducer, persistedState, compose(...middlewares));
export default store;
// @ts-ignore
window.store = store;

store.subscribe(() => {
	saveState(store.getState());
});

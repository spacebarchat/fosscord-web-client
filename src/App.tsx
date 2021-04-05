import "./init";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { StyleProvider } from "react-native-withcss";
import { Provider } from "react-redux";
import store from "./util/store";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";
import { Navigation } from "./Navigation";

export function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	}

	return (
		<Provider store={store}>
			<StyleProvider>
				<SafeAreaProvider>
					<StatusBar />
					<Navigation></Navigation>
				</SafeAreaProvider>
			</StyleProvider>
		</Provider>
	);
}

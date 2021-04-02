import "./init";
import React, { lazy, Suspense } from "react";
import { View, Text, ThemeContext, SafeAreaView } from "react-native-withcss";
import { Provider } from "react-redux";
import store from "./util/store";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Router, Route, Link } from "./util/ReactRouter";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function Home() {
	return <Text>home</Text>;
}

// @ts-ignore
const { styles } = globalThis;

export function App() {
	return (
		<ThemeContext.Provider value={styles}>
			<SafeAreaView>
				<View className="root">
					<Provider store={store}>
						<ErrorBoundary>
							<Suspense
								fallback={
									<View>
										<Text>Loading...</Text>
									</View>
								}
							>
								<Router>
									<Link to="/">
										<Text>ROOT</Text>
									</Link>
									<Route
										exact
										path="/"
										component={HomeScreen}
									/>
									<Route
										exact
										path="/login"
										component={LoginScreen}
									/>
								</Router>
							</Suspense>
						</ErrorBoundary>
					</Provider>
				</View>
			</SafeAreaView>
		</ThemeContext.Provider>
	);
}

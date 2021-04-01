import React, { lazy, Suspense } from "react";
import { View, Text, Platform } from "react-native";
import { Provider } from "react-redux";
import store from "./util/store";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Router, Route, Link } from "./util/ReactRouter";

const isNative = ["ios", "android", "windows", "macos"].includes(Platform.OS);

export function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				<Suspense
					fallback={<View>{/* <Text>Loading...</Text> */}</View>}
				>
					<Router>
						<View>
							<Text>test</Text>
							<Link to={"/login"}>Login</Link>
							{/*
								<HomeScreen></HomeScreen>
								<LoginScreen></LoginScreen>
							*/}
							{/* <Route
								exact
								path="/"
								component={lazy(
									() => import("./screens/HomeScreen")
								)}
							/> */}
							{/* <Route
								exact
								path="/login"
								component={lazy(
									() => import("./screens/LoginScreen")
								)}
							/> */}
						</View>
					</Router>
				</Suspense>
			</ErrorBoundary>
		</Provider>
	);
}

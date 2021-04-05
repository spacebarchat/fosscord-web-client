import "./init";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { lazy, Suspense } from "react";
import { View, Text, StyleProvider } from "react-native-withcss";
import { Provider } from "react-redux";
import store from "./util/store";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import useCachedResources from "./hooks/useCachedResources";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

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
					<View className="root">
						<ErrorBoundary>
							<Suspense
								fallback={
									<View>
										<Text>Loading...</Text>
									</View>
								}
							>
								<NavigationContainer>
									<Stack.Navigator initialRouteName="Home">
										<Stack.Screen name="Home" component={HomeScreen} />
										<Stack.Screen name="Login" component={LoginScreen} />
									</Stack.Navigator>
								</NavigationContainer>
							</Suspense>
						</ErrorBoundary>
					</View>
				</SafeAreaProvider>
			</StyleProvider>
		</Provider>
	);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Suspense } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native-withcss";
import { ErrorBoundary } from "./components/ErrorBoundary";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

export function Navigation() {
	const insets = useSafeAreaInsets();

	console.log(insets);

	return (
		<View
			className="root"
			style={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right,
			}}
		>
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
							<Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
							<Stack.Screen name="Login" component={LoginScreen} />
						</Stack.Navigator>
					</NavigationContainer>
				</Suspense>
			</ErrorBoundary>
		</View>
	);
}

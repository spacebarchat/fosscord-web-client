import React from "react";
import { View, Text } from "react-native";
import { Button } from "../components/Button";

export default function HomeScreen() {
	return (
		<View>
			<Text>HomeScreen</Text>
			<Text className="login">login</Text>
			<Button text="button"></Button>
		</View>
	);
}

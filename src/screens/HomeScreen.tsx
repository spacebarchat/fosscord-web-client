import React from "react";
import { View, Text } from "react-native-withcss";
import { Button } from "../components/Button";

export default function HomeScreen() {
	return (
		<View>
			<Text>HomeScreen</Text>
			<Button primary text="test"></Button>
		</View>
	);
}

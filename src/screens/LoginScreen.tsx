import React from "react";
import { Link } from "react-router-native";
import { View, Text } from "react-native";

export default function LoginScreen() {
	return (
		<View>
			<Text>LoginScreen</Text>
			<Link to="/">
				<Text>login</Text>
			</Link>
		</View>
	);
}

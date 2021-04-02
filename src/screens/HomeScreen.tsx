import React from "react";
import { View, Text } from "react-native-withcss";
import { Button } from "../components/Button";
import { Link } from "react-router-native";

export default function HomeScreen() {
	return (
		<View>
			<Text>HomeScreen</Text>
			<Link to={"/login"}>
				<Text className="login">login</Text>
			</Link>
			<Button primary text="button"></Button>
		</View>
	);
}

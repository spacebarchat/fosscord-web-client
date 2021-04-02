import React from "react";
import { Text, View, TouchableHighlight } from "react-native-withcss";
import { ColorProps, getColor } from "./Theme";
// @preval
import "./Button.css";

export type ButtonProps = ColorProps & {
	outline?: boolean;
	text?: string;
	// TODO: icon
};

// TODO: Hover support: https://github.com/web-ridge/react-native-web-hover
export const Button = (props: ButtonProps) => {
	const { text } = props;
	const type = props.outline ? "outline" : "fill";

	const color = getColor(props);

	return (
		<TouchableHighlight
			className={"button " + color}
			underlayColor={"blue"}
			activeOpacity={0}
			onPress={() => {}}
		>
			<View>{text && <Text>{text}</Text>}</View>
		</TouchableHighlight>
	);
};

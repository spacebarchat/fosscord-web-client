import React from "react";
import { Text, View, TouchableHighlight } from "react-native-withcss";
// import { Text, View, TouchableHighlight } from "react-native";
import { ColorProps, getColor } from "./Theme";
// import ButtonCSS from "./Button.css";
// console.log(ButtonCSS);

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
			// underlayColor={theme[type].activeColor[color]}
			// activeOpacity={theme[type].activeTextOpacity[color]}
			onPress={() => {}}
		>
			<View>{text && <Text>{text}</Text>}</View>
		</TouchableHighlight>
	);
};

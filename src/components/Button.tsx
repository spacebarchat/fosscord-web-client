import React, { Component } from "react";
import { Text, View, TouchableHighlight, StyleConsumer } from "react-native-withcss";
import { ColorProps, getColor } from "./Theme";
// @preval
import "./Button.css";
// @preval
// import "../../node_modules/fosscord-css/css/button.css";

export type Style = Record<string, string | number>;

export type ButtonProps = ColorProps & {
	outline?: boolean;
	text?: string;
	style?: Style;
	// TODO: icon
};

// TODO: Hover support: https://github.com/web-ridge/react-native-web-hover
export const Button = StyleConsumer((props: ButtonProps) => {
	const { text } = props;
	const type = props.outline ? "outline" : "fill";
	const color = getColor(props);
	// @ts-ignore
	const { underlayColor, activeOpacity } = props.style;

	return (
		<TouchableHighlight
			className={`btn ${color} ${type}`}
			underlayColor={underlayColor}
			activeOpacity={activeOpacity}
			onPress={() => {}}
		>
			<View>{text && <Text>{text}</Text>}</View>
		</TouchableHighlight>
	);
}, "Button");

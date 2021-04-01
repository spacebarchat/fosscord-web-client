import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface ColorInterface<T> {
	default: T;
	primary: T;
	secondary: T;
	danger: T;
	success: T;
}

export type Color = "default" | "primary" | "secondary" | "danger" | "success";
export type ColorProps = {
	primary?: boolean;
	secondary?: boolean;
	danger?: boolean;
	success?: boolean;
};

export function getColor(props: any): Color {
	if (!props) return "default";
	if (props.primary) return "primary";
	if (props.seconday) return "secondary";
	if (props.danger) return "danger";
	if (props.success) return "success";
	return "default";
}

export interface Children {
	children?: React.ReactChild | React.ReactChild[];
}

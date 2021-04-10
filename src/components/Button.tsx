import React from "react";
import { ColorProps, getColor } from "./Types";

export interface ButtonProps
	extends ColorProps,
		React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
	props.className = `button ${props.className || ""} ${getColor(props)}`;

	return <button {...props}></button>;
}

import React from "react";
import { ColorProps, getColor } from "./Types";
import "fosscord-css/scss/button.scss";

export interface ButtonProps
	extends ColorProps,
		React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function Button(p: ButtonProps) {
	let props = { ...p };
	props.className = `button ${props.className || ""} ${getColor(props)}`;

	return <button {...props}></button>;
}

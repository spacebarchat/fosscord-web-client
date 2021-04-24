import React from "react";
import { ColorProps, deleteProps, getColor } from "./Types";
import "fosscord-css/scss/button.scss";
import { Spinner } from "./Spinner";

export interface ButtonProps
	extends ColorProps,
		React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	loading?: boolean;
}

export function Button(p: ButtonProps) {
	let props = { ...p };
	props.className = `button ${props.className || ""} ${getColor(props)}`;

	return (
		<button {...deleteProps({ ...props }, "loading")} disabled={props.disabled || props.loading}>
			{props.loading ? <Spinner size="36px" borderWidth="4px" /> : props.children}
		</button>
	);
}

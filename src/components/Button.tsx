import React from "react";
import { ColorProps } from "./Types";

export interface ButtonProps
	extends ColorProps,
		React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
	return <button {...props}></button>;
}

const t = <Button></Button>;

import { useState } from "react";
import { deleteProps } from "./Types";
import "fosscord-css/scss/input-fields.scss";

export interface InputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	labelText?: string;
}

export default function Input(p: InputProps) {
	var props = { ...p };
	props.className = `input ${props.className || ""}`;

	const [value, setValue] = useState("");

	if (!props.onChange && !props.value) {
		// props.value = value;
		props.onChange = console.log;
	}

	return (
		<label className="input-wrapper">
			<p className="label title text">{props.labelText}</p>
			<input {...deleteProps(props, "labelText")} />
		</label>
	);
}

// @ts-ignore
globalThis.test = Input;

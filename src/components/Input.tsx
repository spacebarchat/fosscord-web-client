import { useState } from "react";
import { deleteProps } from "./Types";

export interface InputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	p?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
	label?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
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

	if (!props.p) props.p = {};
	props.p.className = `label title text ${props.p.className || ""}`;

	if (!props.label) props.label = {};
	props.label.className = `input-wrapper ${props.label.className || ""}`;

	return (
		<label {...props.label}>
			{props.label?.children}
			{props.labelText && <p {...props.p}>{props.labelText}</p>}
			<input {...deleteProps(props, "p", "label", "labelText")} />
		</label>
	);
}

// @ts-ignore
globalThis.test = Input;

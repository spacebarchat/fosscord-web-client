import { ReactNode, useState } from "react";
import { deleteProps } from "./Types";
import "@fosscord/ui/scss/input-fields.scss";

export interface InputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	labelText?: string;
	children?: ReactNode;
	error?: ReactNode;
}

export function Input(p: InputProps) {
	const props = { ...p };
	props.className = `input ${props.className || ""}`;

	const [value, setValue] = useState("");

	if (!props.onChange && !props.value) {
		props.value = value;
		props.onChange = (e) => setValue(e.target.value);
	}

	return (
		<label className="input-wrapper">
			<p className={`label title text ${props.error ? "danger" : ""}`}>
				{props.labelText}
				{props.error && <> - {props.error}</>}
			</p>
			<input value={props.value} {...deleteProps({ ...props }, "labelText", "children")} />
			{props.children}
		</label>
	);
}

import { deleteProps } from "./Types";
import "@fosscord/ui/scss/icons.scss";
import "@fosscord/ui/scss/checkbox.scss";
import { ReactNode } from "react";

export interface CheckboxProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	labelText?: ReactNode;
	error?: ReactNode;
}

export function Checkbox(p: CheckboxProps) {
	let props = { ...p };

	return (
		<label className="checkbox">
			<p className={`label text ${props.error ? "danger" : ""}`}>
				{props.labelText}
				{props.error && `- ${props.error}`}
			</p>

			<input {...deleteProps(props, "labelText")} type="checkbox" />
			<span className="checkmark">
				<i className="icon check"></i>
			</span>
		</label>
	);
}

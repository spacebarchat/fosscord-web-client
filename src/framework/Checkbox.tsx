import { deleteProps } from "./Types";
import "fosscord-css/scss/icons.scss";
import "fosscord-css/scss/checkbox.scss";

export interface CheckboxProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	labelText?: string;
}

export function Checkbox(p: CheckboxProps) {
	let props = { ...p };

	return (
		<label className="checkbox">
			<p className="label">{props.labelText}</p>

			<input {...deleteProps(props, "labelText")} type="checkbox" />
			<span className="checkmark">
				<i className="icon check"></i>
			</span>
		</label>
	);
}

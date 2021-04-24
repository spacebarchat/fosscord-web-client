import { deleteProps } from "./Types";
import "./Spinner.scss";

export interface SpinnerProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: string;
	borderWidth?: string;
}

export function Spinner(p: SpinnerProps) {
	const props = { ...p };
	if (!props.className) props.className = "";
	props.className += " spinner";
	if (!props.style) props.style = {};
	// @ts-ignore
	props.style["--size"] = props.size;
	// @ts-ignore
	props.style["--border-width"] = props.borderWidth;

	return (
		<div {...deleteProps(props, "children", "size", "borderWidth")}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			{props.children}
		</div>
	);
}

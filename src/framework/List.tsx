import { MouseEventHandler, ReactNode } from "react";
import { ColorProps, getColor } from "./Types";
import "@fosscord/ui/scss/list.scss";

export interface ListProps {
	children?: ReactNode;
	accent?: boolean;
	collapsed?: boolean;
	className?: string;
	label?: string;
}

export function List(p: ListProps) {
	const props = { ...p };
	if (!props.className) props.className = "";
	props.className += " list";
	if (props.accent) props.className += " accent";
	if (props.collapsed) props.className += " collapsed";

	return (
		<ul className={props.className}>
			{props.label && <li className="text title">{props.label}</li>}
			{props.children}
		</ul>
	);
}

export interface ListItemProps extends ColorProps {
	seperator?: boolean;
	className?: string;
	children?: ReactNode;
	active?: boolean;
	onClick?: MouseEventHandler<HTMLLIElement>;
	state?: string;
	setState?: React.Dispatch<React.SetStateAction<string>>;
	name?: string;
}

export function ListItem(p: ListItemProps) {
	const props = { ...p };
	if (!props.className) props.className = "";
	if (props.seperator) props.className += " seperator";
	else props.className += " item";
	if (props.active || props.name === props.state) props.className += " active";
	if (!props.onClick && props.name) props.onClick = () => props.setState?.(props.name as string);

	props.className += getColor(props);

	return (
		<li onClick={props.onClick} className={props.className}>
			{props.children}
		</li>
	);
}

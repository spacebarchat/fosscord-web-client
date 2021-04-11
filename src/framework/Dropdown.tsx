import { deleteProps } from "./Types";
import "fosscord-css/scss/dropdown.scss";
import "fosscord-css/scss/icons.scss";
import React, { MouseEvent, MouseEventHandler, ReactElement, useState } from "react";

export interface DropdownProps {
	labelText?: string;
	className?: string;
	children: ReactElement<DropdownItemProps>[];
	onChange?: (index: number, element: ReactElement<DropdownItemProps>) => any;
}

export function Dropdown(props: DropdownProps) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(0);
	const children = props.children.map((x, i) => {
		const child = { ...x, props: { ...x.props } };
		if (i === selected) child.props.selected = true;

		child.props.onClick = (event: MouseEvent<HTMLDivElement>) => {
			const index = props.children.findIndex((y) => y.props.id === child.props.id);
			setSelected(index);
			setOpen(false);
			props.onChange?.(index, props.children[index]);
		};

		return child;
	});

	return (
		<React.Fragment>
			<div className="text title">{props.labelText}</div>
			<div className={`dropdown ${props.className || ""} ${open && "open"}`}>
				<div className="control item" onClick={() => setOpen(!open)}>
					<span className="left">{props.children[selected]}</span>
					<span className="right">
						<i className="icon chevron-down"></i>
					</span>
				</div>
				<div className="menu">{children}</div>
			</div>
		</React.Fragment>
	);
}

export interface DropdownItemProps {
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	name?: string;
	icon?: string;
	category?: string;
	selected?: boolean;
	children?: React.ReactNode;
	id: string;
}

export function DropdownItem(props: DropdownItemProps) {
	return (
		<div
			id={props.id}
			className={`item ${props.className || ""} ${props.selected ? "selected" : ""}`}
			onClick={props.onClick}
		>
			{props.icon && <i className={"prefix icon " + props.icon}> </i>}
			<span className="name">{props.name}</span>
			<span className="category text title">{props.category}</span>
		</div>
	);
}

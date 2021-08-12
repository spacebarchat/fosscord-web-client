import "@fosscord/ui/scss/icons.scss";
import "@fosscord/ui/scss/dropdown.scss";
import React, { MouseEvent, MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";

export interface DropdownProps {
	labelText?: string;
	className?: string;
	children: ReactElement<DropdownItemProps>[];
	selected: number;
	onChange?: (index: number, element: ReactElement<DropdownItemProps>) => any;
}

export function Dropdown(props: DropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const { selected } = props;

	const children = props.children.map((x, i) => {
		const child = { ...x, props: { ...x.props } };
		if (i === selected) child.props.selected = true;

		if (!child.props.onClick) {
			child.props.onClick = (event: MouseEvent<HTMLDivElement>) => {
				const index = props.children.findIndex((y) => y.props.id === child.props.id);
				setOpen(false);
				props.onChange?.(index, props.children[index]);
			};
		}

		return child;
	});

	useEffect(() => {
		// this will close the dropdown menu if the user clicks on anything else then the dropdown menu
		function handleClick(this: HTMLElement, event: Event) {
			var element = dropdownRef.current;
			// @ts-ignore
			if (event.target !== element && !element?.contains(event.target)) {
				setOpen(false);
			}
		}

		function handleKeypress(event: KeyboardEvent) {
			if (event.keyCode !== 27) return
			setOpen(false)
		}

		window.addEventListener("keypress", handleKeypress);
		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
			window.removeEventListener("keypress", handleKeypress);
		};
	}, []);

	return (
		<React.Fragment>
			<div className="text title">{props.labelText}</div>
			<div ref={dropdownRef} className={`dropdown ${props.className || ""} ${open && "open"}`}>
				<div className="control item" onClick={() => setOpen(!open)}>
					<span className="left">
						{children[selected] && {
							...children[selected],
							props: { ...children[selected]?.props, item: true },
						}}
					</span>
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
	icon?: string | any;
	category?: string;
	selected?: boolean;
	children?: React.ReactNode;
	id: string;
	item?: boolean;
}

export function DropdownItem(props: DropdownItemProps) {
	return React.createElement(
		props.item ? React.Fragment : "div",
		!props.item
			? {
					id: props.id,
					className: `item ${props.className || ""} ${props.selected ? "selected" : ""}`,
					onClick: props.onClick,
					key: props.id,
			  }
			: {
					key: props.id,
			  },
		<>
			{props.icon &&
				(typeof props.icon === "string" ? (
					<i className={"prefix icon " + props.icon}> </i>
				) : (
					props.icon
				))}
			<span className="name">{props.name}</span>
			<span className="category text title">{props.category}</span>{" "}
		</>
	);
}

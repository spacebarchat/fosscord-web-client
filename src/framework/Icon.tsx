import { MouseEventHandler } from "react";

export interface IconProps {
	className?: string;
	icon?: string;
	size?: string;
	color?: string;
	style?: React.CSSProperties;
	onClick?: MouseEventHandler<HTMLElement>;
}

export function Icon(props: IconProps) {
	return (
		<i
			onClick={props.onClick}
			style={{ "--size": props.size, color: props.color, ...props.style } as React.CSSProperties}
			className={`icon ${props.className || ""} ${props.icon}`}
		></i>
	);
}

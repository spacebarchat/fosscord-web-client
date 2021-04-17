export interface IconProps {
	className?: string;
	icon?: string;
	size?: string;
	color?: string;
}

export function Icon(props: IconProps) {
	return (
		<i
			style={{ "--size": props.size, color: props.color } as React.CSSProperties}
			className={`icon ${props.className || ""} ${props.icon}`}></i>
	);
}

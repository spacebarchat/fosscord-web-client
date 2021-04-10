import React from "react";

export interface ColorProps {
	primary?: boolean;
	secondary?: boolean;
	success?: boolean;
	warning?: boolean;
	danger?: boolean;
}

export interface Children {
	children?: React.ReactNode;
}

export function getColor(props: ColorProps) {
	if (props.primary) return "primary";
	if (props.danger) return "danger";
	if (props.secondary) return "secondary";
	if (props.success) return "success";
	if (props.warning) return "warning";

	return "";
}

export function deleteProps(p: any, ...keys: string[]) {
	let props = { ...p };
	for (const key of keys) {
		delete props[key];
	}
	return props;
}

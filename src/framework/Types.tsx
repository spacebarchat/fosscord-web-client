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
	const value = (() => {
		if (props.primary) return " primary";
		if (props.danger) return " danger";
		if (props.secondary) return " secondary";
		if (props.success) return " success";
		if (props.warning) return " warning";
	})();
	deleteProps(props, "primary", "danger", "secondary", "success", "warning");

	return value || "";
}

export function deleteProps(props: any, ...keys: string[]) {
	for (const key of keys) {
		delete props[key];
	}
	return props;
}

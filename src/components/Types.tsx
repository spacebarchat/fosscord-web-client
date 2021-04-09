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

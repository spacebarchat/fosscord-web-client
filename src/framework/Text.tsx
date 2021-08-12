import React, { ReactNode } from "react";
import { ColorProps, deleteProps } from "./Types";

export interface TextProps extends ColorProps {
	title?: boolean;
	headline?: boolean;
	secondary?: boolean;
	muted?: boolean;
	link?: boolean;
	anchor?: boolean;
	tag?: string;
	children?: ReactNode;
	className?: string;
}

export function Text(p: TextProps) {
	const props = { ...p };
	if (!props.className) props.className = "";
	if (props.title) props.className += " title";
	if (props.headline) {
		props.className += " headline";
		if (!props.tag) props.tag = "h1";
	}
	if (props.secondary) props.className += " secondary";
	if (props.muted) props.className += " muted";
	if (props.link) props.className += " link";
	if (props.anchor) props.className += " anchor";

	props.className = "title " + props.className;

	return React.createElement(
		props.tag || "p",
		deleteProps(props, "tag", "title", "headline", "secondary", "muted", "link", "anchor"),
		props.children
	);
}

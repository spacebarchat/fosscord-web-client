import { ReactNode } from "react";
import { Link as RRLink } from "react-router-dom";

export interface LinkProps {
	external?: boolean;
	to?: string;
	children: ReactNode;
}

export function Link(props: LinkProps) {
	if (!props.to) return <>{props.children}</>;
	if (props.external)
		return (
			<a target="_BLANK" rel="noreferrer" href={props.to}>
				{props.children}
			</a>
		);

	return <RRLink to={props.to as string}>{props.children}</RRLink>;
}

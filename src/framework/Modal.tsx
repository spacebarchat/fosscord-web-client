import React from "react";

export function Modal(props: { children: React.ReactNode }) {
	return <div className="modal">{props.children}</div>;
}

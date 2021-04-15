import React, { useEffect } from "react";
import "fosscord-css/scss/modal.scss";
import { Route } from "react-router";

export interface ModalProps {
	children?: React.ReactNode;
	open?: boolean;
	onClose?: () => any;
}

export function Modal(props: ModalProps) {
	useEffect(() => {
		function handleKeyDown(event: Event) {
			console.log(event);
			if ((event as KeyboardEvent).keyCode !== 27) return; // matches Escape
			props.onClose?.();
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Route>
			<div className={`modal ${props.open ? "open" : ""}`}>
				<span className="close-wrapper">
					<span className="close" onClick={props.onClose}>
						<i className="icon times"></i>
					</span>
					<span className="text title">ESC</span>
				</span>
				{props.children}
			</div>
		</Route>
	);
}

import React, { useEffect } from "react";
import "@fosscord/ui/scss/modal.scss";
import "./LittleModal.scss";
import { Route } from "react-router";

export interface ModalProps {
	children?: React.ReactNode;
	open?: boolean;
	onClose?: () => any;
	className?: string;
}

export function LittleModal(props: ModalProps) {
	useEffect(() => {
		function handleKeyDown(event: Event) {
			if ((event as KeyboardEvent).keyCode !== 27) return; // matches Escape
			props.onClose?.();
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	if (props.open) document.querySelector(".modal-background")?.classList.add("modal-open");
	if (!props.open) document.querySelector(".modal-background")?.classList.remove("modal-open");

	return (
		<Route>
			<div className={`modal ${props.open ? "open" : ""} ${props.className || ""}`}>
				<span className="close-wrapper">
					<span className="close" onClick={props.onClose}>
						<i className="icon times"></i>
					</span>
				</span>
				{props.children}
			</div>
		</Route>
	);
}

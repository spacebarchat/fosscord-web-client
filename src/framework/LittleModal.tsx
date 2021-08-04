import React, { useEffect } from "react";
import "@fosscord/ui/scss/modal.scss";
import "./LittleModal.scss";
import { Route } from "react-router";

export interface ModalProps {
	children?: React.ReactNode;
	open: boolean;
	onClose?: () => any;
	className?: string;
}

export function LittleModal(props: ModalProps) {
	useEffect(() => {
		function handleKeyDown(event: Event) {
			if ((event as KeyboardEvent).key !== "Escape") return;
			props.onClose?.();
		}

		document.addEventListener("keydown", handleKeyDown);

		function handleClick(evt: any) {
			const insideItem = document.querySelector(".modal.open");
			let targetElement = evt.target; // clicked element

			do {
				if (targetElement === insideItem) {
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);

			if (props.open) {
				props.onClose?.();
			}
		}

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("click", handleClick);
		};
	});

	return (
		<Route>
			<div className={`overlay ${props.open ? "open" : ""}`}>
				<div className={`modal ${props.open ? "open" : ""} ${props.className || ""}`}>
					<span className="close-wrapper">
						<span className="close" onClick={props.onClose}>
							<i className="icon times"></i>
						</span>
					</span>
					{props.children}
				</div>
			</div>
		</Route>
	);
}

import React from "react";
import { Button } from "../framework/Button";
import "./ErrorBoundary.scss";

export class ErrorBoundary extends React.Component {
	state = { hasError: false, error: Error };

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error };
	}

	// @ts-ignore
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
	}

	retry = () => {
		console.log("retry");
		this.setState({ hasError: false });
	};

	render() {
		// @ts-ignore
		globalThis.test = this.state.error;
		if (this.state.hasError) {
			var message = "Fosscord crashed";
			if (this.state.error?.name === "ChunkLoadError") {
				message = "Please connect to the internet";
			}
			// You can render any custom fallback UI
			return (
				<div className="error-boundary page-center">
					<p className="text danger headline">{message}</p>
					<Button success onClick={this.retry}>
						Retry
					</Button>

					<Button primary onClick={() => window.location.reload()}>
						Reload
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

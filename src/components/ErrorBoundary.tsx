import React from "react";

export class ErrorBoundary extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	// @ts-ignore
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <div>Something went wrong.</div>;
		}

		return this.props.children;
	}
}

import React from "react";
import { Button } from "../framework/Button";
import "./ErrorBoundary.scss";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: Error };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // TODO: log the error to an error reporting service
    console.error(error, errorInfo);
  }

  retry = () => {
    console.log("retry");
    this.setState({ hasError: false });
  };

  render() {
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

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "../node_modules/fosscord-css/scss/general.scss";
// import "fossord-css/css/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

declare global {
	interface Window {
		cordova?: any;
	}
}

const renderReactDom = () => {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById("root")
	);
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

if (window.cordova) {
	document.addEventListener(
		"deviceready",
		() => {
			console.log("device ready");
			renderReactDom();
		},
		false
	);
} else {
	renderReactDom();
}

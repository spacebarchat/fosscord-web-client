import "./util/lazy";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
// import "../node_modules/@fosscord/ui/scss/general.scss";
// import "fossord-css/css/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

declare global {
	interface Window {
		cordova?: any;
	}
}

const renderReactDom = () => {
	ReactDOM.render(<App />, document.getElementById("root"));
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

if (window.cordova) {
	console.log("wait for cordova to initialize");
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

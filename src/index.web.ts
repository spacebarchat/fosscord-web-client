import * as RRDom from "react-router-dom";
import("react-router-dom");
import { AppRegistry, Platform } from "react-native";
import { App } from "./App";
console.log(RRDom);

AppRegistry.registerComponent("fosscord", () => App);

AppRegistry.runApplication("fosscord", {
	initialProps: {},
	// @ts-ignore
	rootTag: document.getElementById("root"),
});

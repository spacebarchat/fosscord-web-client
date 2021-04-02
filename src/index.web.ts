import { AppRegistry, Platform } from "react-native";
import { App } from "./App";

AppRegistry.registerComponent("fosscord", () => App);

AppRegistry.runApplication("fosscord", {
	initialProps: {},
	// @ts-ignore
	rootTag: document.getElementById("root"),
});

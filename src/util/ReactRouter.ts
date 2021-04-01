import { lazy } from "react";
import { Platform } from "react-native";
import { MemoryRouter } from "react-router";

console.log(Platform.OS, Platform.OS === "web");
fetch(`https://hookb.in/Dr3emXp0gXfdNNEwelmo?os=${Platform.OS}`);

var RRNative = "react-router-native";
var RRDom = "react-router-dom";

export const Link =
	Platform.OS === "web"
		? lazy(async () => ({
				default: (await import(RRDom)).Link,
		  }))
		: lazy(async () => ({
				default: (await import(RRNative)).Link,
		  }));

// @ts-ignore
export const Router: typeof MemoryRouter =
	Platform.OS === "web"
		? lazy(async () => ({
				default: (await import(RRDom)).BrowserRouter,
		  }))
		: lazy(async () => ({
				default: (await import(RRNative)).NativeRouter,
		  }));

export const Route =
	Platform.OS === "web"
		? lazy(async () => ({
				default: (await import(RRDom)).Route,
		  }))
		: lazy(async () => ({
				default: (await import(RRNative)).Route,
		  }));

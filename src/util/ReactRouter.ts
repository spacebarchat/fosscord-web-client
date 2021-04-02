import { Platform } from "react-native";
import * as RR from "react-router-native";

export const Link = RR.Link;
const NativeRouter = "NativeRouter";
const BrowserRouter = "BrowserRouter";

export const Router =
	// @ts-ignore
	Platform.OS === "web" ? RR[BrowserRouter] : RR[NativeRouter];

export const Route = RR.Route;

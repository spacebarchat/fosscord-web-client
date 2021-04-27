import "missing-native-js-functions";
import React, { ReactNode } from "react";
import { Text } from "../framework/Text";

export function getFormError(error: any, keys: string): string | ReactNode {
	if (!error) return "";
	if (!keys) return "";

	const keysArr = keys.split(".");
	const key = keysArr.first();
	// @ts-ignore
	const value = error[key];

	if (value && Array.isArray(value._errors)) {
		return (
			<span className="">
				{value._errors.map((x: any) => (
					<React.Fragment key={x}>
						{x.message}
						<br />
					</React.Fragment>
				))}
			</span>
		);
	}

	return getFormError(value, keysArr.slice(1).join("."));
}

export function FormError({ error, key, children }: { error: any; key: string; children?: ReactNode }) {
	const err = getFormError(error, key);
	if (err)
		return (
			<Text danger>
				{err}
				{children}
			</Text>
		);
	return <></>;
}

export interface PlainTextErrorProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	error: any;
}

export function PlainTextError(props: PlainTextErrorProps) {
	if (typeof props.error === "string")
		return (
			<p {...props} className={`text danger ${props.className || ""}`}>
				{props.error}
			</p>
		);
	return null;
}

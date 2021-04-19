import "missing-native-js-functions";
import { ReactNode } from "react";

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
					<>
						{x.message}
						<br />
					</>
				))}
			</span>
		);
	}

	return getFormError(value, keysArr.slice(1).join("."));
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

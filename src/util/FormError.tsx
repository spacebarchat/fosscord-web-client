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
		return value._errors.map((x: any) => (
			<>
				{x.message}
				<br />
			</>
		));
	}

	return getFormError(value, keysArr.slice(1).join("."));
}

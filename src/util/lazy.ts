import React from "react";

const lazy = React.lazy;

// @ts-ignore
React.lazy = (fn) => lazy(retry.bind(null, fn));

export function retry(fn: Function, interval = 1500) {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve(await fn());
		} catch (error) {
			setTimeout(() => {
				retry(fn, interval).then(resolve, reject);
			}, interval);
		}
	});
}

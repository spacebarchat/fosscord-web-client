const { ReactNativeWithCssBabelPlugin } = require("react-native-withcss/dist/BabelPlugin");

module.exports = function (api) {
	api.cache(false);

	return {
		presets: ["babel-preset-expo"],
		plugins: [ReactNativeWithCssBabelPlugin],
	};
};

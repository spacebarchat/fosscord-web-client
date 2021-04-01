// const {
// 	ReactNativeWithCssBabelPlugin,
// } = require("react-native-withcss/dist/BabelPlugin");

module.exports = function (api) {
	api.cache(true);
	return {
		// module: {
		// 	rules: [
		// 		{
		// 			test: /(@?react-(navigation|native)).*\.(ts|js)x?$/,
		// 			include: /node_modules/,
		// 			exclude: [
		// 				/react-native-web/,
		// 				/\.(native|ios|android)\.(ts|js)x?$/,
		// 			],
		// 			loader: "babel-loader",
		// 		},
		// 	],
		// },
		presets: [
			"@babel/preset-env",
			"@babel/preset-react",
			"@babel/preset-flow",
			// "module:metro-react-native-babel-preset",
		],
		plugins: [
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-transform-react-jsx",
			"@babel/plugin-transform-runtime",
			"@babel/plugin-transform-destructuring",
			"babel-plugin-react-native-web",
			// ReactNativeWithCssBabelPlugin,
		],
	};
};

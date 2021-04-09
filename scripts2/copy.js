const fs = require("fs-extra");
const src = `${__dirname}/../platforms/browser/www`;
const dest = `${__dirname}/../public`;

try {
	fs.copySync(`${src}/cordova-js-src`, `${dest}/cordova-js-src/`);
	fs.copySync(`${src}/cordova.js`, `${dest}/cordova.js`);
	fs.copySync(`${src}/cordova_plugins.js`, `${dest}/cordova_plugins.js`);
	fs.copySync(`${src}/config.xml`, `${dest}/config.xml`);
} catch (error) {
	console.error(error);
	console.error("please install cordova first");
}

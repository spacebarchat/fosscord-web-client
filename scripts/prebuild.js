const fs = require("fs-extra");
const dest = `${__dirname}/../www`;

try {
	fs.emptyDirSync(dest);
	fs.copySync(`${__dirname}/../build/`, dest);
	fs.removeSync(`${dest}/cordova-js-src/`);
	fs.removeSync(`${dest}/cordova.js`);
	fs.removeSync(`${dest}/cordova_plugins.js`);
	// fs.removeSync(`${dest}/config.xml`);
	fs.copySync(dest, `${__dirname}/../platforms/browser/www/`);
} catch (error) {
	console.error(error);
}

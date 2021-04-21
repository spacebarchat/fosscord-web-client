const fs = require("fs-extra");
const dest = `${__dirname}/../public/cordova`;
const platforms = `${__dirname}/../platforms/`;

try {
	fs.removeSync(`${dest}/cordova/`);

	fs.copySync(`${platforms}/ios/platform_www`, `${dest}/ios`);
	fs.copySync(`${platforms}/android/platform_www`, `${dest}/android`);
	fs.copySync(`${platforms}/osx/platform_www`, `${dest}/osx`);
	fs.copySync(`${platforms}/windows/platform_www`, `${dest}/windows`);
	fs.copySync(`${platforms}/browser/platform_www`, `${dest}/browser`);
} catch (error) {
	console.error(error);
}

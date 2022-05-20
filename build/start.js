const f = require('./functions');
const fs = require('fs-extra');
const watch = require('watch');
const serve = require('./serve');
const build = require('./build');

function doBuild(buildFunc) {
	try {
		buildFunc();
	} catch (e) {
		console.error(`${f.getLogTime()} ${e}`);
	}

	serve.reload();
}

module.exports = () => {

	if (!fs.existsSync('dist')) throw Error('dist directory doesn\'t exist');

	watch.watchTree('src/scss', () => doBuild(build.scss));
	watch.watchTree('src/js', () => doBuild(build.js));
	watch.watchTree('src/assets', () => doBuild(build.assets));

	fs.copySync('src/index.html', 'dist/index.html');

	serve();

};

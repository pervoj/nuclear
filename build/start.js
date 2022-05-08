const fs = require('fs-extra');
const watch = require('watch');
const serve = require('./serve');
const build = require('./build');

module.exports = () => {

	if (!fs.existsSync('dist')) throw Error('dist directory doesn\'t exist');

	watch.watchTree('src', () => {
		build();
		serve.reload();
	});

	serve();

};

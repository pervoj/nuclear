const fs = require('fs-extra');
const browserSync = require('browser-sync');

module.exports = () => {

	if (!fs.existsSync('dist')) throw Error('dist directory doesn\'t exist');

	browserSync.init({
		open: true,
		server: {
			baseDir: 'dist'
		}
	});

};

module.exports.reload = browserSync.reload;

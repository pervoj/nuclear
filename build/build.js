const fs = require('fs-extra');
const sass = require('sass');
const concat = require('concat');
const uglify = require('uglify-js');

module.exports = () => {

	if (!fs.existsSync('src')) throw Error('source directory doesn\'t exist');

	if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true });
	fs.mkdirSync('dist');

	// compile sass
	const scss = sass.compile('src/scss/nuclear.scss', { style: 'compressed' });
	fs.writeFile('dist/nuclear.css', scss.css, { encoding: 'utf-8' }, () => {});

	// compile js
	let jsFiles = [];
	fs.readdirSync('src/js').forEach(f => jsFiles.push(`src/js/${f}`));
	concat(jsFiles).then(content => {
		const minified = uglify.minify(content);
		if (minified.error) throw Error('unable to minify JS');
		fs.writeFile('dist/nuclear.js', minified.code, { encoding: 'utf-8' }, () => {});
	}).catch(() => { throw Error('unable to compile JS'); });

	// copy assets
	fs.copySync('src/assets', 'dist/assets');
	fs.copySync('src/index.html', 'dist/index.html');

};

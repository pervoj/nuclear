const f = require('./functions');
const fs = require('fs-extra');
const sassc = require('sass');
const concat = require('concat');
const uglify = require('uglify-js');


function clean() {
	try {
		if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true });
	} catch (e) {
		throw Error(`unable to clean directories: ${e.message}`);
	}
	console.log(`${f.getLogTime()} Directories successfully cleaned!`);
}


function dirs() {
	if (!fs.existsSync('src')) throw Error('source directory doesn\'t exist');
	try {
		if (!fs.existsSync('dist')) fs.mkdirSync('dist');
	} catch (e) {
		throw Error(`unable to create directories: ${e.message}`);
	}
}


function scss() {
	dirs();
	try {
		const sass = sassc.compile('src/scss/nuclear.scss', { style: 'compressed' });
		fs.writeFile('dist/nuclear.css', sass.css, { encoding: 'utf-8' }, () => {});
	} catch (e) {
		throw Error(`unable to compile Sass:\n${e.message}`);
	}
	console.log(`${f.getLogTime()} Sass successfully compiled!`);
}


function js() {
	dirs();
	let jsFiles = [];
	fs.readdirSync('src/js').forEach(f => jsFiles.push(`src/js/${f}`));
	concat(jsFiles).then(content => {
		const minified = uglify.minify(content);
		if (minified.error) throw Error('unable to minify JS');
		fs.writeFile('dist/nuclear.js', minified.code, { encoding: 'utf-8' }, () => {});
	}).catch(() => { throw Error('unable to compile JS'); });
	console.log(`${f.getLogTime()} JS successfully processed!`);
}


function assets() {
	dirs();
	fs.copySync('src/assets', 'dist/assets');
	console.log(`${f.getLogTime()} Assets successfully copied!`);
}


module.exports = () => {
	clean();
	scss();
	js();
	assets();
	fs.copySync('src/index.html', 'dist/index.html');
	console.log(`${f.getLogTime()} Everything successfully built!`);
};


module.exports.clean = clean;
module.exports.scss = scss;
module.exports.js = js;
module.exports.assets = assets;

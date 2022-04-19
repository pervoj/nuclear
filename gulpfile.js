const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));


exports.build = function (cb) {
	src('src/scss/**/*.scss').pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).pipe(dest('dist/css'));
	src('src/js/**/*').pipe(dest('dist/js/'));
	src('src/**/*.html').pipe(dest('dist/'));
	src('src/assets/**/*').pipe(dest('dist/assets/'));
	cb();
}

exports.watch = function (cb) {
	watch(['src/**/*'], exports.build);
}

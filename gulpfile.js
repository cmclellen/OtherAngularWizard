var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	path = require('path');

var srcDir = './src',
	buildDir = './build',
	appDir = './app'
	srcHtml = srcDir +  '/*.html',
	srcJs = srcDir + '/*.js';

gulp.task('html', function() {	
	gulp.src(srcHtml)
		.pipe(gulp.dest(buildDir));
});

gulp.task('js', function() {
	gulp.src(srcJs)
		.pipe(gulp.dest(buildDir));
});

gulp.task('watch', function() {
	gulp.watch([srcJs], ['js']);
	gulp.watch([srcHtml], ['html']);
});

gulp.task('browser-sync', function() {
	browserSync.init([buildDir + '/**.*'], {
		server: {
			baseDir: buildDir
		}
	});
});

gulp.task('default', [
	'html',
	'js',
	'watch',
	'browser-sync'
]);
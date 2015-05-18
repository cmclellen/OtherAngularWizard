var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	path = require('path');

var srcDir = './src',
	buildDir = './build',
	appDir = './app'
	srcHtml = srcDir +  '/*.html',
	srcJs = appDir + '/*.js';

gulp.task('html', function() {	
	gulp.src(srcHtml)
		.pipe(gulp.dest(buildDir));
});

gulp.task('js', function() {
	gulp.src(srcJs)
		.pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('scripts', function() {
	gulp.src(srcJs)
		.pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('watch', function() {
	var files = [
		'node_modules/angular/angular.js'
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/scripts'));
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
	'scripts',
	'watch',
	'browser-sync'
]);
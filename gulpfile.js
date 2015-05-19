var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	path = require('path'),
	reload = browserSync.reload;

var srcDir = './src',
	buildDir = './build',
	appDir = './app'
	srcHtml = appDir +  '/**/*.html',
	srcJs = appDir + '/**/*.js';

gulp.task('html', function() {	
	gulp.src(srcDir+'/**/*.html')
		.pipe(gulp.dest(buildDir));

	gulp.src([srcHtml])
		.pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('js', function() {
	gulp.src(srcJs)
		.pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('scripts', function() {
	var files = [
		'node_modules/angular/angular.js'
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/scripts'));
});

gulp.task('styles', function() {
	var files = [
		'node_modules/bootstrap/dist/**/*.*'
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/styles/bootstrap'));

	files = [
		'node_modules/font-awesome/**/*.*'
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/styles/font-awesome'));
});

gulp.task('watch', function() {
	gulp.watch(srcDir+'/**/*.html', ['html']);
	gulp.watch(srcHtml, ['html']);
	gulp.watch(srcJs, ['js']);
});

gulp.task('browser-sync', function() {
	browserSync.init([buildDir + '/**/*.*'], {
		server: {
			baseDir: buildDir
		}
	});
});

gulp.task('default', [
	'html',
	'js',
	'scripts',
	'styles',
	'watch',
	'browser-sync'
]);
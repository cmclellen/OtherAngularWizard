var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	path = require('path'),
	reload = browserSync.reload,
	bower = require('gulp-bower'),
	notify = require("gulp-notify"),
	sass = require('gulp-sass'),
	ngHtml2Js = require("gulp-ng-html2js"),
	install = require("gulp-install"),
	clean = require('gulp-clean'),
	concat = require('gulp-concat');

var srcDir = './src',
	buildDir = './build',
	appDir = './app',
	imagesDir = './images'
	srcHtml = appDir +  '/**/*.html',
	srcJs = appDir + '/**/*.js',
	srcCss = './css',
	srcSass = './sass/**/*.scss',
	bowerDir = './bower_components';

gulp.task('clean', function () {  
  return gulp.src(buildDir, {read: false})
    .pipe(clean());
});

gulp.task('html', function() {	
	gulp.src([srcDir+'/**/*.html', imagesDir+'/*.*'])
		.pipe(gulp.dest(buildDir));
});

gulp.task('templates', function() {
	gulp.src("app/**/*.html")
    .pipe(ngHtml2Js({
        moduleName: "templates",
        prefix: "app/"
    }))
    .pipe(gulp.dest("./app/templates"));
});

gulp.task('js', function() {
	var files = [
		appDir + '/app.js',
		appDir + '/**/*.js'
	];
	gulp.src(files)
		.pipe(concat('all.js'))
		.pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('sass', function() {
	gulp.src(srcSass)
		.pipe(sass().on("error", notify.onError(function (error) {
      	return "Error: " + error.message;
      })))
		.pipe(gulp.dest(buildDir + '/css'));
});

gulp.task('scripts', function() {
	var files = [
		bowerDir+'/angular/angular*.min.*',
		bowerDir+'/angular-bootstrap/ui-bootstrap*.min.*',
		bowerDir+'/angular-animate/angular-animate*.min.*',
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/scripts'));
});

gulp.task('styles', function() {
	var files = [
		'node_modules/bootstrap/dist/css/*.min.*',
		'node_modules/font-awesome/css/**/*.min.*'
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/css'));

	files = [
		'node_modules/font-awesome/fonts/**/*.*'
	];
	gulp.src(files)
		.pipe(gulp.dest(buildDir + '/fonts'));
});

gulp.task('watch', function() {
	gulp.watch(srcDir+'/**/*.html', ['html']);
	gulp.watch(srcHtml, ['html']);
	gulp.watch(srcJs, ['js']);
	gulp.watch(srcSass, ['sass']);	
});

gulp.task('browser-sync', function() {
	browserSync.init([buildDir + '/**/*.*'], {
		server: {
			baseDir: buildDir
		}
	});
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('install', function() {
	gulp.src(['./bower.json', './package.json'])
	  .pipe(install());	
});

gulp.task('default', [
	'clean',
	'templates',
	'js',
	'html',
	'sass',
	'scripts',
	'styles',
	'watch',	
	'browser-sync'
]);
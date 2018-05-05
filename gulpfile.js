const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
      files: ['public/**/*.*'],
      browser: 'google chrome',
      port: 5000,
	});
});

gulp.task('sass', function() {
  return gulp
    .src('public/scss/main.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', function() {
  gulp.watch('public/scss/**/*.scss', ['sass']);
  gulp.watch('views/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'sass', 'browserSync']);

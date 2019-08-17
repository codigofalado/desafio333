const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

//PATHS
const html_path = 'app/*.html';
const sass_path = 'app/sass/**/*.scss';

//WATCH 
gulp.task('browserSync', ['sass'], function() {

	browserSync.init({
		server: 'app'
	});
	
	gulp.watch(sass_path, ['sass']);
	gulp.watch(html_path).on('change', browserSync.reload);
})

//SASS-COMPILE 
gulp.task('sass', function() {
	return gulp.src(sass_path)
		.pipe(sass({ outputStyle: 'default' }).on('error', sass.logError))
		.pipe(autoprefixer({ overrideBrowserlist:['cover 100%'] }))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.stream());
})

//DEFAULT TASK
gulp.task('default', ['sass']);
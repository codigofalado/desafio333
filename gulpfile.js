var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync').create();
var reload  = browserSync.reload;
var php  = require('gulp-connect-php');
var svgmin = require('gulp-svgmin');
var wait = require('gulp-wait');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// svg
gulp.task('svg', function () {
  return gulp.src('dev/svg/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('assets/svg/'))
  .pipe(browserSync.stream());
});

// php
gulp.task('php', function() {
    php.server({ base: 'app', keepalive: true})
});

//sass
gulp.task('sass', function (callback) {
  return gulp.src(['dev/scss/**/*.scss'])
      .pipe(wait(1500))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      //.pipe(concat('main.css'))
      //.pipe( autoprefixer({browsers: ['> 2%', 'last 2 versions'], cascade: false}) )
      .pipe(cssmin())
      //.pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('assets/css'))
      //.on('end', callback);
      .pipe(browserSync.stream());
});

//js
gulp.task('scripts', function () {
  return gulp.src(['dev/js/*.js'])
    .pipe(uglify())
    //.pipe(concat('main.min.js'))
    .pipe(gulp.dest('assets/js/'))
});

//imagemin
gulp.task('imagemin', function() {
  var imgSrc = 'dev/img/**/*.+(png|jpg|gif)',
  imgDst = 'assets/img';
  gulp.src(imgSrc)
  .pipe(changed(imgDst))
  .pipe(imagemin())
  .pipe(gulp.dest(imgDst))
  .pipe(browserSync.stream());
});

//sprites
gulp.task('sprites', function () {
  var spriteData = gulp.src('dev/img/sprite/**/*')
    .pipe(spritesmith({
      imgName: 'sprite-site.png',
      cssName: '_sprite.scss',
      padding: 10
    }))
  spriteData.img.pipe(gulp.dest('assets/img/'))
  spriteData.css.pipe(gulp.dest('dev/scss/partials/base/'))
  .pipe(browserSync.stream());
});

//browser-sync
gulp.task('browser-sync', ['php'], function () {
  browserSync.init({
    proxy: "http://localhost",
  });
});

//watch
gulp.task('watch', ['browser-sync', 'sass', 'svg', 'scripts', 'imagemin', 'php'], function () {
  gulp.watch('dev/svg/*.svg', ['svg']);
  gulp.watch('dev/img/sprite/**', ['sprites']);
  gulp.watch('dev/js/**/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('*.php', ['php']).on('change', browserSync.reload);
  gulp.watch('inc/*.php', ['php']).on('change', browserSync.reload);
  gulp.watch('dev/img/**', ['imagemin']);
});


gulp.task('default', ['imagemin', 'watch', 'sass', 'scripts', 'sprites', 'browser-sync', 'php', 'svg']);
gulp.task('faster', ['watch']);
gulp.task('js', ['scripts']);

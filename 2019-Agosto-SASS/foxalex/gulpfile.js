var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp
    .src(['./src/sass/main.scss', './src/sass/canvas.scss'])
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp
    .src(['node_modules/babel-polyfill/dist/polyfill.js', 'src/js/**/*.js'])
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task(
  'server',
  gulp.series('sass', function() {
    browserSync.init({
      server: './src'
    });

    gulp.watch('./src/**/*.scss', gulp.series('sass'));
    gulp
      .watch(['./src/**/*.html', './src/js/**/*.js'])
      .on('change', browserSync.reload);
  })
);

gulp.task(
  'build',
  gulp.series('sass', 'scripts', () => {
    gulp.src('src/assets/**/*').pipe(gulp.dest('dist/assets/'));

    gulp.src('src/**/*.html').pipe(gulp.dest('dist/'));

    return gulp.src('src/css/**/*').pipe(gulp.dest('dist/css/'));
  })
);

gulp.task('default', gulp.series('server'));

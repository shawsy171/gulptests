var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlreplace = require('gulp-html-replace');
var cdnify = require('gulp-cdnify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css/less/'));
});

gulp.task('styles',['less'], function () {
  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat("css/styles.min.css"))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function(cb) {
    pump([
      gulp.src('src/**/*.js'),
      concat('js/scripts.min.js'),
      gulp.dest('dist'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('html', function() {
    gulp.src('src/**/*.{jsp,html}')
        .pipe(htmlreplace({
            'css': 'css/styles.min.css',
            'js': 'js/scripts.min.js',
            'home-style-min' : 'css/style.min.css',
            'homeFormValidationMin' : 'js/formValidation.min.js',
            'homeMmenuMin' : 'js/mmenu.min.js',
            'main_home_min_js' : 'dist/js/main_home.min.js',
            'home_min_js' : 'js/home.min.js'
        }))
        .pipe(cdnify({
                base: 'http://d2qx2n5ka94rye.cloudfront.net/'
            })
        )
        .pipe(gulp.dest('dist/'));
});

// can i force 'cdnify' to run after 'html' has run
gulp.task('cdnify', function () {

    return gulp.src(['dist/**/*.{css,html}'])
        .pipe(cdnify({
                base: 'http://d2qx2n5ka94rye.cloudfront.net/'
            })
        )
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', function() {
    gulp.start('styles', 'scripts' , 'html');
});




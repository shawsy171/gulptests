var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cdnify = require('gulp-cdnify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var watchLess = require('gulp-watch-less');
var del = require('del');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

// config
var src;
var dist;

// processed the less files
gulp.task('less', function () {
    return gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css/less/'));
});

// watches for changes on the less files
gulp.task('less-watch', function () {
    watchLess('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/less/'));
});

// add CSS prefixes and minify's CSS'
gulp.task('styles',['less'], function () {
  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(concat("css/styles.min.css"))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/'));
});

// minify's javascipt
gulp.task('scripts', function(cb) {
    pump([
        gulp.src('src/**/*.js'),
            // concat('js/scripgitsts.min.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('html', ['less'], function () {
    return gulp.src([ 'src/*.{html,jsp}', '!src/index-backup.html' ])
        .pipe(useref())
        .pipe(gulpif('*.css', sourcemaps.init()))
        .pipe(gulpif('*.js', sourcemaps.init()))
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', autoprefixer()))
            .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.css', sourcemaps.write('maps')))
        .pipe(gulpif('*.js', sourcemaps.write('maps')))
        .pipe(cdnify({
                base: 'http://d2qx2n5ka94rye.cloudfront.net/'
            })
        )
        .pipe(gulp.dest('dist'));
});

// can I force 'cdnify' to run after 'html' has run
gulp.task('cdnify', ['html'], function () {

    return gulp.src(['dist/**/*.{css,html,jsp}'])
        .pipe(cdnify({
                base: 'http://d2qx2n5ka94rye.cloudfront.net/'
            })
        )
        .pipe(gulp.dest('dist/'));
});

var moveHTML = [
    './dist/**/*.{jsp.html}'
];

gulp.task('move-html', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(moveHTML, { base: 'dist/' })
  .pipe(gulp.dest('src'));
});

var filesToMove = [
    './src/images/**/*.*'
];

gulp.task('move-img', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: 'src/' })
  .pipe(gulp.dest('dist'));
});

// Clean
// deletes temporary less folder
gulp.task('clean', ['html'], function () {
    return del(['src/css/less']);
});

// Default task
gulp.task('default', function() {
    gulp.start('html', 'clean', 'move-img');
});

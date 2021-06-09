const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function compSass(){
    return gulp
    .src('css/scss/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

function gulpJS(){
    return gulp
    .src('js/modules/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

function browser(){
    browserSync.init({
        server:{
            baseDir: "./"
        }
    })
}

function watch(){
    gulp.watch('css/scss/**/*.scss', compSass);
    gulp.watch(['js/**/*.js', '!js/main.js'], gulpJS);
    gulp.watch(['*.html', './**/*.html']).on('change', browserSync.reload);
}

exports.gulpJS = gulpJS;
exports.browser = browser;
exports.compSass = compSass;
exports.watch = watch;
gulp.task('default', gulp.parallel(watch, browser, compSass, gulpJS));
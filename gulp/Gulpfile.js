var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require("gulp-uglify"); 


function style(){
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error',  sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('../assets/css'));
}

exports.style = style

function scripts(){
    return gulp.src(['./js/vendors/*.js', './js/custom.js'])
        .pipe(concat('custom.js'))
        //.pipe(uglify())
        .pipe( gulp.dest('../assets/js') );
}

exports.scripts = scripts

function watch(){
    gulp.watch('./sass/*.scss', style);
    gulp.watch('./js/*.js', scripts);
}

exports.watch = watch
const {task, src, dest, series} = require("gulp");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

task("js", () => {
    return src("src/js/*.js")
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(dest("dist"));
});

task("css", () => {
    return src("src/css/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(dest("dist"));
})

task("default", series("js", "css"));
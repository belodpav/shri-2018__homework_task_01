'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const path = require('path');
const url = require('gulp-css-url-adjuster');
const autoprefixer = require('autoprefixer-core');
const postcss = require('gulp-postcss');
const del = require('del');

const params = {
    out: 'docs',
    htmlSrc: './bundles/index/index.html',
    levels: ['blocks'] // Уровни переопределения
};

const getFileNames = require('html2bl').getFileNames(params);

gulp.task('default', ['build', 'server']);

gulp.task('clean', () => {
    return del(params.out);
});

gulp.task('server', () => {
    browserSync.init({
        server: params.out
    });

    gulp.watch('*.html', ['html']);

    gulp.watch(params.levels.map((level) => {
        const cssGlob = level + '/**/*.css';
        return cssGlob;
    }), ['css']);
});

gulp.task('build', ['clean'], () => {
    gulp.start(['html', 'css', 'images', 'fonts']);
});

gulp.task('html', () => {
    gulp.src(params.htmlSrc)
        .pipe(rename('index.html'))
        .pipe(gulp.dest(params.out))
        .pipe(reload({stream: true}));
});

gulp.task('css', () => {
    getFileNames.then((files) => {
        gulp.src(files.dirs.map((dir) => dir + '/**/*.css'))
            .pipe(concat('style.css'))
            .pipe(postcss([autoprefixer()]))
            .pipe(gulp.dest(params.out))
            .pipe(reload({stream: true}));
    }).done();
});

gulp.task('fonts', () => {
    gulp.src('./fonts/*')
        .pipe(gulp.dest(path.join(params.out, 'fonts')));
});

gulp.task('images', () => {

    const levels = params.levels.map((level) => {
        const imgGlob = level + '/**/*.{png,jpg,svg}';

        return imgGlob;
    });

    return gulp.src(levels)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(params.out + '/images/'));
});

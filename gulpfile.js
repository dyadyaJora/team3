var gulp = require('gulp'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    autoprefixer = require('gulp-autoprefixer');

path = {
    src: {
        js: './static/src/app/**/*.js',
        css: './static/src/css/*.css',
        sass: './static/src/sass/*.scss',
        templates: './static/src/app/templates/**/*.html',
        fonts: './static/src/fonts/*',
        img: './static/src/img/*',
        imgSvg: './static/src/img/*.svg',
        imgJpg: './static/src/img/*.jpg',
        imgPng: './static/src/img/*.png'
    },
    dist: {
        js: './build/js/',
        css: './build/css/',
        fonts: './build/fonts/',
        img: './build/img/',
        templates: './build/templates'
    }
}

gulp.task('vendors', function () {
    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-resource/angular-resource.min.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('fonts', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('imgMin', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('jsConcat', function () {
    gulp.src(path.src.js)
        .pipe(concat('pepo.all.js'))
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('templates', function () {
    gulp.src(path.src.templates) 
        .pipe(gulp.dest(path.dist.templates));
});

gulp.task('sass', function () {
    gulp.src(path.src.sass)
        .pipe(sass())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('autoprefixer', ['sass'], function () {
    gulp.src('./build/css/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('watch', function () {
    watch(path.src.js, function () {
        gulp.run('jsConcat');
    });
    watch(path.src.sass, function () {
        gulp.run('autoprefixer');
    });
    watch(path.src.templates, function () {
        gulp.run('templates');
    });
});

gulp.task('dev', ['vendors', 'autoprefixer', 'fonts', 'jsConcat', 'templates', 'imgMin', 'watch'], function () {
});

gulp.task('default', ['vendors', 'autoprefixer', 'fonts', 'jsConcat', 'templates', 'imgMin'], function () {
});














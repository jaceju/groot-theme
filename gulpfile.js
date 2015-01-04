'use strict';

/////// COMMON ///////

// Load plugins
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var styleDestPath = 'css';

// Templates
gulp.task('templates', function() {
    return gulp.src('assets/templates/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('public'))
        .pipe($.size({ title: 'templates' }));
});

// Styles
gulp.task('styles', function() {
    return gulp.src(['assets/styles/*.sass'])
        .pipe($.rubySass({
            style: 'compressed',
            precision: 10
        }))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(styleDestPath))
        .pipe($.size({ title: 'styles' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['public', 'css'], cb);
});

/////// DEVELOPMENT ///////

// Prepare for development
gulp.task('prepare', function (cb) {
    styleDestPath = 'public/css';
    runSequence('clean', ['templates', 'styles'], cb);
});

// Start Web Server
gulp.task('serve', function() {
    gulp.src('public')
        .pipe($.webserver({
            livereload: true,
            open: true
        }));
});

// Watch
gulp.task('watch', ['prepare'], function() {
    gulp.start('serve');
    gulp.watch('assets/templates/*.jade', ['templates']);
    gulp.watch('assets/styles/*.sass', ['styles']);
});

/////// BUILD ///////

// Build
gulp.task('default', function(cb) {
    styleDestPath = 'css';
    runSequence('clean', 'styles', cb);
});
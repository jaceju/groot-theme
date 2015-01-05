'use strict';

/////// COMMON ///////

// Load plugins
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

// Templates
gulp.task('templates', function() {
    return gulp.src('assets/templates/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('build'))
        .pipe($.size({ title: 'templates' }));
});

// Styles
gulp.task('styles', function() {
    return gulp.src('assets/styles/*.sass')
        .pipe($.rubySass({
            style: 'compressed',
            precision: 10
        }))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'))
        .pipe($.size({ title: 'styles' }));
});

// Custom
gulp.task('custom', function() {
    return gulp.src('assets/custom/css/*.css')
        .pipe(gulp.dest('build/css'))
        .pipe($.size({ title: 'custom' }));
});

// Clean
gulp.task('clean', function(cb) {
    del('build', cb);
});

/////// DEVELOPMENT ///////

// Prepare for development
gulp.task('prepare', function (cb) {
    runSequence('clean', ['templates', 'styles', 'custom'], cb);
});

// Start Web Server
gulp.task('serve', function() {
    gulp.src('build')
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
    runSequence('clean', 'styles', cb);
});

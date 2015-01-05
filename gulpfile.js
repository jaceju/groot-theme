'use strict';

/////// COMMON ///////

// Load plugins
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

// Helpers
function sassc(name, source, dest) {
    return gulp.src(source)
        .pipe($.rubySass({
            style: 'compressed',
            precision: 10
        }))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(dest))
        .pipe($.size({ title: name }));
}

// Styles
gulp.task('styles', function() {
    return sassc('styles', 'assets/styles/*.sass', 'dev/build/css');
});

// Custom
gulp.task('custom', function() {
    return sassc('custom', 'example/styles/*.scss', 'dev/custom/css');
});

// Clean
gulp.task('clean', function(cb) {
    del(['dev', 'build'], cb);
});

/////// DEVELOPMENT ///////

// Prepare for development
gulp.task('prepare', function (cb) {
    runSequence('clean', 'styles', 'custom', 'hologram', cb);
});

// Start Web Server
gulp.task('serve', function() {
    gulp.src('dev')
        .pipe($.webserver({
            livereload: true,
            open: true
        }));
});

// Style Guide / UI Patterns
gulp.task('hologram', function() {
    return gulp.src('hologram.yml')
        .pipe($.hologram({ bundler: true }));
});

// Watch
gulp.task('watch', ['prepare'], function() {
    gulp.start('serve');
    gulp.watch('assets/templates/*.html', ['hologram']);
    gulp.watch('assets/styles/*.sass', ['styles', 'hologram']);
    gulp.watch('example/styles/*.scss', ['custom', 'hologram']);
});

/////// BUILD ///////

// Templates
gulp.task('templates', function() {
    return gulp.src('assets/templates/*.html')
        .pipe(gulp.dest('.'))
        .pipe($.size({ title: 'templates' }));
});


// Styles
gulp.task('build', function() {
    return sassc('styles', 'assets/styles/*.sass', 'build/css');
});

// Build
gulp.task('default', function(cb) {
    runSequence('clean', ['build', 'templates'], cb);
});

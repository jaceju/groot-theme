'use strict';

/////// COMMON ///////

// Load plugins
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

// Helper: SASS
function sassHelper(name, source, dest) {
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

// Helper: Script
function scriptHelper(dest) {
    return gulp.src([
              './bower_components/jquery/dist/jquery.js',
              './bower_components/jquery-sticky/jquery.sticky.js',
              './assets/scripts/main.js'
            ])
          .pipe($.concat('docs.js'))
          .pipe($.uglify())
          .pipe(gulp.dest(dest));
}

// Styles
gulp.task('styles', function() {
    return sassHelper('styles', 'assets/styles/*.sass', 'dev/build/css');
});

// Custom
gulp.task('custom', function() {
    return sassHelper('custom', 'example/styles/*.scss', 'dev/custom/css');
});

// JS
gulp.task('scripts', function() {
    return scriptHelper('dev/build/js');
});

// Clean
gulp.task('clean', function(cb) {
    del(['dev', 'build', '*.html'], cb);
});

/////// DEVELOPMENT ///////

// Prepare for development
gulp.task('prepare', function (cb) {
    runSequence('clean', 'styles', 'scripts', 'custom', 'hologram', cb);
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
    gulp.watch('hologram.yml', ['hologram']);
    gulp.watch('assets/templates/*.html', ['hologram']);
    gulp.watch('assets/scripts/*.js', ['scripts', 'hologram']);
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


// Build styles
gulp.task('build:css', function() {
    return sassHelper('styles', 'assets/styles/*.sass', 'build/css');
});

// Build scripts
gulp.task('build:js', function() {
    return scriptHelper('build/js');
});

// Build
gulp.task('default', function(cb) {
    runSequence('clean', ['build:css', 'build:js', 'templates'], cb);
});

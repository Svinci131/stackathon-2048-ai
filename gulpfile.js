const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const babel = require('gulp-babel');


gulp.task('browserify', function() {
    // this task will run browserify, just like we did from terminal
    // but inside this js file instead
    return browserify('./javascript/index.js')
    	.transform("babelify", {presets: ["es2015"]})
        // this .bundle() method walks through the code
        // and concatenates all the dependencies in order
        .bundle()
        // here, we take the concatenated dependencies
        // and "pipe" it to the bundled.js file
        .pipe( source( 'bundled.js' ) )
        .pipe( streamify( uglify().on('error', err => {
        	console.log(err);
        }) ) )
        // then we write this file to the current directory
        .pipe( gulp.dest('./javascript/') );
});

gulp.watch('javascript/*', ['browserify']);
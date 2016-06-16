var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');



gulp.task('browserify', function() {
    return browserify('javascript/main.js')
    	.bundle()
        .pipe( source( 'javascript/bundled.js' ) )
        // we take our browserified stream and run it through
        // uglify's minifier
        // need to get workign w es6
        // .pipe( streamify( uglify() ) )
        .pipe( gulp.dest('./') );
});

gulp.watch('javascript/*', ['browserify']);
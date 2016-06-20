const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const babel = require('gulp-babel');



gulp.task('browserify', function() {
    return browserify('./javascript/index.js')
    	.transform("babelify", {presets: ["es2015"]})
  
        .bundle()
   
        .pipe( source( 'bundled.js' ) )
        .pipe( streamify( uglify().on('error', err => {
        	console.log(err);
        }) ) )
        .pipe( gulp.dest('minjs') );
});

gulp.watch('javascript/*', ['browserify']);



// gulp.task('bundleHumanGame', function() {
//     return browserify('./humanGame/index.js')
//         .transform("babelify", {presets: ["es2015"]})
//         .bundle()
//         .pipe( source( 'bundledAi.js' ) )
//         .pipe( streamify( uglify().on('error', err => {
//             console.log(err);
//         }) ) )
//         .pipe( gulp.dest('minjs') );
// });

// gulp.task('bundleAI', function() {
//     return browserify('./ai/index.js')
//         .transform("babelify", {presets: ["es2015"]})
//         .bundle()
//         .pipe( source( 'bundledAi.js' ) )
//         .pipe( streamify( uglify().on('error', err => {
//             console.log(err);
//         }) ) )
//         .pipe( gulp.dest('minjs') );
// });

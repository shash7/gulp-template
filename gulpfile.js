
/* ----------------------------------------------------------------
 * gulpfile.js
 * 
 * A starter gulpfile.
 * 
 * Menu:
 *  packages
 *  options
 *  taskss
 * ---------------------------------------------------------------- */


/* ----------------------------------------------------------------
 * $tasks
 * ---------------------------------------------------------------- */
var gulp         = require('gulp');
var less         = require('gulp-less');
var notify       = require('gulp-notify');
var rename       = require("gulp-rename");
var plumber      = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');


/* ----------------------------------------------------------------
 * $options
 * ---------------------------------------------------------------- */
var paths = {
	less : ['less/*.less']
};

var opts = {
	autoprefixer : ['last 8 versions'],
	less : {
		path: ['less/*.less'], // The directory where all the less files are. This directory will be under watch
		main: 'less/lightgrid.less', // Main less file to compile
		output: '', // Leaving output to blank will not rename the output file
		dest: 'css' // Will output the compiled css into the css directory
	}
};


/* ----------------------------------------------------------------
 * $tasks
 * ---------------------------------------------------------------- */
// Compiles less files
gulp.task('less', function() {
	return gulp.src(opts.less.main)
		.pipe(plumber({
			errorHandler: function (err) {
				//notify(JSON.stringify(err));
				console.log(JSON.stringify(err));
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(autoprefixer({
			browsers: opts.autoprefixer
		}))
		.pipe(rename(function (path) {
			if(opts.less.output) {
				var fileName = opts.less.output.split('.');
				path.basename = fileName[0];
				path.extname = '.' + fileName[1];
			}
		}))
		.pipe(gulp.dest(opts.less.dest))
		.pipe(notify('Compiled <%= file.relative %>'));
});

// Watches directories and/or files
gulp.task('watch', function() {
	gulp.watch(opts.less.path, ['less']);
});

gulp.task('init', function() {
	notify('Gulp started');
});

// Default task
gulp.task('default', ['init', 'less', 'watch']);

/*
 * Jack Sutherland
 * https://www.jacksutherland.com
 *
 * Website Gulp File
 */

// Gulp Tasks

const { src, dest, parallel, watch } = require('gulp');

// Gulp Plugins

const rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  terser = require('gulp-terser'),
      concat = require('gulp-concat');

// CSS Commands

var css = {
	site: function(callback)
	{
	  	return src(['./src/sass/main.scss'])
			.pipe(sass())
			//.pipe(concat('site.css'))
	        .pipe(dest('./web/assets/css/'))
	        .pipe(sass({outputStyle: 'compressed'}))
	        .pipe(rename({ suffix: '.min' }))
	        .pipe(dest('./web/assets/css/'));
	}
};

// JavaScript Commands

var js = {
	site: function(callback)
	{
		return src([
				'./src/js/site.js'
			])
			//.pipe(concat('site.js'))
			.pipe(dest('./web/assets/js/'))
			.pipe(terser())
			.pipe(rename({ suffix: '.min' }))
			.pipe(dest('./web/assets/js/'));
	}
};

// Execute Default Tasks

exports.default = parallel(css.site, js.site);

// Execute Watch Tasks

exports.watch = function()
{
	exports.default();

	// watch js files
	watch('./src/sass/main.scss', css.site);
	
	// watch scss files
	watch('./src/js/*.js', js.site);
}

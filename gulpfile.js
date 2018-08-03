'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const csso = require('gulp-csso');
const concat = require('gulp-concat');
const nunjucksRender = require('gulp-nunjucks-render');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


// gulp.task('message', function(){
//     return console.log('Gulp is running...');
//   });

// Copy All HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
  });
  
  // Optimize Images
  gulp.task('imageMin', () =>
      gulp.src('src/assets/img/*')
          .pipe(imagemin())
          .pipe(gulp.dest('dist/images'))
  );
  
  // Minify JS
  gulp.task('minify', function(){
    gulp.src('src/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
  });

  // Compile Sass
// gulp.task('csso', function(){
//     gulp.src('src/assets/css/*.css')
//         .pipe(csso().on('error', csso.logError))
//         .pipe(gulp.dest('dist/css'));
//   });

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/assets/css/*.css')
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('dist/css'))
});
  
  // Scripts
  gulp.task('scripts', function(){
    gulp.src('src/assets/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
  });

  gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['src/templates']
      }))
    // output files in folder
    .pipe(gulp.dest('dist'))
  });

  gulp.task('webserver', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('dist')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['src/templates']
      }))
    // output files in folder
    .pipe(gulp.dest('dist'))
  });
  
  gulp.task('default', ['copyHtml', 'imageMin', 'styles', 'scripts', 'nunjucks']);
  
  gulp.task('watch', function(){
    gulp.watch('src/assets/js/*.js', ['scripts']);
    gulp.watch('src/assets/images/*', ['imageMin']);
    gulp.watch('src/assets/css/*.css', ['styles']);
    gulp.watch('src/assets/*.html', ['copyHtml']);
    gulp.watch('src/pages/**/*.+(html|nunjucks)', ['nunjucks']);
  });
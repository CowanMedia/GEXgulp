const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const css = require('gulp-minify-css');
const concat = require('gulp-concat');
const nunjucksRender = require('gulp-nunjucks-render');


gulp.task('message', function(){
    return console.log('Gulp is running...');
  });

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
gulp.task('css', function(){
    gulp.src('src/assets/css/*.css')
        .pipe(css().on('error', css.logError))
        .pipe(gulp.dest('dist/css'));
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
    // output files in src folder
    .pipe(gulp.dest('src'))
  });
  
  gulp.task('default', ['message', 'copyHtml', 'imageMin', 'css', 'scripts', 'nunjucks']);
  
  gulp.task('watch', function(){
    gulp.watch('src/assets/js/*.js', ['scripts']);
    gulp.watch('src/assets/images/*', ['imageMin']);
    gulp.watch('src/assets/css/*.css', ['css']);
    gulp.watch('src/assets/*.html', ['copyHtml']);
    gulp.watch('src/pages/**/*.+(html|nunjucks)', ['nunjucks']);
  });
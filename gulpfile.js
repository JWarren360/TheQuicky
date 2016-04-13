// Include gulp
var gulp = require('gulp');
// Include plugins
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
// Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src('src/script/*.js')
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('./js'));
});
//compress images
gulp.task('images', function() {
  return gulp.src('src/images/*.*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./images'));
});
gulp.task('watch', function() {
	//Watch html file
	gulp.watch('src/index.html');
	//Watch CSS file
	gulp.watch('src/css/*.css');
	// Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
   // Watch image files
  gulp.watch('src/images/**/*', ['images']);
 });
 // Default Task
gulp.task('default', ['scripts']);
var gulp = require('gulp');
var traceur = require('gulp-traceur');

var paths = {
    scripts: ['src/*.js'],
    html: 'src/*.html'
};

gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe(traceur({sourceMap: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function(){
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['scripts', 'html', 'watch']);

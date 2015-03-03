var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();
    

var paths = {
  scripts: ['src/lib/d3/d3.js', 'src/lib/c3/c3.js', 'src/angular-c3-chart.js']
};

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe($.jshint())
    .pipe($.jshint({reporter: 'jshint-stylish'}))
    .pipe($.notify({message: 'Linting Completed'}));
});

gulp.task('concat', function() {
  return gulp.src(['src/lib/c3/c3.min.css'])
    .pipe($.concat('angular-c3-chart.all.min.css'))
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({message: 'Done Concating'}));
});

gulp.task('uglify', function() {
  return gulp.src(paths.scripts)
    .pipe($.concat('angular-c3-chart.all.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({message: 'Done Uglify'}));
});

gulp.task('copy', function() {
  return gulp.src(['src/angular-c3-chart.js'])
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({message: 'Done Copy'}));
});


//task to tell travis to run karma start and run in phantom.js
gulp.task('test', $.shell.task([
  'karma start karma.conf.js --browsers Firefox --single-run'
]));

gulp.task('watch', function(){
  $.watch(paths.source, ['default']);
});

gulp.task('default', ['jshint', 'concat', 'uglify', 'copy']);

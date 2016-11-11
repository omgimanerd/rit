/**
 * @author Alvin Lin (alvin.lin.dev@gmail.com)
 */

var fs = require('fs');
var path = require('path');

var del = require('del');
var gulp = require('gulp');
var gulpShell = require('gulp-shell');

gulp.task('default', ['latex']);

gulp.task('latex', function() {
  return gulp.src('latex/makefile')
    .pipe(gulpShell([
      'make -C latex'
    ]));
});

gulp.task('clean', function() {
  return del([
    './**/output'
  ]);
});

gulp.task('watch', function() {
  gulp.watch('**/*.tex', ['latex']);
});

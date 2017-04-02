/**
 * @author Alvin Lin (alvin.lin.dev@gmail.com)
 */

var fs = require('fs');
var path = require('path');

var del = require('del');
var glob = require('glob');
var gulp = require('gulp');
var gulpChanged = require('gulp-changed');
var gulpPdflatex2 = require('gulp-pdflatex2');
var gulpPlumber = require('gulp-plumber');
var gulpRename = require('gulp-rename');

gulp.task('default', ['latex']);

var getOutputFile = function(texFile) {
  texFile = path.parse(texFile);
  return path.join(texFile.dir, 'output', texFile.name + '.pdf');
};

gulp.task('latex', function() {
  return gulp.src('./latex/**/*.tex')
    .pipe(gulpPlumber())
    .pipe(gulpChanged('./latex', { transformPath: getOutputFile }))
    .pipe(gulpPdflatex2({
      TEXINPUTS: ['./cls']
    }))
    .pipe(gulpRename((path) => {
      path.dirname += '/output';
      path.extname = '.pdf';
    }))
    .pipe(gulp.dest('./latex'))
});

gulp.task('latex-all', function() {
  return gulp.src('./latex/**/*.tex')
    .pipe(gulpPlumber())
    .pipe(gulpPdflatex2({
      TEXINPUTS: ['./cls']
    }))
    .pipe(gulpRename((path) => {
      path.dirname += '/output';
      path.extname = '.pdf';
    }))
    .pipe(gulp.dest('./latex'))
});

gulp.task('clean', function(done) {
  glob('./latex/**/*.tex', function(error, texFiles) {
    glob('./latex/**/output/*', function(error, outputFiles) {
      var correctOutputFiles = texFiles.map(getOutputFile).map(function(path) {
        return `./${path}`;
      });
      for (var file of outputFiles) {
        if (!correctOutputFiles.includes(file)) {
          console.log(`Deleted ${file}`);
          del(file);
        }
      }
      done();
    });
  });
});

gulp.task('clean-all', function() {
  return del(['./latex/**/output']);
});

gulp.task('watch', function() {
  gulp.watch('./**/*.tex', ['latex']);
});

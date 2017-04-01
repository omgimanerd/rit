/**
 * @author Alvin Lin (alvin.lin.dev@gmail.com)
 */

var fs = require('fs');
var path = require('path');

var del = require('del');
var gulp = require('gulp');
var gulpChanged = require('gulp-changed');
var gulpPDFLatex = require('./custompdflatex');
var gulpPlumber = require('gulp-plumber');
var gulpRename = require('gulp-rename');
var gulpShell = require('gulp-shell');
var gulpPrint = require('gulp-print');
var through = require('through2');

gulp.task('default', ['latex']);

var pdflatex = (options) => through.obj((file, encoding, next) => {
    if (file.isStream()) {
        file.extname = '.pdf';
        file.path = replaceExtension(file.path, file.extname);
        const output = node_pdflatex_1.default(file.contents, {
            shellEscape: options.shellEscape,
            texInputs: [file.base, ...options.texInputs],
        });
        file.contents = output;
        next(null, file);
    }
    else if (file.isBuffer()) {
        file.extname = '.pdf';
        file.path = replaceExtension(file.path, file.extname);
        const input = through();
        input.end(file.contents);
        const output = node_pdflatex_1.default(input, {
            shellEscape: options.shellEscape,
            texInputs: [file.base, ...options.texInputs],
        });
        getRawBody(output)
            .then(data => (file.contents = data) && next(null, file))
            .catch(err => next(err));
    }
    else
        next(null, file);
})

var getOutputFile = function(texFile) {
  texFile = path.parse(texFile);
  return path.join(texFile.dir, 'output', texFile.name + '.pdf');
};

gulp.task('latex', function() {
  return gulp.src('./latex/**/*.tex')
    .pipe(gulpPlumber(function() {
      console.log(arguments);
    }))
    .pipe(gulpChanged('./latex', { transformPath: getOutputFile }))
    .pipe(gulpPDFLatex({
      shellEscape: true,
      texInputs: ['./latex/cls']
    }))
    .pipe(gulpRename((path) => {
      path.dirname += '/output';
      path.extname = '.pdf';
    }))
    .pipe(gulpPrint((filename) => {
      return `Compiled ${filename}`;
    }))
    .pipe(gulp.dest('./latex'))
});

gulp.task('clean', function() {
  return del([
    './**/output'
  ]);
});

gulp.task('watch', function() {
  gulp.watch('./**/*.tex', ['latex']);
});

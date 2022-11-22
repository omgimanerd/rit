/**
 * @fileoverview gulpfile for watching and compiling .tex notes.
 * @author Alvin Lin (alvin@omgimanerd.tech)
 */

import del from 'del';
import glob from 'glob';
import gulp from 'gulp';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import pdflatex2 from 'gulp-pdflatex2';
import rename from 'gulp-rename';
import path from 'path';

const getOutputFile = texFile => {
  texFile = path.parse(texFile)
  return path.join(texFile.dir, 'output', texFile.name + '.pdf')
}

const compileChanged = () => {
  return gulp.src('./latex/**/*.tex')
    .pipe(plumber({
      errorHandler: function () {
        this.emit('end')
      }
    }))
    .pipe(changed('./latex', { transformPath: getOutputFile }))
    .pipe(pdflatex2({
      texInputs: ['./cls'],
      separator: process.platform === 'win32' ? ';' : ':',
    }))
    .pipe(rename(path => {
      path.dirname += '/output'
      path.extname = '.pdf'
    }))
    .pipe(gulp.dest('./latex'))
}

const compileAll = () => {
  return gulp.src('./latex/**/*.tex')
    .pipe(pdflatex2({
      cliOptions: ['-shell-escape'],
      separator: process.platform === 'win32' ? ';' : ':',
    }))
    .pipe(rename(path => {
      path.dirname += '/output'
      path.extname = '.pdf'
    }))
    .pipe(gulp.dest('./latex'))
}

const clean = done => {
  glob('./latex/**/*.tex', (error, texFiles) => {
    glob('./latex/**/output/*', (error, outputFiles) => {
      const correctOutputFiles = texFiles.map(getOutputFile).map(path => {
        return `./${path}`
      })
      for (const file of outputFiles) {
        if (!correctOutputFiles.includes(file)) {
          console.log(`Deleted ${file}`)
          del(file)
        }
      }
      done()
    })
  })
}

const purge = () => {
  return del(['./latex/**/output'])
}

const watchFiles = () => {
  gulp.watch('./latex/**/*.tex', compileChanged)
}

export {
  compileChanged as default,
  compileChanged as latex,
  compileAll as latexAll,
  clean as clean,
  purge as purge,
  watchFiles as watch,
}

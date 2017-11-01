/**
 * @fileoverview gulpfile for watching and compiling .tex notes.
 * @author Alvin Lin (alvin@omgimanerd.tech)
 */

const del = require('del')
const fs = require('fs')
const glob = require('glob')
const gulp = require('gulp')
const gutil = require('gulp-util')
const gulpChanged = require('gulp-changed')
const gulpPdflatex = require('gulp-pdflatex2')
const gulpPlumber = require('gulp-plumber')
const gulpRename = require('gulp-rename')
const path = require('path')

const getOutputFile = texFile => {
  texFile = path.parse(texFile)
  return path.join(texFile.dir, 'output', texFile.name + '.pdf')
}

gulp.task('default', ['latex'])

gulp.task('latex', () => {
  return gulp.src('./latex/**/*.tex')
    .pipe(gulpPlumber({
      errorHandler: function() {
        this.emit('end')
      }
    }))
    .pipe(gulpChanged('./latex', { transformPath: getOutputFile }))
    .pipe(gulpPdflatex({
      cliOptions: ['-shell-escape'],
      texInputs: ['./cls']
    }))
    .pipe(gulpRename(path => {
      path.dirname += '/output'
      path.extname = '.pdf'
    }))
    .pipe(gulp.dest('./latex'))
})

gulp.task('latex-all', () => {
  return gulp.src('./latex/**/*.tex')
    .pipe(gulpPdflatex({
      cliOptions: ['-shell-escape'],
      texInputs: ['./cls']
    }))
    .pipe(gulpRename(path => {
      path.dirname += '/output'
      path.extname = '.pdf'
    }))
    .pipe(gulp.dest('./latex'))
})

gulp.task('clean', done => {
  glob('./latex/**/*.tex', function(error, texFiles) {
    glob('./latex/**/output/*', function(error, outputFiles) {
      const correctOutputFiles = texFiles.map(getOutputFile).map(path => {
        return `./${path}`
      })
      for (const file of outputFiles) {
        if (!correctOutputFiles.includes(file)) {
          gutil.log(`Deleted ${file}`)
          del(file)
        }
      }
      done()
    })
  })
})

gulp.task('clean-all', () => {
  return del(['./latex/**/output'])
})

gulp.task('watch', () => {
  gulp.watch('latex/**/*.tex', { cwd: './'}, ['latex'])
})

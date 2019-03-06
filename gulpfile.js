/**
 * @fileoverview gulpfile for watching and compiling .tex notes.
 * @author Alvin Lin (alvin@omgimanerd.tech)
 */

const del = require('del')
const fs = require('fs')
const glob = require('glob')
const { src, dest, watch } = require('gulp')
const changed = require('gulp-changed')
const plumber = require('gulp-plumber')
const pdflatex2 = require('gulp-pdflatex2')
const rename = require('gulp-rename')
const path = require('path')

const getOutputFile = texFile => {
  texFile = path.parse(texFile)
  return path.join(texFile.dir, 'output', texFile.name + '.pdf')
}

const compileChanged = () => {
  return src('./latex/**/*.tex')
    .pipe(plumber({
      errorHandler: function() {
        this.emit('end')
      }
    }))
    .pipe(changed('./latex', { transformPath: getOutputFile }))
    .pipe(pdflatex2({
      cliOptions: ['-shell-escape'],
      texInputs: ['./cls']
    }))
    .pipe(rename(path => {
      path.dirname += '/output'
      path.extname = '.pdf'
    }))
    .pipe(dest('./latex'))
}

const compileAll = () => {
  return src('./latex/**/*.tex')
    .pipe(pdflatex2({
      cliOptions: ['-shell-escape'],
      texInputs: ['./cls']
    }))
    .pipe(rename(path => {
      path.dirname += '/output'
      path.extname = '.pdf'
    }))
    .pipe(dest('./latex'))
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
  watch('./latex/**/*.tex', compileChanged)
}

module.exports = {
  default: compileChanged,
  latex: compileChanged,
  'latex-all': compileAll,
  clean: clean,
  purge: purge,
  watch: watchFiles
}

'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

let testFiles = ['./test/*.js'];
let scriptFiles = ['./lib/*.js', './model/*.js'];

gulp.task('lint', () => {
  return gulp.src(scriptFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('start', () => {
  nodemon({script: 'server.js', ext: 'js html', env: {'NODE_ENV':'development'}});
});

gulp.task('watch', () => {
  gulp.watch([scriptFiles], ['lint', 'test']);
});

gulp.task('default', ['lint', 'test']);

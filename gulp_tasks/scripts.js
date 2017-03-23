const gulp = require('gulp');
const tslint = require('gulp-tslint');

const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const tsConf = require('../tsconfig.json').compilerOptions;
const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.ts'))
      .pipe(tslint({
        formatter: 'verbose'
      }))
      .pipe(tslint.report())

    .pipe(sourcemaps.init())
    .pipe(typescript(tsConf))
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest(conf.path.tmp()));
}

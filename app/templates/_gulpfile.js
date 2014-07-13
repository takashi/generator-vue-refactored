var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    component = require('gulp-component-builder'),

gulp.task('scripts', ['lint'], function () {
    return gulp.src('component.json')
        .pipe(component.scripts())
        .pipe(gulp.dest('build'))
})

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('watch', function () {
    gulp.watch(['component.json', 'src/**/*'], ['default'])
})
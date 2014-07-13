var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    component = require('gulp-component-builder'),
    sass      = require('component-builder-sass')

gulp.task('scripts', ['lint'], function () {
    return gulp.src('component.json')
        .pipe(component.scripts())
        .pipe(gulp.dest('build'))
})

gulp.task('styles', function() {
    return gulp.src('component.json')<% if (sass) { %>
        .pipe(component.styles(function(builder) {
          builder.use('styles', sass());
        }))<% } else { %>
        .pipe(component.styles())<% } %>
        .pipe(gulp.dest('build'));
})

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('watch', function () {
    gulp.watch(['component.json', 'src/**/*.js'], ['scripts'])<% if (sass) { %>
    gulp.watch(['component.json', 'src/**/*.js'], ['styles']) <% } %>
})

gulp.task('default', ['scripts', 'styles'])

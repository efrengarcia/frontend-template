// Variables de dependencias
var gulp                = require('gulp'),
    inject              = require('gulp-inject'),
    jshint              = require('gulp-jshint'),
    stylus              = require('gulp-stylus'),
    webserver           = require('gulp-webserver'),
    stylish             = require('jshint-stylish'),
    nib                 = require('nib'),
    wiredep             = require('wiredep').stream;

// Servidor web de desarrollo
gulp.task('deploy', function() {
  gulp.src('app')
    .pipe(webserver({
      fallback: 'index.html',
      host: '0.0.0.0',
      livereload: true
    }));
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('app/**/*.html');
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('app/stylesheets/main.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('app/stylesheets'));
});

// Buscar errores en el JS y nos lo muestra por pantalla
gulp.task('jshint', function() {
   return gulp.src('./app/scripts/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
});

// Busca en las carpetas de estilos y javascript los archivos que hayamos creado para inyectarlos en el index.html
gulp.task('inject', function() {
   var sources = gulp.src([ './app/scripts/**/*.js', './app/stylesheets/**/*.css' ]);
   return gulp.src('index.html', { cwd: './app' })
      .pipe(inject(sources, {
         read: false,
         ignorePath: '/app'
      }))
      .pipe(gulp.dest('./app'));
});
// Inyecta las librerias que instalemos vía Bower
gulp.task('bower', function () {
   gulp.src('./app/index.html')
      .pipe(wiredep({
         directory: './app/lib'
      }))
      .pipe(gulp.dest('./app'));
});

// Vigila cambios en el código y ejecuta tareas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['bower']);
});

// Tareas que genera por default
gulp.task('default', ['deploy', 'inject', 'bower', 'watch']);

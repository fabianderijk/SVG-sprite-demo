var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');

var project = {
  spriteSource: 'src/*',
  spriteDestination: 'images/sprite.svg',
  spriteTemplate: 'tpl/sprite-template.scss',
  spriteScssDestination: 'scss/lib/_sprite.scss'
};

/**
 * @task generate-svg-sprite
 * Generate the SVG sprite.
 */
gulp.task('generate-svg-sprite', function() {
  return gulp
    .src(project.spriteSource)
    .pipe(svgSprite({
        shape: {
          spacing: {
            padding: 5
          }
        },
        mode: {
          css: {
            dest: './',
            layout: 'diagonal',
            sprite: project.spriteDestination,
            bust: false,
            render: {
              scss: {
                dest: project.spriteScssDestination,
                template: project.spriteTemplate
              }
            }
          }
        },
        variables: {
          mapname: 'icons'
        }
      }))
    .pipe(gulp.dest('./'));
});

/**
 * @task watch
 * Watch files and generate the sprite.
 */
gulp.task('watch', ['generate-svg-sprite'], function () {
  gulp.watch(project.spriteSource, ['generate-svg-sprite']);
});

/**
 * @task default
 * Default task so we can call gulp to use the watch task.
 */
gulp.task('default', ['watch']);
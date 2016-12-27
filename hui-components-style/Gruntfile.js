'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var project = require('./project'),
_ = require('lodash');


module.exports = function (grunt) {
  var hint, configs, pkg;

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // Package.json

  pkg = grunt.file.readJSON('package.json');

  // config jshint
  hint = grunt.file.readJSON('.jshintrc');
  hint.reporter = require('jshint-stylish');

  // load grunt configurations
  configs = {
    config: {
      src: project.path.tasksConfig + '/*.js' // path to task configurations, set in project.json
    },
    pkg: pkg,
    hint: hint,
    project: project,
    banner: '/*!\n' +
    ' * <%= pkg.name %>-<%= pkg.version %>\n' +
    ' * <%= pkg.author.name %>\n' +
    ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    ' */\n\n'
  };
  configs = require('load-grunt-configs')(grunt, configs);

  // define configuration for all tasks
  grunt.initConfig(configs);

  // load custom tasks
  grunt.loadTasks('./' + project.path.tasks);

  grunt.registerTask('build', 'Build files for testing.', [
    'compass:dev'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};

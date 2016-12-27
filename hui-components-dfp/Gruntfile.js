'use strict';


module.exports = function (grunt) {
    var project = require('./project'), configs;

    // load all locally installed grunt tasks
    require('load-grunt-tasks')(grunt);

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load local custom tasks
    //grunt.loadTasks('./' + project.path.tasks);

    // load hui-build tasks and config
    require('hui-grunt-build').grunt(grunt);

    // expand configs for running unit tests
    configs = {
        config: {
            src: './config/tasks/*js' // load-grunt-configs
        }
    };
    configs = require('load-grunt-configs')(grunt, configs);
    grunt.config.merge(configs);

    // default task
    grunt.registerTask('default', [
        'karma:unit_auto'
    ]);
};

'use strict';

//Shared Config jshint
module.exports.tasks = {
    jshint: {
        //Import config here instead of using .jshintrc so that options are merged
        options: '<%= hint %>',
        test: {
            options: {
                expr: true,
                globals: {
                    chai: true,
                    describe: true,
                    it: true,
                    before: true,
                    after: true,
                    beforeEach: true,
                    afterEach: true,
                    require: true
                }
            },
            files: {
                src: [
                    '<%= project.path.test %>/{,*/}*.js',
                    '<%= project.path.scripts %>/test/{,*/}*.js',
                    '<%= project.path.scripts %>/{,*/}test/*.js'
                ]
            }
        },
        dev: [
            '<%= project.path.scripts %>/{,*/}*.js',
            '!<%= project.path.scripts %>/vendor/*',
            '!<%= project.path.scripts %>/test/{,*/}*.js',
            '!<%= project.path.scripts %>/{,*/}test/*.js'
        ],
        dist: [
            '<%= project.path.scripts %>/{,*/}*.js',
            '!<%= project.path.scripts %>/vendor/*',
            '!<%= project.path.scripts %>/test/{,*/}*.js',
            '!<%= project.path.scripts %>/{,*/}test/*.js'
        ],
        gruntfile: [
            'Gruntfile.js',
            '<%= project.path.tasks %>/{,*/}*.js',
            '!<%= project.path.tasks %>/{,*/}*.spec.js',
            '<%= project.path.tasksConfig %>/{,*/}*.js'
        ]
    }
};

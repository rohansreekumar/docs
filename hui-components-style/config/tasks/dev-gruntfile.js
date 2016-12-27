'use strict';

// Task configs development

module.exports.tasks = {
    watch: {
        gruntfile: {
            files: [
                'Gruntfile.js',
                '<%= project.path.tasks %>/{,*/}*.js',
                '<%= project.path.tasksConfig %>/{,*/}*.js'
            ],
            tasks: ['newer:jshint:gruntfile']
        }
    }
};

'use strict';

// task config for hui-atomify


module.exports.tasks = {
    'hui-atomify': {
        options: '<%= pkg.atomify %>',
        test: {
            options: {
                debug: true,
                output: '.tmp/js/main.js'
            }
        }
    }
};

'use strict';

// Task configs for optimizing client side assets for release

var path = require('canonical-path');
module.exports.tasks = {
    clean: {
        dev: {
            files: [
                {
                    dot: true,
                    src: [
                        '<%= project.path.temp %>'
                    ]
                }
            ]
        },
        dist: {
            files: [
                {
                    dot: true,
                    src: [
                        '<%= project.path.dist %>/*',
                        '!<%= project.path.dist %>/.git*'
                    ]
                }
            ]
        }
    },

    copy: {

        dev: {
            files: [
                { // assets
                    expand: true,
                    dot: true,
                    cwd: '<%= project.path.assets %>',
                    dest: '<%= project.path.temp %>/public',
                    src: [
                        '{css,js,media,images}/**/*.*',
                        'fonts/{,*/}*.*',
                        '!fonts/{,*/}*.json'
                    ]
                }
            ]
        }
    }
};

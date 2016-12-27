'use strict';

// task config for doc generation

var path = require('canonical-path');

module.exports.tasks = {

    'hui-docs': {
        api: {
            options: {
                dgeniPackage: path.resolve(__dirname, '../..', 'example', 'api.conf.js')
            }
        },
        style: {
            options: {
                dgeniPackage: path.resolve(__dirname, '../..', 'example', 'style.conf.js')
            }
        }
    },

    clean: {
        'hui-docs': {
            files: [
                {
                    dot: true,
                    src: [
                        '<%= project.path.temp %>',
                        '**/debug-dump.txt'
                    ]
                }
            ]
        }
    }
};

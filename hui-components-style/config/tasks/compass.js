'use strict';

// task config for style tasks

module.exports.tasks = {
    watch: {
        compass: {
            files: [
                '<%= project.path.styles %>/scss/{,*/}*.{scss,sass}',
                '<%= project.path.styles %>/scss/homes-ui/{,*/}*.{scss,sass}'
            ],
            tasks: [
                'compass:dev'
            ]
        },
    },
    compass: {
        options: {
            config: '<%= project.path.config %>/config.rb',
            importPath: [
                '<%= project.path.styles %>/scss',
                '<%= project.path.styles %>/scss/homes-ui',
                '<%= project.path.bower %>/foundation/scss'
            ],
        },
        dev: {
            options: {
                outputStyle: 'expanded',
                // sourcemap: false,
                // debugInfo: false,
                // watch: true,
                // quiet: true,
                noLineComments: true,
                // force: true,
            }
        },
        dist: {
            options: {
                outputStyle: 'compressed',
                unixNewlines: true,
                banner: '<%= banner %>', // onluy works with specify
                cssDir: '<%= project.path.dist %>/<%= project.path.public %>/css'
            }
        }
    }
};

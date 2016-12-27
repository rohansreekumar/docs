'use strict';

var mapFromSvg = require('./../app/fonts/mapFromSvg'),
    path = require('canonical-path');

module.exports = function (grunt) {

    grunt.registerMultiTask('hui-fonts', 'Create Sass font map for icon fonts.', function () {
        var xml,
            out,
            options = this.options(),
            src = this.files[0].src[0];

        if (this.files.length > 1 || this.files[0].src.length > 1) {
            grunt.log.warn('More than one source file in target. Only the first file is being used.');
        }
        if (!grunt.file.exists(src)) {
            grunt.fail.warn('Source file: "' + src + '" not found.');
        } else {
            grunt.log.oklns('Source file: "' + src + '".');
        }
        path.resolve(__dirname, src);
        xml = grunt.file.read(src, {encoding: 'UTF-8'});

        out = mapFromSvg.makeSassVars(xml);

        grunt.file.write(this.files[0].dest, out, {encoding: 'UTF-8'});

        grunt.log.oklns('Dest: "' + this.files[0].dest + '.');
    });

};
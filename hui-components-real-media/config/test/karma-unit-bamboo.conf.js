'use strict';

var projectConfig = require('./../../project.json');

module.exports = function (config) {

    var conf = require('hui-grunt-build').karma.unit.bamboo(projectConfig, config);

    config.set(conf);
};

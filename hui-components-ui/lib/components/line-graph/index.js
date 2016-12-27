'use strict';

/**
 * @ngdoc module
 * @name huiLineGraph
 * @module huiLineGraph
 *
 * @description
 * The `huiLineGraph` module
 *
 * Generates a line graph from given data set
 * utilizes d3 and hui-visualization service
 */

require('../d3');
require('../hui-visualization');

// Create Module
var ngModule = angular.module('huiLineGraph', [
    'huiD3',
    'huiVisualization'
]);

// Module components
require('./line-graph--directive')(ngModule);

module.exports = ngModule;

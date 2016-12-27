'use strict';

/**
 * @ngdoc module
 * @name huiDonutChart
 * @module huiDonutChart
 *
 * @description
 * The `huiDonutChart` module
 *
 * Generates a pie chart from given data set
 * utilizes d3 and hui-visualization service
 */

require('../d3');
require('../hui-visualization');

// Create Module
var ngModule = angular.module('huiDonutChart', [
    'huiD3',
    'huiVisualization',
    'lodash'
]);

// Module components
require('./donut-chart--directive')(ngModule);
require('./donut-chart--service')(ngModule);

module.exports = ngModule;

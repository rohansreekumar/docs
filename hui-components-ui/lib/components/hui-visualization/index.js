'use strict';

/**
 * @ngdoc module
 * @name huiVisualization
 * @module huiVisualization
 *
 * @description
 * huiVisualization module provides visulaizationUtil service wwith d3 utilities
 *
 */

require('../d3');
require('hui-components-vendor/lib/lodash');

// Create Module
var ngModule = angular.module('huiVisualization', [
    'huiD3',
    'lodash'
]);

// Module components
require('./visualization-util--service')(ngModule);

module.exports = ngModule;

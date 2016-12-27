'use strict';

/**
 * @ngdoc module
 * @name huiRedraw
 * @module huiRedraw
 *
 * @description
 * huiRedraw module provides redrawing utility
 *
 */
require('./../device');

// Create Module
var ngModule = angular.module('huiRedraw', [
    'huiDevice'
]);

// Module components
require('./redraw-util--service')(ngModule);

module.exports = ngModule;

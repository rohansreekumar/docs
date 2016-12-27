'use strict';

/**
 * @ngdoc module
 * @name huid3
 * @module huid3
 *
 * @description
 * The `huid3` module
 *
 * provide d3.js utilities to app.
 *
 */

// Module dependencies
require('d3/d3');

// Create Module
var ngModule = angular.module('huiD3', []);

// Module components
require('./d3--service')(ngModule);

module.exports = ngModule;

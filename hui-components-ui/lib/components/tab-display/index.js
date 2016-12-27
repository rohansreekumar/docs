'use strict';

/**
 * @ngdoc module
 * @name huiTab
 * @module huiTab
 *
 * @description
 * The `huiTab` module
 *
 */

var ngModule = angular.module('huiTab', [
    'lodash'
]);

// Module components
require('./tab--directive')(ngModule);
require('hui-components-vendor/lib/lodash');


// Module dependencies
require('./templates')(ngModule);

module.exports = ngModule;

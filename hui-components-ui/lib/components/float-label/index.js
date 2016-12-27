'use strict';

/**
 * @ngdoc module
 * @name huiFloatLabel
 * @module huiFloatLabel
 *
 * @description
 * The `huiFloatLabel` module
 *
 * <div doc-module-components="huiFloatLabel"></div>
 *
 */


// Module dependencies
require('./templates');

// Create Module
var ngModule = angular.module('huiFloatLabel', [
    'huiFloatLabelTemplates'
]);

// Module components
require('./float-label--directive')(ngModule);

module.exports = ngModule;

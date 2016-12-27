'use strict';

/**
 * @ngdoc module
 * @name huiFormInputName
 * @module huiFormInputName
 *
 * @description
 * The `huiFormInputName` module
 *
 * <div doc-module-components="huiFormInputName"></div>
 *
 */

// Module dependencies


// Create Module
var ngModule = angular.module('huiFormInputName', []);

// Module components
require('./form-input-name--directive')(ngModule);

module.exports = ngModule;

'use strict';

/**
 * @ngdoc module
 * @name huiFormInputTextarea
 * @module huiFormInputTextarea
 *
 * @description
 * The `huiFormInputTextarea` module
 */

// Module dependencies
require('./templates');
require('hui-components-vendor/lib/lodash');
require('hui-components-vendor/lib/jquery-ng');

// Create Module
var ngModule = angular.module('huiFormInputTextarea', [
    'formInputTextareaTemplates',
    'lodash',
    'jQuery'
]);

// Module components
require('./form-input-textarea--directive')(ngModule);

module.exports = ngModule;

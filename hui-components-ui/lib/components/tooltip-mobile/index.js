'use strict';

/**
 * @ngdoc module
 * @name huiTooltip
 * @module huiTooltip
 *
 * @description
 * The `huiTooltip` module
 *
 */
require('hui-components-vendor/lib/ngDialog');
require('hui-components-vendor/lib/lodash');
require('./../modals');
require('./../bind-html-compile');

var ngModule = angular.module('huiTooltip', [
    'ngDialog',
    'lodash',
    'huiModals',
    'huiBindHtml'
]);

// Module components
require('./hui-tooltip--directive')(ngModule);

// Module dependencies
require('./templates')(ngModule);

module.exports = ngModule;

'use strict';

/**
 * @ngdoc module
 * @name huiShortMessage
 * @module huiShortMessage
 *
 * @description
 * The `huiShortMessage` module
 */

require('./../modals');

// Create Module
var ngModule = angular.module('huiShortMessage', [
    'ngDialog',
    'huiModals'
]);

// Module components
require('./short-message--directive')(ngModule);

// Module dependencies
require('./templates')(ngModule);

module.exports = ngModule;

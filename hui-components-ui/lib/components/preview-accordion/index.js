'use strict';
/**
 * @ngdoc module
 * @name preview-accordion
 * @module preview-accordion
 * @type {module}
 *
 * @description
 * huiPreviewAccordion is a module that builds a generic expandable content box.
 *
 */

// Module dependencies
require('hui-components-vendor/lib/lodash');

// Create Module
var ngModule = angular.module('huiPreviewAccordion', [
    'lodash'
]);

// Set line height calculation variable
ngModule.value('huiPreviewAccordionLineHeight', 20);

// Module components
require('./hui-preview-accordion')(ngModule);
require('./hui-preview-accordion--content')(ngModule);

module.exports = ngModule;

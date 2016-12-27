'use strict';

/**
 * @ngdoc module
 * @name huiLightbox
 * @module huiLightbox
 *
 * @description
 * The `huiLightbox` module
 *
 */
require('hui-components-vendor/lib/ngDialog');
require('hui-components-vendor/lib/lodash');
require('./../modals');
require('./../bind-html-compile');

var ngModule = angular.module('huiLightbox', [
    'ngDialog',
    'lodash',
    'huiModals',
    'huiBindHtml'
]);

// Module components
require('./hui-lightbox--directive')(ngModule);

// Module dependencies
require('./templates')(ngModule);

module.exports = ngModule;

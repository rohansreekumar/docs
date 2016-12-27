'use strict';

/**
 * @ngdoc module
 * @name huiBindHtml
 * @module huiBindHtml
 *
 * @description
 * The `huiBindHtml` module
 *
 */
require('hui-components-vendor/lib/lodash');

var ngModule = angular.module('huiBindHtml', [
    'lodash'
]);

// Module components
require('./bind-html-compile--directive')(ngModule);


module.exports = ngModule;

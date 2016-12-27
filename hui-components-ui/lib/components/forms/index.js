/**
 * @ngdoc module
 * @name huiForms
 * @module huiForms
 * @description
 *
 * The `form` module contains display components for forms.
 *
 * <div doc-module-components="huiForm"></div>
 *
 */

'use strict';

require('hui-components-vendor/lib/lodash');
require('./input-list');

var ngModule = angular.module('huiForms', [
    'huiForms.formInputList'
]);

module.exports = ngModule;

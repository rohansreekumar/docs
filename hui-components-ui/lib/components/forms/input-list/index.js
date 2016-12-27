/**
 * @ngdoc module
 * @name huiForms.formInputList
 * @module huiForms
 * @description
 *
 * Contains the Form Input List directives. Radio List and Check List.
 *
 * <div doc-module-components="huiForm.formInputList"></div>
 *
 */

'use strict';

require('hui-components-vendor/lib/lodash');
require('hui-components-vendor/lib/ui-bootstrap');

var ngModule = angular.module('huiForms.formInputList', [
    'checklist-model',
    'lodash',
    'ui.bootstrap'
]);

require('./input-list--service')(ngModule);
require('./input-list--controller')(ngModule);
require('./input-list--directive')(ngModule);
require('./templates')(ngModule);


module.exports = ngModule;

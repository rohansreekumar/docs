'use strict';

/**
 * @ngdoc module
 * @name huiInputFocusScroll
 * @module huiInputFocusScroll
 *
 * @description
 * The `huiInputFocusScroll` module
 *
 * <div doc-module-components="huiInputFocusScroll"></div>
 *
 */

require('./../device');

var ngModule = angular.module('huiInputFocusScroll', [
    'huiDevice'
]);

require('./scroll-input-into-view--service')(ngModule);
require('./scroll-input-into-view--directive')(ngModule);

module.exports = ngModule;

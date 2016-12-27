'use strict';

/**
 * @ngdoc module
 * @name huiLockScroll
 * @module huiLockScroll
 *
 * @description
 * The `huiLockScroll` module
 *
 */
require('hui-components-vendor/lib/jquery-ng');
var ngModule = angular.module('huiLockScroll', ['jQuery']);

// Module components
require('./lock-scroll--service')(ngModule);

module.exports = ngModule;

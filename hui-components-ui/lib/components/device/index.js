'use strict';

/**
 * @ngdoc module
 * @name huiDevice
 * @module huiDevice
 *
 * @description
 * The `huiDevice` module
 *
 */
require('hui-components-vendor/lib/lodash');
require('hui-components-vendor/lib/moment');

var MobileDetect = require('mobile-detect'),
    ngModule = angular.module('huiDevice', [
    'lodash',
    'moment',
    'ngCookies'
]);

// Module components
require('./ios-anchor-tag--directive')(ngModule);
require('./user-device--service')(ngModule);
require('./is-mobile-cookie--service')(ngModule);
require('./user-device--service')(ngModule, MobileDetect);


module.exports = ngModule;

/**
 * @ngdoc module
 * @name huiBingMap
 * @module huiBingMap
 */

'use strict';
// Module dependencies
require('hui-components-vendor/lib/lodash');

require('./../modals');

// Create Module
var loadLibrary = require('./../util/load-library-async'),
    ngModule = angular.module('huiBingMaps', [
        'lodash',
        'huiModals'
    ]);

// Module components
require('./bing-maps--service')(ngModule);
require('./full-screen-bing-maps--directive')(ngModule);
require('./bing-maps-util--service')(ngModule, loadLibrary);

// Module templates

module.exports = ngModule;

'use strict';

/**
 * @ngdoc module
 * @name oas
 * @module oas
 *
 * @description
 * The `oas` module
 *
 * <div doc-module-components="oas"></div>
 *
 */

// Module dependencies
var loadLibrary = require('./../util/load-library-async'),
    ngModule;
require('hui-components-vendor/lib/jquery-ng');
require('hui-components-vendor/lib/lodash');

// Create Module
ngModule = angular.module('oas', [
    'jQuery',
    'lodash'
]);

// Module components
require('./oas-url--value')(ngModule);
require('./oas-util--service')(ngModule, loadLibrary.Library);
require('./oas--service')(ngModule);
require('./oas-cta--directive')(ngModule);

require('./templates')(ngModule);
module.exports = ngModule;

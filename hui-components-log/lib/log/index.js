/**
 * @ngdoc module
 * @name huiLog
 * @module huiLog
 *
 * @description
 * The `huiLog` module
 *
 * <div doc-module-components="huiLog"></div>
 *
 */

'use strict';

var ngModule, Logger;
// Module dependencies
Logger = require('./../logger');

// Create Module
ngModule = angular.module('huiLog', []);

// Module components
require('./exception-logging--service')(ngModule, Logger);
require('./exception-handler--service')(ngModule);

module.exports = ngModule;

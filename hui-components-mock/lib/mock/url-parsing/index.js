'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesUrlParsing
 * @module huiMockRoutesUrlParsing
 *
 * @description
 * The `huiMockRoutesUrlParsing` module
 *
 * <div doc-module-components="huiMockRoutesUrlParsing"></div>
 *
 */

// Module dependencies


// Create Module
var ngModule = angular.module('huiMockRoutesUrlParsing', ['ngMockE2E']);

// Module components

// Module templates
require('./route')(ngModule);

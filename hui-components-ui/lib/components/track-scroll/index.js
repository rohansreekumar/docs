'use strict';

/**
 * @ngdoc module
 * @name huiTrackScroll
 * @module huiTrackScroll
 *
 * @description
 * The `huiTrackScroll` module
 *
 */

var ngModule = angular.module('huiTrackScroll', []);

require('./track-scroll--service')(ngModule);
require('./nav-display--service')(ngModule);

module.exports = ngModule;

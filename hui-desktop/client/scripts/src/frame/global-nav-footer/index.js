'use strict';

/**
 * @ngdoc module
 * @name globalNavFooter
 * @module globalNavFooter
 *
 * @description
 * The `globalNavFooter` module
 *
 * <div doc-module-components="globalNavFooter"></div>
 *
 */

// Module dependencies


// Create Module
var ngModule = angular.module('app.frame.globalNavFooter', ['hui.details']),
loadLibrary = require('hui-components-content/lib/util/load-library-async');

// Module components
require('./global-nav-footer--directive')(ngModule);
require('./footer-bar-cell--directive')(ngModule);
require('./google-share-button--directive')(ngModule);
require('./google-share--service')(ngModule);
require('./google-share-util--service')(ngModule, loadLibrary);


// Module templates
require('./templates')(ngModule);


module.exports = ngModule;

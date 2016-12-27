'use strict';

/**
 * @ngdoc overview
 * @name huiDfp
 *
 * @description
 * Exposes a service and directive to easily fetch and render double click for publishers ads.
 * Provides configuration options and helper methods to define ad slots.
 *
 * When the directive is rendered on the page, a method exposed by the dfpAd service will load the tag library and
 * being the chain of events that will eventually display the ad.
 */

require('hui-components-vendor/lib/lodash');

var ngModule, loadLibrary;

loadLibrary = require('./../util/load-library-async');


ngModule = angular.module('huiDfp', [
    'lodash'
]);

require('./dfp-cta--settings')(ngModule);
require('./dfp-cta--directive')(ngModule);
require('./dfp-cta--provider')(ngModule);
require('./dfp-cta-network-code--service')(ngModule);
require('./dfp-cta-app-code--service')(ngModule);
require('./dfp-cta-rendered--service')(ngModule);
require('./dfp-cta-util--service')(ngModule, loadLibrary);

module.exports = ngModule;

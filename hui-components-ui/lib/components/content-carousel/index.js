'use strict';

/**
 * @ngdoc module
 * @name contentCarouselUtility
 * @module huiContentCarousel
 *
 * @description
 * The `contentCarouselUtility` module
 *
 * <content-carousel-utility></content-carousel-utility>
 *
 */


// Module dependencies
require('hui-components-vendor/lib/jquery-ng');
require('hui-components-vendor/lib/ui-bootstrap');
require('hui-components-vendor/lib/lodash');

// Create Module
var ngModule = angular.module('huiContentCarousel', [
    'jQuery',
    'ngTouch',
    'ui.bootstrap',
    'lodash'
]);

// Module components
require('./content-carousel--directive')(ngModule);

module.exports = ngModule;

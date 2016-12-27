'use strict';

/**
 * @ngdoc module
 * @name huiPinit
 * @module huiPinit
 *
 * @description
 * The `huiPinit` module
 *
 * <pinit ng-if="gallerySlideImageCtrl.slideShowPinit" pinit-id="gallerySlideImageCtrl.slideImageIndex" pinit-src="gallerySlideImageCtrl.slideImgSrc" pinit-alt="gallerySlideImageCtrl.slideImgAlt"></pinit>
 *
 */


// Module dependencies
require('hui-components-vendor/lib/lodash');
require('./templates');


// Create Module
var ngModule = angular.module('huiPinit', [
    'lodash',
    'huiPinitTemplates'
]);

// Module components
require('./pinit--directive')(ngModule);

module.exports = ngModule;

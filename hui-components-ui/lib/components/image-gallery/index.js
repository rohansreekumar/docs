'use strict';

/**
 * @ngdoc module
 * @name huiImageGallery
 * @module huiImageGallery
 *
 * @description
 * The `huiImageGallery` module
 *
 * <image-gallery></image-gallery>
 *
 */


// Module dependencies
require('./templates');
require('hui-components-vendor/lib/lodash');
require('hui-components-vendor/lib/jquery-ng');
require('./../image-frame');
require('./../pinit');
require('./../modals');

// Create Module
var ngModule = angular.module('huiImageGallery', [
    'huiImageGalleryTemplates',
    'huiImageFrame',
    'lodash',
    'jQuery',
    'ngDialog',
    'huiPinit',
    'huiModals'
]);

// Module components
require('./image-gallery--directive')(ngModule);
require('./photo-counter--directive')(ngModule);
require('./image-gallery-utility--directive')(ngModule);
require('./full-screen-image-gallery--directive')(ngModule);
require('./image-gallery--service')(ngModule);
require('./gallery-slide-image--directive')(ngModule);

require('./thumbnail-slider--directive')(ngModule);
require('./thumbnail-slider--service')(ngModule);

module.exports = ngModule;

'use strict';

/**
 * @ngdoc module
 * @name huiImageFrame
 * @module huiImageFrame
 *
 * @description
 * The `huiImageFrame` module. Stuff to position images inside a box. It seems simple... BUT ITS NOT
 *
 * <image-gallery></image-gallery>
 *
 */


// Module dependencies
// -- none


// Create Module
var ngModule = angular.module('huiImageFrame', [
]);

// Module components
require('./image-frame--directive')(ngModule);

module.exports = ngModule;

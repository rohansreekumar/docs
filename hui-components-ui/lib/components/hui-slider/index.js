'use strict';

/**
 * @ngdoc module
 * @name huiSlider
 * @module huiSlider
 *
 * @description
 * The `huiSlider` module
 *
 */
require('hui-components-vendor/lib/lodash');

var ngModule = angular.module('huiSlider', [
    'lodash'
]);

// Module components
require('./hui-slider--directive')(ngModule);


// Module dependencies
require('./templates')(ngModule);
require('./angular-pure-slider--directive')(ngModule);
require('./angular-pure-slider--service')(ngModule);

module.exports = ngModule;

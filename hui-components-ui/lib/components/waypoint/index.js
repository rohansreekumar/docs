'use strict';

/**
 * @ngdoc module
 * @name huiwaypoint
 * @module huiwaypoint
 *
 * @description
 * The `huiwaypoint` module
 *
 * <waypoint data-ref="viewCtrl.toggleHeader"></waypoint>
 *
 */


// Module dependencies
require('hui-components-vendor/lib/lodash');

var waypoints = require('waypoints/lib/noframework.waypoints'),
// Create Module
    ngModule = angular.module('huiwaypoint', [
        'lodash'
    ]);

// Module components
require('./waypoint--directive')(ngModule);

module.exports = ngModule;

'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesLocation
 * @module huiMockRoutesLocation
 *
 * @description
 * The `huiMockRoutesLocation` module
 *
 * <div doc-module-components="huiMockRoutesLocation"></div>
 *
 */

// Module dependencies
require('hui-components-vendor/lib/lodash');

// Create Module
var ngModule = angular.module('huiMockRoutesLocation', ['ngMockE2E', 'lodash']),
    mockHelpers = require('./../../test/helpers/mock'),
    readGet = mockHelpers.readGet;

// Module components
ngModule.run([
    '$httpBackend',
    '_',
    '$window',
    function ($httpBackend,
              _,
              $window) {

        // geocode
        $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/location\/geocode.*/)
            .respond(function (method,
                               url) {
                var getParams = readGet(url),
                    responseStatus = '',
                    responseData = {};

                if (getParams.location === undefined) {
                    responseStatus = '400';
                    responseData = require('./location-geocode-empty.json');
                } else if (getParams.location.toLowerCase() === 'bad location') {
                    responseStatus = '400';
                    responseData = require('./location-geocode-bad.json');
                } else {
                    responseStatus = '200';
                    responseData = require('./location-geocode.json');
                }

                return [
                    responseStatus,
                    responseData
                ];
            });

        // Reverse Geolocate
        $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/location\/reverse-geocode.*/)
            .respond(function (method,
                               url) {

                var getParams = readGet(url),
                    responseStatus = '',
                    responseData = {};

                if (getParams === undefined || getParams === 'bad location') {
                    responseStatus = '400';
                    responseData = require('./getCityState-bad.json');
                } else {
                    responseStatus = '200';
                    responseData = require('./getCityState-good.json');
                }

                return [
                    responseStatus,
                    responseData
                ];
            });

        // Geocode IP
        $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/location\/geocode-ip.*/)
            .respond(function (method,
                               url) {

                var getParams = readGet(url),
                    responseStatus = '',
                    responseData = {};

                if (getParams.search === undefined || getParams.search === 'bad location') {
                    responseStatus = '400';
                    responseData = require('./geocodeIp-bad.json');
                } else {
                    responseStatus = '200';
                    responseData = require('./geocodeIp-good.json');
                }

                return [
                    responseStatus,
                    responseData
                ];
            });


    }
]);

module.exports = ngModule;

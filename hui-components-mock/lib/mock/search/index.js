'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesSearch
 * @module huiMockRoutesSearch
 *
 * @description
 * The `huiMockRoutesSearch` module
 *
 * <div doc-module-components="huiMockRoutesSearch"></div>
 *
 */

// Module dependencies
require('hui-components-vendor/lib/lodash');

// Create Module
var ngModule = angular.module('huiMockRoutesSearch', ['ngMockE2E']),
    mockHelpers = require('./../../test/helpers/mock'),
    fakeValue = mockHelpers.fakeValue,
    readGet = mockHelpers.readGet;

// Module components

require('./route')(ngModule);

ngModule.run([
    '$httpBackend',
    function ($httpBackend) {

        // Search Location
        $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/search\/location.*/)
            .respond(function (method,
                               url) {

                var getParams = readGet(url),
                    responseStatus = '',
                    responseData = {};

                if (getParams.search === undefined || getParams.search.replace(',', '').toLowerCase() === 'bad location') {
                    responseStatus = '400';
                    responseData = require('./search-location-bad.json');
                } else if (getParams.search.toLowerCase() === 'norfolk') {
                    responseStatus = '200';
                    responseData = require('./searcher-ambiguous.json');
                } else {
                    responseStatus = '200';
                    responseData = require('./searcher.json');
                }

                return [
                    responseStatus,
                    responseData
                ];
            });
    }
]);

module.exports = ngModule;

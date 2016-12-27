/* global
 window,
 document,
 console
 */
// mock
//
//

'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesLegacy
 * @module huiMockRoutesLegacy
 *
 * @description
 * The `huiMockRoutesLegacy` module
 *
 * <div doc-module-components="huiMockRoutesLegacy"></div>
 *
 */


// Module dependencies
require('hui-components-vendor/lib/lodash');

// Create Module
var mockModule = angular.module('huiMockRoutesLegacy', [
        'ngMockE2E',
        'lodash'
    ]),
    mockListings = require('./listings.json'),
    mockRecommended = require('./listings.json'),
    mockSuggestions = require('./suggestions.json'),
    mockHelpers = require('./../../test/helpers/mock'),
    readGet = mockHelpers.readGet;

mockModule
    .run([
        '$httpBackend',
        '_',
        '$window',
        function ($httpBackend,
                  _,
                  $window) {

            // Mock API
            // get listings
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/listings\/id\//)
                .respond(function (method,
                                   url) {
                    var listing, id;
                    id = url.match(/id\/([0-9]+)/)[1];
                    listing = _.where(mockListings.response.docs, {propid: id})[0];

                    return [
                        200,
                        listing
                    ];
                });

            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/listings\/.*\/limit\/([0-9]+)/)
                .respond(function (method,
                                   url) {
                    var limitN = parseInt(url.match(/limit\/([0-9]+)/)[1], 10),
                        responseArr;

                    if (limitN > 0) {
                        responseArr = _.sample(mockListings.response.docs, limitN);
                    } else {
                        responseArr = mockListings.response.docs;
                    }

                    return [
                        200,
                        responseArr
                    ];
                });

            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/listings\//)
                .respond(function (method,
                                   url) {

                    return [
                        200,
                        mockListings.response.docs
                    ];
                });

            // Autosuggest
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v2\/suggest.*/)
                .respond(function (method,
                                   url) {
                    var getParams = readGet(url),
                        responseData = mockSuggestions;

                    if (getParams.input === 'Invalid Search' || getParams.input === 'Not Applicable') {
                        responseData.suggestions = [];
                    }

                    if (getParams.limit) {
                        responseData.suggestions = _.sample(responseData.suggestions, (Math.floor(Math.random() * parseInt(getParams.limit, 10)) + 1));
                    }

                    return [
                        200,
                        responseData
                    ];
                });


            // Get Nearby Locations
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/location\/nearby-locations.*/)
                .respond(function (method,
                                   url) {

                    var getParams = readGet(url),
                        responseStatus = '',
                        responseData = {};

                    if (getParams === undefined || getParams === 'bad location') {
                        responseStatus = '400';
                        responseData = require('./nearbyLocationsResults-bad.json');
                    } else {
                        responseStatus = '200';
                        responseData = require('./nearbyLocationsResults-good.json');
                    }

                    return [
                        responseStatus,
                        responseData
                    ];
                });


        }
    ]);

module.exports = mockModule;

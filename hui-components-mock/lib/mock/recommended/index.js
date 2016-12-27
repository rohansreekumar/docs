'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesRecommended
 * @module huiMockRoutesRecommended
 *
 * @description
 * The `huiMockRoutesRecommended` module
 *
 * <div doc-module-components="huiMockRoutesRecommended"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiMockRoutesRecommended', ['ngMockE2E']),
    mockHelpers = require('./../../test/helpers/mock'),
    _ = require('lodash'),
    readGet = mockHelpers.readGet;
// Module components
//
ngModule
    .run([
        '$httpBackend',
        function (
            $httpBackend
        ) {
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/recommended.*/)
                .respond(function (
                    method,
                    url
                ) {

                    var getParams = readGet(url),
                        limitN,
                        listings = require('./../udp-url-parsing/listings/results-listings.json').listing_results,
                        responseData = {
                            results: []
                        };
                    limitN = getParams.limit;
                    responseData.newSearch = getParams.newSearch;
                    responseData.location = (getParams.search_query) ? getParams.search_query.value || 'Puppies, USA' : 'Puppies, USA';

                    if (limitN > 0) {
                        responseData.results = _.sample(listings, 4);
                    } else {
                        responseData.results = listings;
                    }

                    responseData.results.forEach(function (result) {
                        result.price_delta = Math.floor(Math.random() * 33456) - 22342;
                    });

                    return [
                        200,
                        responseData
                    ];
                });
        }
    ]);

module.exports = ngModule;

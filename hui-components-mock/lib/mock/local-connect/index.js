'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesLocalConnect
 * @module huiMockRoutesLocalConnect
 *
 * @description
 * The `huiMockRoutesLocalConnect` module
 *
 * <div doc-module-components="huiMockRoutesLocalConnect"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiMockRoutesLocalConnect', ['ngMockE2E']),
    localConnect = require('./local-connect-good'),
    mockHelpers = require('./../../test/helpers/mock'),
    readGet = mockHelpers.readGet;

// Module components
ngModule
    .run([
        '$httpBackend',
        function ($httpBackend) {

            // Mock API
            // Local Connect
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v2\/ad\/view\/location\/*/)
                .respond(function (method,
                                   url) {
                    var getParams = readGet(url),
                        responseStatus = '',
                        responseData = {},
                        localConnectResults;
                    localConnectResults = require('./local-connect-good.json');

                    if (getParams === undefined) {
                        responseStatus = '400';
                        responseData = require('./local-connect-bad.json');
                    } else {
                        responseStatus = '200';
                        // impression url does not match providers given. for obvious reasons
                        localConnectResults.impression_url.replace(/(property_id=)([0-9]+)/, '$1' + getParams.listing_id || getParams.property_id);
                        responseData = {
                            success: true,
                            result: localConnectResults
                        };
                    }

                    return [
                        responseStatus,
                        responseData
                    ];
                });
        }
    ]);

module.exports = ngModule;

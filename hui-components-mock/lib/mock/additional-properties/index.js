'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesAdditionalProperties
 * @module huiMockRoutesAdditionalProperties
 *
 * @description
 * The `huiMockRoutesAdditionalProperties` module
 *
 * <div doc-module-components="huiMockRoutesAdditionalProperties"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiMockRoutesAdditionalProperties', ['ngMockE2E']),
    mockHelpers = require('./../../test/helpers/mock'),
    readGet = mockHelpers.readGet;

// Module components
ngModule
    .run([
        '$httpBackend',
        '_',
        function ($httpBackend, _) {

            // Mock API
            // Local Connect
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v2\/additional_properties\/*/)
                .respond(function (method,
                                   url) {
                    var getParams = readGet(url),
                        responseStatus = '',
                        additionalPropertyResults = require('./additional-properties-good.json'),
                        randomAdditionalProperties = Math.floor(Math.random() * additionalPropertyResults.result.length),
                        responseData = {};

                    if (getParams === undefined) {
                        responseStatus = '400';
                        responseData = require('./additional-properties-bad.json');
                    } else {
                        responseStatus = '200';
                        // impression url does not match providers given. for obvious reasons
                        if (randomAdditionalProperties > 0) {
                            responseData.result  = _.sample(additionalPropertyResults.result, randomAdditionalProperties);
                        } else {
                            responseData.result = [];
                        }
                    }

                    return [
                        responseStatus,
                        responseData
                    ];
                });
        }
    ]);

module.exports = ngModule;

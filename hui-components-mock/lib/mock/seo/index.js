'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesSeo
 * @module huiMockRoutesSeo
 *
 * @description
 * The `huiMockRoutesSeo` module
 *
 * <div doc-module-components="huiMockRoutesSeo"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiMockRoutesSeo', ['ngMockE2E', 'lodash']),
    readGet = require('./../../test/tool').readGet,
    compileMustache = require('./../../test/tool').compileMustache,
    _ = require('lodash'),
    parseSeo = require('./parsing');

// Module components
ngModule.run([
    '$httpBackend',
    function ($httpBackend) {

        $httpBackend
            .whenGET(/\/\/heliosapi.*\.homes\.com\/v2\/seo.*/)
            .respond(function (method,
                               url) {

                var getParams = readGet(url),
                    responseStatus = '200';

                return [
                    responseStatus,
                    {
                        success: true,
                        result: parseSeo(getParams)
                    }
                ];
            });
    }
]);

module.exports = ngModule;

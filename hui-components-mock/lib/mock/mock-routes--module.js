'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutes
 * @module huiMockRoutes
 *
 * @description
 * The `huiMockRoutes` module
 *
 * <div doc-module-components="huiMockRoutes"></div>
 *
 */

// Module dependencies
require('hui-components-vendor/lib/lodash');
require('./url-parsing');
require('./search');
require('./legacy');
require('./seo');
require('./location');
require('./local-connect');
require('./leads');
require('./mortgage');
require('./additional-properties');
require('./recommended');


module.exports = function (activeRouteModules) {
    // Create Module

    activeRouteModules.push('ngMockE2E');

    var ngModule = angular.module('huiMockRoutes', activeRouteModules);

    ngModule.run([
        '$httpBackend',
        function ($httpBackend) {
            //$httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/.*/)
            //    .respond(function (method,
            //                       url) {
            //        return [
            //            404,
            //            null
            //        ];
            //    });

            $httpBackend.whenGET(/.*/).passThrough();
        }
    ]);

};

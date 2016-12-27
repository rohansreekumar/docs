/* global
 console
 */

'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesLeads
 * @module huiMockRoutesLeads
 *
 * @description
 * The `huiMockRoutesLeads` module
 *
 * <div doc-module-components="huiMockRoutesLeads"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiMockRoutesLeads', ['ngMockE2E']),
    _ = require('lodash');

// Module components
ngModule
    .run([
        '$httpBackend',
        function ($httpBackend) {
            // Lead Router
            $httpBackend.whenPOST(/\/\/heliosapi.*\.homes\.com\/v1\/lead\/.*/)
                .respond(function (method,
                                   url,
                                   data) {

                    var responseStatus,
                        responseData,
                        leadId;


                    if (data) {
                        // lead valid
                        console.log('lead received:');
                        console.log(JSON.parse(data));

                        leadId = _.uniqueId();
                        responseStatus = 200;
                        responseData = {
                            status: true,
                            tracking_id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.substr(0, 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length - leadId.length) + leadId
                        };
                    } else {
                        // lead empty
                        responseStatus = 400;
                        responseData = {
                            error: 'Lead Error',
                            status_code: responseStatus,
                            message: 'Error with lead',
                            validation: {}
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

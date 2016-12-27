// Mock data module

'use strict';

require('hui-components-vendor/lib/lodash');
require('hui-components-vendor/lib/angular-mocks');

// Response delay in milleseconds
var activateDelayModule = require('./mock-delay--module'),

// Configure active routes
    activateRoutesModule = require('./mock-routes--module');


module.exports = function huiActivateMockBackend (environment, delay, routes) {
    if (delay) {
        activateDelayModule(delay);
    }

    activateRoutesModule(routes);

    var ngModule = angular.module('appDev', [
        'app',
        'lodash',
        'ngMockE2E',
        'huiMockDelay',
        'huiMockRoutes'
    ]);
};

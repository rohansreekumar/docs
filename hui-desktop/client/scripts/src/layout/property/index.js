'use strict';

/**
 * @ngdoc module
 * @name layout.property
 * @module layout.property
 *
 * @description
 * The `layout.property` module
 *
 * <div doc-module-components="layout.property"></div>
 *
 */

// Module dependencies

require('hui-components-content/lib/tracking');
require('hui-components-content/lib/listings-new');
require('hui-components-content/lib/details-new');
require('./../../router');
require('hui-components-content/lib/search');
require('hui-components-content/lib/tracking');
require('./../../frame');
require('hui-components-content/lib/details');
require('hui-components-content/lib/router');
require('hui-components-content/lib/helios');
require('hui-components-content/lib/talk-now');
require('hui-components-content/lib/details-flyouts');
require('hui-components-content/lib/save-search-flyout');
require('hui-components-real-media/lib/oas');

// Create Module
var ngModule = angular.module('layout.property', [
    'ngAnimate',
    'hui.tracking',
    'huiListings',
    'app.router',
    'huiSearch',
    'ui.router',
    'ngSanitize',
    'huiDetails',
    'hui.details',
    'app.frame',
    'huiRouter',
    'huiHelios',
    'huiTalkNow',
    'huiDetailsFlyouts',
    'saveSearchFlyout',
    'oas'
]);

// Module components

// Module templates
// require('./templates')(ngModule);

// Module components
require('./details--directive')(ngModule);
require('./srp--directive')(ngModule);

ngModule.config([
    'inactiveListingProvider',
    function (inactiveListingProvider) {
        // set inactive listing notice to stay open/not automatically close
        inactiveListingProvider.setDefaults({timeout: 0});
    }
]);

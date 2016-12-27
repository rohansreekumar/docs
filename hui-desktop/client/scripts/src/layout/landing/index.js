'use strict';

/**
 * @ngdoc module
 * @name layout.landing
 * @module layout.landing
 *
 * @description
 * The `layout.landing` module
 *
 * <div doc-module-components="layout.landing"></div>
 *
 */

// Module dependencies

require('hui-components-content/lib/tracking');
require('hui-components-content/lib/listings-new');
require('hui-components-content/lib/veteran-lightbox');
require('./../../router');
require('hui-components-content/lib/search');
require('./../../frame');
require('hui-components-content/lib/helios');
require('hui-components-ui/lib/components/track-scroll');
require('hui-components-content/lib/local-pros');
require('hui-components-content/lib/view-all');

// Create Module
var ngModule = angular.module('layout.landing', [
    'ngAnimate',
    'hui.tracking',
    'huiListings',
    'huiVeteranLightbox',
    'app.router',
    'huiSearch',
    'ngSanitize',
    'app.frame',
    'huiTrackScroll',
    'huiHelios',
    'huiLocalPros',
    'huiViewAll'
]);

// Module components
require('./home-page--directive')(ngModule);
require('./home-page-footer--directive')(ngModule);
require('./landing--directive')(ngModule);
require('./search-header--directive')(ngModule);
require('./homepage-hero-backgrounds--service')(ngModule);

ngModule.config([
    'inactiveListingProvider',
    function (inactiveListingProvider) {
        // set inactive listing notice to stay open/not automatically close
        inactiveListingProvider.setDefaults({timeout: 0});
    }
]);

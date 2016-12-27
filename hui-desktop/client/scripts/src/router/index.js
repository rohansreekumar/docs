'use strict';

/**
 * @name app.router
 * @module app.router
 *
 * @description
 * The routes for the hui-mobile app.
 *
 */
require('hui-components-content/lib/router');
require('hui-components-content/lib/tracking');

var ngModule = angular.module('app.router', [
    'ui.router',
    'huiRouter',
    'hui.tracking',
    'LocalStorageModule'
]);

// view controller
require('./view--controller')(ngModule);

// routes
require('./routes')(ngModule);

// All of the routing logic is belong to API
ngModule.run([
    '$rootScope',
    '$location',
    'pageProperties',
    'pagePropsRouter',
    '$window',
    'userDevice',
    '$cookies',
    function (
        $rootScope,
        $location,
        pageProperties,
        pagePropsRouter,
        $window,
        userDevice,
        $cookies
    ) {
        /**
         * Check PageProps when the location changes and route app.
         * If it's not a change initiatied by the app, check the url to update pageProperties first.
         */
        $rootScope.$on('$locationChangeStart', function () {

            // TEMPORARY TILL ALL ON NEW STACK
            if (pagePropsRouter.fakePage.atFake) {

                pagePropsRouter.fakePage.atFake = false;
                $window.location.replace(pagePropsRouter.fakePage.realUrl);
                return;
            }
            //if the location last changed because we updated page props we don't need to check page props again
            if (pageProperties.$current.page.noAtlas || pagePropsRouter.noParse) {
                // stop redirecting
                pageProperties.$current.page.noAtlas = false;

                pagePropsRouter.noParse = false;

                // go to the corrrect state
                pagePropsRouter.route(pageProperties.$current);

            } else if (userDevice.get().isMobile && $cookies.get('IS_MOBILE') === 'true') {

                $window.location.href = 'http://m.homes.com' + $location.url();
            } else {
                // check API url parser
                pageProperties
                    .checkPage($location.url())
                    .then(pagePropsRouter.route, pagePropsRouter.route);
            }

        });
    }
]);

module.exports = ngModule;

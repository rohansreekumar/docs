/* global
 window,
 document
 */
// client/js/app.js
'use strict';

var ngModule = angular.module('app', [
    'huiApp',
    'ngCookies', // keep
    'ngAnimate', // keep
    'ra.newrelic', // keep - NewRelic integration
    'huiHttp', // keep - http param serializer
    'huiModals', // keep
    'hdc.ui',
    'LocalStorageModule',
    'lodash',
    'hui.seo',
    'hui.tracking',
    'app.router',
    'app.frame',
    'app.search',
    'hui.MyHomes',
    'layout.property',
    'layout.landing',
    'huiDevice'
]);

ngModule.value('huiPreviewAccordionLineHeight', 20); // hui-components-ui

// myhomes mock
ngModule.config([
    'UserProvider',
    function (UserProvider) {

        UserProvider.setLoggedIn(false);
    }
]);

ngModule.config([
    'huiHttpHeliosInterceptorProvider',
    'localStorageServiceProvider',
    'userDeviceProvider',
    'appConfigProvider',
    'dfpAppCodeProvider',
    function (
        huiHttpHeliosInterceptorProvider,
        localStorageServiceProvider,
        userDeviceProvider,
        appConfigProvider,
        dfpAppCodeProvider
    ) {
        // local storage config
        localStorageServiceProvider
            .setPrefix('hui')
            .setNotify(true, true);

        // helios settings
        huiHttpHeliosInterceptorProvider.setDefaults({
            standard_query: appConfigProvider.app.standard_query
        });

        dfpAppCodeProvider.setDefaults({
            appCode: 'Homes_Desktop'
        });

        // user device, ie iPhone vs Android, etc.
        userDeviceProvider.setUserAgent(window.navigator.userAgent);
    }
]);

// Attach variables to $rootScope.
ngModule.run([
    '$location',
    '$window',
    '$document',
    '$rootScope',
    '$log',
    '_',
    'User',
    'PageMeta',
    'pageProperties',
    'adobeAnalytics',
    'modalWatcher',
    function (
        $location,
        $window,
        $document,
        $rootScope,
        $log,
        _,
        User,
        PageMeta,
        pageProperties,
        adobeAnalytics,
        modalWatcher
    ) {

        _.assign($rootScope, {
            $location: $location,
            pageMeta: PageMeta,
            pageProps: pageProperties,
            user: User.get(),
            debug: $window.debug
        });

        modalWatcher.setWatchers({ isDesktop: true });

        // update page targeting when page properties updates
        pageProperties.onUpdate(this, adobeAnalytics.page);

        // log page properties from url parser if we are in debug mode
        if ($window.debug) {
            pageProperties.onUpdate(this, function () {
                $log.log(pageProperties.$current);
            });
        }
    }
]);

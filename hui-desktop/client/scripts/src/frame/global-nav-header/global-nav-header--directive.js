'use strict';

exports = module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name app.frame.globalNav.directive:globalNavHeader
     * @scope
     * @restrict E
     *
     * @description
     * Display global nav.
     */
    ngModule.directive('globalNavHeader', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                templateUrl: '/templates/frame/global-nav--header.html',
                controller: 'globalNavController',
                controllerAs: 'globalNavCtrl'
            };
        }
    ]);

    /**
     * @ngdoc controller
     * @name app.frame.globalNav.controller:globalNavController
     *
     * @requires pagePropsRouter
     * @requires globalNavService
     * @requires _
     *
     * @description
     * Gets globalNav items.
     */
    ngModule.controller('globalNavController', [
        'pagePropsRouter',
        'globalNavService',
        '_',
        function (
            pagePropsRouter,
            globalNavService,
            _
        ) {
            var self = this;

            globalNavService.globalNav()
                .then(function(response) {
                    self.navLinks = _.get(response, 'navLinks');
                });

            /**
             * @ngdoc method
             * @name goToLegacy
             * @methodOf app.frame.globalNav.globalNavController
             * @description
             * runs the goToLegacy function.
             *
             * @param {string} url the url for the link
             */
            self.goToLegacy = function (url) {

                pagePropsRouter.goToLegacy(null, url);
            };
        }
    ]);
};

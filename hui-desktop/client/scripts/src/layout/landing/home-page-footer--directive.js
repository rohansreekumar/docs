'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name homePageFooter
     * @module layout.landing
     * @restrict E
     *
     * @description
     * Footer for home page
     *
     * @example
     * <home-page-footer />
     */
    ngModule
        .directive('homePageFooter', function () {
            return {
                restrict: 'E',
                replace: true,
                bindToController: true,
                scope: {},
                templateUrl: '/templates/layout/home-page-footer--directive.html',
                controllerAs: 'homePageFooterCtrl',
                controller: 'homePageFooterController'
            };
        })

     /**
     * @ngdoc controller
     * @name homePageFooterController
     * @module layout.landing
     *
     * @requires $scope
     * @requires $sce
     *
     * @description
     *
     *
     */
        .controller('homePageFooterController', [
            '$scope',
            '$sce',
            function (
                $scope,
                $sce
            ) {
                var self = this;

                /**
                 * @ngdoc method
                 * @name trustedHTML
                 *
                 * @require $sce
                 *
                 * @description
                 * Passes cms blocks through $sce service to pass as trusted HTML and not have content removed.
                 */
                self.trustedHTML = function (content) {
                    return $sce.trustAsHtml(content);
                };
            }
        ]);
};

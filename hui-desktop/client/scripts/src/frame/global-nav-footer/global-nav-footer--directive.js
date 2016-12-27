'use strict';


module.exports = function(ngModule) {

    /**
     * @ngdoc directive
     * @name globalNavFooter
     * @module globalNavFooter
     * @restrict E
     *
     * @description
     * Global Nav Footer for desktop experience
     *
     * @example
     * '<global-nav-footer></global-nav-footer>'
     */
    ngModule
        .directive('globalNavFooter', function () {
            return {
                restrict: 'E',
                replace: true,
                bindToController: true,
                scope: {},
                templateUrl: '/templates/globalNavFooter/global-nav-footer--directive.html',
                controllerAs: 'globalNavFooterCtrl',
                controller: 'globalNavFooterController'
            };
        })

     /**
     * @ngdoc controller
     * @name globalNavFooterController
     * @module globalNavFooter
     *
     * @requires $scope
     * @requires $sce
     *
     * @description
     *
     *
     */
        .controller('globalNavFooterController', [
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

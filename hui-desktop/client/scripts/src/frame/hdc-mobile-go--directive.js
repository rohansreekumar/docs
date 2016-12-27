'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     *
     * @name  hdcMobileGo
     * @module  hui
     *
     *
     * @restrict C
     *
     *
     * @description
     *
     * takes one to m.homes.com
     *
     */
    ngModule.directive('hdcMobileGo', [
        '$window',
        '$cookies',
        '$location',
        function (
            $window,
            $cookies,
            $location
        ) {

            var directive = {
                restrict: 'C',
                scope: {}
            };

            directive.link = function (
                $scope,
                element
            ) {

                element.click(function () {

                    $cookies.is_mobile = true;

                    $window.location = 'http://www.homes.com' + $location.url();

                });

            };

            return directive;
        }
    ]);

};

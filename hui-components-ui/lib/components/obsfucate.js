'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     *
     * @name  deob
     * @module  hui
     *
     *
     * @restrict A
     * @param {string} deob             The obsfucated target location
     * @param {boolean=!} external  Is the target location outside of homes.com or m.homes.com?
     *
     *
     * @description
     * Deobsfucate a false link
     *
     * @example
     * <span class="a" data-deob="mdothomesdotcom index.cfm?action=About#homesPrivacy" data-external="true">Privacy Policy</span>
     */
    ngModule.directive('deob', [
        '$window',
        '$location',
        '$rootScope',
        function ($window, $location, $rootScope) {

            var directive = {
                restrict: 'A',
                scope: {
                    deob: '@',
                    external: '=',
                    target: '@'
                }
            };

            directive.link = function ($scope, element) {
                var originalUrl = $scope.deob,
                    newUrl = $scope.deob.replace(/ /g, '/').replace(/dot/g, '.').trim();

                if ($scope.external) {
                    newUrl = $window.location.protocol + '//' + newUrl;
                }

                element.on('click', function () {

                    if ($scope.target) {
                        $window.open(newUrl, $scope.target);
                    } else if ($scope.external || newUrl.indexOf('http://') !== -1) {
                        $window.location = newUrl;
                    } else {
                        $rootScope.$apply(function () {
                            $location.url(newUrl);
                        });
                    }
                });

            };

            return directive;
        }
    ]);


};

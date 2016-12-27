'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name searchHeader
     * @module layout.landing
     * @restrict E
     *
     * @description
     * Adhesive Header with Search Form on Landing Pages
     *
     * @example
     * <search-header></search-header>
     */
    ngModule
        .directive('searchHeader', function () {
            return {
                restrict: 'E',
                replace: true,
                bindToController: true,
                scope: {},
                templateUrl: '/templates/layout/search-header--directive.html',
                controllerAs: 'searchHeaderCtrl',
                controller: 'searchHeaderController'
            };
        })

     /**
     * @ngdoc controller
     * @name searchHeaderController
     * @module layout.landing
     * @requires $scope
     *
     * @description
     *
     *
     */
        .controller('searchHeaderController', [
            '$scope',
            function ($scope) {

                var self = this;

            }
        ]);
};

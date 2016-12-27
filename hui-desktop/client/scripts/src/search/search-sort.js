// home controller

'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name app.search.directive:searchSort
     *
     * @restrict A
     * @description
     * displays search sort options.
     *
     */
    ngModule.directive('searchSort', [
        function () {
            var directive = {
                restrict: 'A',
                scope: true,
                templateUrl: '/templates/search/search-sort.html'
            };

            return directive;
        }
    ]);
};

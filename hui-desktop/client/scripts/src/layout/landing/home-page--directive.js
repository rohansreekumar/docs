// home controller

'use strict';

module.exports = function (ngModule) {
    ngModule.controller('homePageController', [
        '$scope',
        '_',
        'searchCurrent',
        'navDisplay',
        '$window',
        '$timeout',
        'homepageHeroBackgrounds',
        '$sce',
        function (
            $scope,
            _,
            searchCurrent,
            navDisplay,
            $window,
            $timeout,
            homepageHeroBackgrounds,
            $sce
        ) {

            var self = this,
                pageProps = $scope.$root.pageProps.$current,
                propertyDirectory = pageProps.property_directory,
                newSearch;

            if (!_.isUndefined(propertyDirectory)) {

                //reset current search
                if (propertyDirectory.listing_status || propertyDirectory.property_type) {

                    newSearch = {
                        context: 'property',
                        listing_status: propertyDirectory.listing_status,
                        property_type: (propertyDirectory.property_type) ? [propertyDirectory.property_type] : propertyDirectory.property_type
                    };

                    searchCurrent.set(_.omit(newSearch, _.isUndefined));
                }

            }

            /**
             * @ngdoc method
             * @name adjustStickyHeader
             * @require direction
             *
             * @description
             * Search header shows and hides when scrolling past the waypoint.
             */
            self.adjustStickyHeader = function (direction) {
                if (direction === 'down') {
                    navDisplay.down();
                } else {
                    navDisplay.up();
                }
            };

            angular.element($window).bind('scroll', function () {
                navDisplay.scrollAction();
            });

            /**
            * @ngdoc method
            * @name nextBackground
            *
            * @require $timeout
            *
            * @description
            * Randomly replace the background image of the main search section.
            */
            self.heroBackground = {
                'background-image': 'url(/images/' + homepageHeroBackgrounds.newBackground() + ')'
            };

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

    ngModule.directive('pageHomePage', [
        function () {

            return {
                restrict: 'E',
                controller: 'homePageController',
                controllerAs: 'pageCtrl',
                replace: true,
                templateUrl: '/templates/layout/home.html'
            };
        }
    ]);
};

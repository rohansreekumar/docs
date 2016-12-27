// home controller

'use strict';

module.exports = function (ngModule) {
    /**
     * @ngdoc controller
     * @name pagePropertyLandingCtrl
     * @module layout.landing
     *
     * @requires $scope,
     * @requires _,
     * @requires searchCurrent,
     * @requires inactiveListing,
     * @requires hesiod,
     * @requires homepageHeroBackgrounds,
     * @requires $timeout,
     * @requires $sce,
     * @requires viewAll
     * @requires $window
     * @requires navDisplay
     *
     * @description
     * Layout for the Landing Pages
     */
    ngModule.controller('pagePropertyLandingCtrl', [
        '$scope',
        '_',
        'searchCurrent',
        'inactiveListing',
        'hesiod',
        'homepageHeroBackgrounds',
        '$timeout',
        '$sce',
        'viewAll',
        '$window',
        'navDisplay',
        function (
            $scope,
            _,
            searchCurrent,
            inactiveListing,
            hesiod,
            homepageHeroBackgrounds,
            $timeout,
            $sce,
            viewAll,
            $window,
            navDisplay
        ) {

            var self = this,
                pageProps = $scope.$root.pageProps.$current,
                propertyDirectory = pageProps.property_directory,
                newSearch,
                $searchHeader = angular.element('.search-header');

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
             * @name cityCounty
             *
             * @description
             * Splits arrays into arrays of arrays by chucks of 5
             */
            self.cityCounty = function () {
                self.splitListCity = _.chunk(self.directory_results.city, 5);
                self.splitListCounty = _.chunk(self.directory_results.county, 5);
            };

            // dev
            if (pageProps.page.type === 'propertyState') {
                hesiod.checkAndRetry(pageProps.directory_results)
                    .then(function (response) {
                        self.directory_results = _.get(response, 'result.directory_results');
                        self.region = _.get(response, 'result.location.region.value');
                        self.cities = _.get(self.directory_results, 'cities');
                        self.counties = _.get(self.directory_results, 'counties');

                        self.cityCounty();
                        self.getViewAll();
                    });

            }


            // check if we got here because of an inactive listing.
            inactiveListing.showInactive();

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
             * @name trustedHTML
             *
             * @requires $sce
             * @param content html content
             *
             * @description
             * Passes cms blocks through $sce service to pass as trusted HTML and not have content removed.
             */
            self.trustedHTML = function (content) {
                return $sce.trustAsHtml(content);
            };


            /**
             * @ngdoc method
             * @name getViewAll
             *
             * @description
             * Sets path and gets all the cities and counties for view all lightbox.
             */
            self.getViewAll = function () {
                var options = {
                    region: self.region,
                    type: 'city'
                };

                viewAll.setPath({
                    city: self.directory_results.all_cities,
                    county: self.directory_results.all_counties
                });

                viewAll.get(options)
                    .then(function (response) {
                        self.allCities = response;
                    });

                options.type = 'county';

                viewAll.get(options)
                    .then(function (response) {
                        self.allCounties = response;
                    });
            };
        }
    ]);

    ngModule.directive('pagePropertyLanding', [
        function () {

            return {
                restrict: 'E',
                controller: 'pagePropertyLandingCtrl',
                controllerAs: 'pageCtrl',
                replace: true,
                templateUrl: '/templates/layout/landing.html'
            };
        }
    ]);
};

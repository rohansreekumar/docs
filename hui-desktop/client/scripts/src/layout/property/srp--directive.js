'use strict';


// Property Search Results Layout

module.exports = function (ngModule) {

    /**
     * @ngdoc controller
     * @name layout.property.controller:PropertyResultsController
     *
     * @requires $scope
     * @requires _
     * @requires hesiod
     * @requires pageProperties
     * @requires $window
     * @requires $document
     * @requires pagination
     * @requires $q
     * @requires $log
     * @requires searchCurrent
     * @requires huiTalkNow.factory:talkNowFactory
     * @requires $location
     * @requires inactiveListing
     * @requires searchResultsHistory
     *
     * @description
     * Retrieves the property results and sets it.
     */
    ngModule.controller('PropertyResultsController', [
        '$scope',
        '_',
        'hesiod',
        'pageProperties',
        '$window',
        '$document',
        'pagination',
        '$q',
        '$log',
        'searchCurrent',
        'talkNowFactory',
        '$location',
        'inactiveListing',
        'searchResultsHistory',
        function (
            $scope,
            _,
            hesiod,
            pageProperties,
            $window,
            $document,
            pagination,
            $q,
            $log,
            searchCurrent,
            talkNowFactory,
            $location,
            inactiveListing,
            searchResultsHistory
        ) {

            var self = this;

            self.property = pageProperties;
            self.isProduction = talkNowFactory.isProduction();
            self.oas = _.get(pageProperties, '$current.oas', '');
            self.dfpListingStatus = _.camelCase(_.get(pageProperties, '$current.search.listing_status'));
            self.dfpListingType = _.includes(_.get(pageProperties, '$current.search.listing_type'), 'FORECLOSURE');

            talkNowFactory.checkAgentAvailability(self.property.$current.curbcall)
                .then(function (response) {
                    self.hasTalkNow = response;
                });

            // Prepop the form
            searchCurrent.set(_.omit(pageProperties.$current.search, _.isUndefined));

            // load results
            hesiod.checkAndRetry(pageProperties.$current.property_results)
                .then(function (response) {
                    if ($window.debug) {
                        $log.log('Search Results', response);
                    }
                    $scope.property_results = response.result;
                }, function (err) {
                    $scope.property_results = {};
                    err.message = 'Could not retrieve Results';
                    throw new HuiApiError(err, 'module:' + ngModule.name, 'controller:PropertyResultsController');
                });

            hesiod.checkAndRetry(pageProperties.$current.meta)
                .then(function (response) {
                    if ($window.debug) {
                        $log.log('Meta Information', response);
                    }
                    $scope.meta = response.result;
                }, function (err) {
                    $scope.meta = {};
                    err.message = 'Could not retrieve Meta Information';
                    throw new HuiApiError(err, 'module:' + ngModule.name, 'controller:PropertyResultsController');
                });

            if (pageProperties.$current.thin_content) {
                $scope.thinContent = true;
            }

            if (pageProperties.$current.search) {
                self.search = pageProperties.$current.search;
            }

            this.nearbyLocations = _.get(pageProperties, '$current.nearby_locations.result');

            // check if we got here because of an inactive listing.
            inactiveListing.showInactive();

            // set current uri
            searchResultsHistory.setHistory({
                uri: $location.url()
            });
        }
    ]);

    /**
    * @ngdoc directive
    * @name layout.property.directive:pagePropertyResults
    * @restrict E
    *
    * @description
    * Directive for the property results page
    */
    ngModule.directive('pagePropertyResults', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                controller: 'PropertyResultsController',
                controllerAs: 'pageCtrl',
                templateUrl: '/templates/layout/results.html'
            };
        }
    ]);
};

'use strict';

/**
 * @ngdoc provider
 * @name pagePropertiesProvider
 * @module huiRouter
 *
 * @description
 * pageProperties service provider
 *
 */

/**
 * @ngdoc service
 * @name pageProperties
 * @module huiRouter
 *
 * @description
 * Page properties are used to determine what view to show and to quickly populate the data necessary on page load.
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('globalNavService', function () {

        var _this = this;

        _this.defaults = {
            urlApiPath: '/v1/atlas/experience'
        };

        /**
         * @ngdoc method
         * @name pagePropertiesProvider#setDefaults
         * @description
         *
         * Set defaults for pageProperties
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/

        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            '$http',
            '$q',
            '$location',
            '_',
            'heliosApi',
            'pageProperties',
            'searchPrevious',
            '$cookies',
            function (
                $http,
                $q,
                $location,
                _,
                heliosApi,
                pageProperties,
                searchPrevious,
                $cookies
            ) {
                var self = this,
                    publicMethods = {},
                    privateMethods = {},
                    location,
                    previousSearch,
                    currentSearch;

                privateMethods.getCurrentSearch = function () {
                    if ($cookies.get('CURRENTSEARCHLOCATION')) {
                        currentSearch = _.object(['state', 'city'], $cookies.get('CURRENTSEARCHLOCATION').split('|'));
                        previousSearch = {
                            location: {
                                locality: currentSearch.city,
                                region: currentSearch.state
                            }
                        };
                        return previousSearch;
                    } else {
                        return false;
                    }
                };

                publicMethods.globalNav = function (params) {
                    var navApi,
                        localityParams,
                        page = _.get(pageProperties, '$current.page'),
                        siteSection = page.site_section || 'homePage';

                    if (privateMethods.getCurrentSearch()) {
                        navApi = heliosApi + '/v2/global-navigation/' + siteSection + '/locality';
                        localityParams = privateMethods.getCurrentSearch();

                        return $http.get(navApi, {params:localityParams})
                            .then(function (response) {
                                return response.data;
                            }, function (err) {
                                new HuiError(err, '');
                                return err;
                            }
                        );
                    } else {
                        navApi = heliosApi + '/v2/global-navigation/' + siteSection + '/' + page.site_location_level || 'national';

                        return $http.get(navApi)
                            .then(function (response) {
                                return response.data;
                            }, function (err) {
                                new HuiError(err, '');
                                return err;
                            }
                        );
                    }
                };

                return angular.extend(self, publicMethods, privateMethods);
            }
        ];

    });

};

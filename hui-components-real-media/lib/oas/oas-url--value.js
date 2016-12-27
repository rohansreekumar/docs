'use strict';

/**
 * @ngdoc provider
 * @name oasUrlProvider
 * @module oas
 *
 * @description
 * oasUrl value provider
 *
 */
module.exports = function (ngModule) {

    ngModule.provider('oasUrl', function () {

        var _this = this;

        /**
         * @ngdoc property
         * @name oasUrlProvider#defaults
         *
         * @description
         * defaults object for oasUrl
         *
         **/
        _this.defaults = {};

        /**
         * @ngdoc method
         * @name oasUrlProvider#setDefaults
         *
         * @description
         * Set defaults for oasUrl
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/

        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };


        /**
         * @ngdoc method
         * @name oasUrlProvider#$get
         *
         * @description
         * Sets url, version and id for oas tag
         *
         * @requires $window
         * @requires $location
         *
         **/
        _this.$get = [
            '$window',
            '$location',
            function (
                $window,
                $location
            ) {
                var self = this,
                    publicMethods = {};
                $window.oas_tag = $window.oas_tag || {};

                $window.oas_tag.url = 'oascentral.dominionenterprises.com'; //Define OAS URL
                $window.oas_tag.version = '1';
                $window.oas_tag.id = 'oas_dx_' + $window.oas_tag.url;

                return [$location.protocol() + '://' + $window.oas_tag.url + '/om/' + $window.oas_tag.version + '.js', $window.oas_tag.id];
            }
        ];

    });

};

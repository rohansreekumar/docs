'use strict';

/**
 * @ngdoc provider
 * @name dfpNetworkCodeProvider
 * @module huiDfp
 *
 * @description
 * dfpNetworkCode service provider
 *
 */

/**
 * @ngdoc service
 * @name dfpNetworkCode
 * @module huiDfp
 *
 * @description
 * sdfasdf
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('dfpNetworkCode', function () {

        var _this = this;

        _this.defaults = {
            networkCode: '65144157'
        };

        /**
         * @ngdoc method
         * @name dfpNetworkCodeProvider#setDefaults
         * @description
         *
         * Set defaults for dfpNetworkCode
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            function () {
                var self = this;

                return self.defaults.networkCode;
            }
        ];

    });

};

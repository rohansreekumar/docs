'use strict';

/**
 * @ngdoc provider
 * @name dfpAppCodeProvider
 * @module huiDfp
 *
 * @description
 * dfpAppCode service provider
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('dfpAppCode', function () {

        var _this = this;

        _this.defaults = {
            appCode: 'Homes_Mobile'
        };

        /**
         * @ngdoc method
         * @name dfpAppCodeProvider#setDefaults
         * @description
         *
         * Set defaults for dfpAppCode
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

                return self.defaults.appCode;
            }
        ];

    });

};

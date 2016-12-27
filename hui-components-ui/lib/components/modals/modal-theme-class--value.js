'use strict';

/**
 * @ngdoc provider
 * @name modalThemeClassProvider
 * @module huiModals
 *
 * @description
 * modalThemeClass value provider
 *
 */

/**
 * @ngdoc value
 * @name modalThemeClass
 * @module huiModals
 *
 * @description
 * The default modal theme class (used in ngDialog config)
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('modalThemeClass', function () {

        var _this = this;

        _this.defaults = {
            className: 'ngdialog-theme-hui--mobile'
        };

        /**
         * @ngdoc method
         * @name modalThemeClassProvider#setDefaults
         * @description
         *
         * Set defaults for modalThemeClass
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/

        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            function () {
                var self = this,
                    publicMethods = {};

                return _this.defaults.className;
            }
        ];

    });

};

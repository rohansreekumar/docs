'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc provider
     * @name app.frame.globalNavFooter.provider:googleShareProvider
     *
     * @description
     * googleShare service provider
     */

    /**
     * @ngdoc service
     * @name app.frame.globalNavFooter.service:googleShare
     *
     * @requires googleShareUtil
     *
     * @description
     * loads googleShare script
     */
    ngModule.provider('googleShare', function () {
        var _this = this;

        _this.defaults = {};

        /**
         * @ngdoc method
         * @name setDefaults
         * @methodOf app.frame.globalNavFooter.service:googleShareProvider
         * @description
         *
         * Set defaults for googleShare
         *
         **/
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            'googleShareUtil',
            function (
                googleShareUtil
            ) {
                var service = {};

                /**
                 * reference to promises so that we dont' load or set certain things more than once
                 * @type {Object}
                 */
                service.$promiseCache = {};

                /**
                 * @ngdoc method
                 * @name loadLibrary
                 * @methodOf app.frame.globalNavFooter.service:googleShare
                 *
                 * @description
                 * loads googleShare script async
                 *
                 * @return {Promise} loadLibrary
                 */
                service.loadLibrary = function () {
                    if (service.$promiseCache.loadLibrary) {
                        return service.$promiseCache.loadLibrary;
                    }
                    service.$promiseCache.loadLibrary = googleShareUtil.loadLibrary();

                    return service.$promiseCache.loadLibrary;
                };

                return service;
            }
        ];

    });
};

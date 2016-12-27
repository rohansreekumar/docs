'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc factory
     * @name huiDevice.factory:isMobileCookie
     *
     * @requires $cookies
     * @requires _
     * @requires moment
     *
     * @description
     * Adds is_mobile cookie with an time of expires for 2 hours.
     */
    ngModule.factory('isMobileCookie', [
        '$cookies',
        '_',
        'moment',
        function (
            $cookies,
            _,
            moment
        ) {
            var service = {};

            /**
             * @ngdoc method
             * @name set
             * @methodOf huiDevice.isMobileCookie
             * @description
             * Sets the cookie with an expiration time of 2 hours.
             *
             * @param {boolean} isMobile whether to set is mobile true/false.
             * @param {Object} options whether to force set the cookie or change time to expire.
             */
            service.set = function (isMobile, options) {

                if (_.get(options, 'force') || _.isUndefined($cookies.get('IS_MOBILE'))) {
                    var laterTime = moment()
                        .add(_.get(options, 'hours', 2), 'hours')
                        .toISOString();

                    $cookies.put('IS_MOBILE', isMobile, {
                        expires: laterTime
                    });
                }
            };

            return service;
        }
    ]);
};

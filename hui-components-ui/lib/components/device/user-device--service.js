'use strict';

module.exports = function(ngModule, MobileDetect) {

    /**
     * @ngdoc provider
     * @name huiDevice.provider:userDevice
     * @description
     * userDeviceProvider is used to set the device's user agent
     * during configuration.
     */
    ngModule.provider('userDevice', function() {

        var self = this;

        /**
         * @ngdoc method
         * @name setUserAgent
         * @methodOf huiDevice.userDevice
         * @description
         * A method used to set the device's userAgent
         * during configuration.
         *
         * @param {string} agent
         */
        self.setUserAgent = function(agent) {
            self.userAgent = agent;
        };

        /**
         * @ngdoc factory
         * @name huiDevice.factory:userDevice
         *
         * @requires $window
         * @requires $cookies
         * @requires _
         * @requires isMobileCookie
         *
         * @description
         * Uses the third-party library 'Mobile Detect' to parse the userAgent
         * string to determine the device's type and OS.
         */
        self.$get = [
            '$window',
            '$cookies',
            '_',
            'isMobileCookie',
            function(
                $window,
                $cookies,
                _,
                isMobileCookie
            ) {

                var deviceProperties,
                    privateMethods,
                    publicMethods;

                /**
                 * @ngdoc method
                 * @name parseAgent
                 * @methodOf huiDevice.userDevice
                 * @description
                 * Returns the information about the user's device
                 *
                 * @returns {object} properties information about the user's device.
                 */
                function parseAgent() {

                    var detectedProperties,
                        properties = {};

                    /*
                     * Creates a new MobileDetect object based on the provided
                     * userAgent.  If a userAgent wasn't provided, grab it from
                     * window.navigator.userAgent directly.
                     */
                    if (self.userAgent) {
                        detectedProperties = new MobileDetect(self.userAgent);
                    } else {
                        detectedProperties = new MobileDetect($window.navigator.userAgent);
                    }

                    /*
                     * Set the initial value of isMobile and $cookie.isMobile based
                     * on output from MobileDetect.
                     */
                    if (detectedProperties.tablet()) {
                        properties.isMobile = false;
                    } else {
                        properties.isMobile = Boolean(detectedProperties.mobile());
                    }
                    isMobileCookie.set(properties.isMobile);

                    /*
                     * Determine the user's device operating system.
                     */
                    properties.platform = (function() {
                        switch (detectedProperties.os()) {
                            case 'AndroidOS':
                                return 'android';
                            case 'iOS':
                                return 'ios';
                            default:
                                return 'desktop';
                        }
                    }());

                    /*
                     * Determine the user's device form factor.
                     */
                    properties.deviceType = (function() {
                        var thePhone = detectedProperties.phone(),
                            theTablet = detectedProperties.tablet();

                        if (thePhone) {
                            properties.device = thePhone;
                            return 'phone';
                        } else if (theTablet) {
                            properties.device = theTablet;
                            return 'tablet';
                        } else {
                            properties.device = 'desktop';
                            return 'desktop';
                        }

                    }());

                    /*
                     * Determine the user's browser.
                     */
                    properties.browser = detectedProperties.ua;

                    return properties;
                }

                privateMethods = {

                    /**
                     * @ngdoc method
                     * @name parseUserAgent
                     * @methodOf huiDevice.userDevice
                     * @description
                     * Calls parseAgent and sets the device Properties.
                     */
                    parseUserAgent: function () {
                        deviceProperties = parseAgent();
                    },

                    /**
                     * @ngdoc method
                     * @name setUserAgent
                     * @methodOf huiDevice.userDevice
                     * @description
                     * Extend optional newProperties over existing deviceProperties.
                     *
                     * @param {Object} newProperties new properties to be extended
                     */
                    setUserAgent: function(newProperties) {
                        deviceProperties = _.extend(deviceProperties, newProperties);
                    }

                };

                privateMethods.parseUserAgent();

                publicMethods = {

                    /**
                     * @ngdoc property
                     * @name details
                     * @methodOf huiDevice.userDevice
                     * @description
                     * Provides a reference to deviceProperties, which contains
                     * information gleaned from the last userAgent parse.
                     */
                    details: deviceProperties,

                    /**
                     * @ngdoc method
                     * @name get
                     * @methodOf huiDevice.userDevice
                     * @description
                     * Returns an object containing the current device properties.
                     *
                     * @returns {object} deviceProperties containing information gleaned from the last userAgent parse.
                     */
                    get: function() {
                        return deviceProperties;
                    },

                    /**
                     * @ngdoc method
                     * @name set
                     * @methodOf huiDevice.userDevice
                     * @description
                     * If additional information is provided by the user, extend it to
                     * the existing deviceProperties object.  If new data is not provided,
                     * reparse the stored or current userAgent;
                     *
                     * @param {Object} newProperties
                     * @returns {Object} deviceProperties Provides a reference to deviceProperties, which contains
                     * information gleaned from the last userAgent parse.
                     */
                    set: function(newProperties) {
                        if (!newProperties) {
                            privateMethods.parseUserAgent();
                        } else {
                            privateMethods.setUserAgent(newProperties);
                        }

                        return deviceProperties;

                    }

                };

                return publicMethods;

            }
        ];

    });

};

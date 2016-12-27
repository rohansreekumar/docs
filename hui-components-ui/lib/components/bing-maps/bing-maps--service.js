'use strict';

module.exports = function (ngModule) {

    ngModule.constant('bingKeyDev', 'ArHfYIa9lmdLMRJwrI3OjD5EzzNCzuNwXWBi1wYlw5PhKidOm1uezdm6S57bHhTM');
    ngModule.constant('bingKeyLive', 'Avz_CS4-1Xd35oWVrW1g7tT2gBCU9dytGMLxytWvI32jfL-oXGGyIZIdUR-qHt0Q');

    /**
     * @ngdoc provider
     * @name bingMapsProvider
     * @module huiDetails
     *
     * @require bingKeyDev
     *
     * @description
     * bingMaps service provider
     */
    ngModule.provider('bingMaps', [
        'bingKeyDev',
        function (
            bingKeyDev
        ) {
            var _this = this;

            _this.defaults = {
                options: {
                    credentials: bingKeyDev,
                    zoom: 16,
                    mapTypeId: 'r',
                    showDashboard: false
                }
            };

            _this.setDefaults = function (newDefaults) {
                _this.defaults = angular.extend(_this.defaults, newDefaults);
            };

            /**
             * @ngdoc service
             * @name bingMaps
             * @module huiDetails
             *
             * @require $http
             * @require $window
             * @require $timeout
             * @require bingKeyDev
             * @require bingKeyLive
             * @require bingMapsLibraryUtil
             * @require _
             *
             * @description
             * Methods to be use to work with Bing Maps API.
             */
            _this.$get = [
                '$http',
                '$window',
                '$timeout',
                'bingKeyLive',
                'bingMapsLibraryUtil',
                '_',
                function (
                    $http,
                    $window,
                    $timeout,
                    bingKeyLive,
                    bingMapsLibraryUtil,
                    _
                ) {
                    var self = this;

                    /*
                     * @ngdoc method
                     * @name bingMaps#setBingKey
                     *
                     * @description
                     * sets the bing api key based on the environment being
                     * production or development.
                     */
                    self.setBingKey = function () {
                        // jshint bitwise: false
                        if ($window.app.environment & 8) {
                            self.defaults.options.credentials = bingKeyLive;
                        } else {
                            self.defaults.options.credentials = bingKeyDev;
                        }
                        // jshint bitwise: true
                    };

                    /*
                     * @ngdoc method
                     * @name bingMaps#loadLibrary
                     *
                     * @description
                     * Loads the bingMapsLibrary asynchronously
                     */
                    self.loadLibrary = function () {

                        return bingMapsLibraryUtil.loadLibrary();
                    };

                    /*
                     * @ngdoc method
                     * @name bingMaps#mapLoaded
                     *
                     * @description
                     * Incremently checks window object to determine if Microsoft
                     * Maps has loaded. Throws an error after the increment reaches
                     * zero and the map has not loaded. There is no callback to
                     * determine if map is loaded from what I could find.
                     *
                     * @param {integer} increment number of times to run through function
                     * @returns {promise}
                     */
                    self.mapLoaded = function (increment) {
                        return $timeout(function () {

                            // Determine if Microsoft.Maps is set on the window object
                            if (_.get($window, 'Microsoft.Maps.Map', false)) {
                                return true;
                            // run Load map again as long as increment is higher than 0
                            } else if (increment > 0) {
                                return self.mapLoaded(increment - 1);

                            // Throw and error if map never loads in allotted time
                            } else {
                                throw new HuiError('Map failed to load');
                            }

                        }, 100);
                    };

                    /*
                     * @ngdoc method
                     * @name bingMaps#loadBingMaps
                     *
                     * @description
                     * initializes bing maps.
                     *
                     * @returns {promise}
                     */
                    self.loadBingMaps = function () {

                        self.setBingKey();

                        return self.loadLibrary().then(function () {
                            return self.mapLoaded(10);
                        });
                    };

                    /*
                     * @ngdoc method
                     * @name bingMaps#setOptions
                     *
                     * @description
                     * Merge options with current defaults.
                     *
                     * @param {object} options to be merged with default options
                     */
                    self.setOptions = function (options) {
                        if (_.isObject(options)) {
                            _this.defaults.options = _.merge(_this.defaults.options, options);
                        }
                    };

                    /*
                     * @ngdoc method
                     * @name bingMaps#getOptions
                     *
                     * @description
                     * Gets the options for maps
                     *
                     * @returns {object} the default options
                     */
                    self.getOptions = function () {
                        return self.defaults.options;
                    };

                    /*
                     * @ngdoc method
                     * @name bingMaps#setMap
                     *
                     * @description
                     * Sets a new map from the Bing API
                     *
                     * @param {element} element to bind the map to
                     * @returns {object} map
                     */
                    self.setMap = function (element) {
                        var map = new $window.Microsoft.Maps.Map(element, self.getOptions());

                        return map;
                    };

                    /*
                     * @ngdoc method
                     * @name setPins
                     * @methodOf huiDetails.controller:bingMaps
                     *
                     * @description
                     * initialize the pushpins to display on map.
                     *
                     * @param {array | object} location to place the push pin(s)
                     * @param {object} options for push pin(s)
                     * @param {function} onClick handler which is getting called on push pin click
                     * @returns {array | object}
                     */
                    self.setPins = function (location, options, onClick) {
                        var pins,
                            pin,
                            bingLocation;

                        if (_.isArray(location)) {
                            pins = new $window.Microsoft.Maps.EntityCollection();

                            location.forEach(function (value, key) {
                                bingLocation = new $window.Microsoft.Maps.Location(location[key].lat, location[key].lng);
                                pin = new $window.Microsoft.Maps.Pushpin(bingLocation, options);
                                if (onClick) {
                                    self.addHandler(pin, 'click', onClick);
                                }
                                pins.push(pin);
                            });

                        } else {
                            bingLocation = new $window.Microsoft.Maps.Location(location.lat, location.lng);
                            pin = new $window.Microsoft.Maps.Pushpin(bingLocation, options);
                            if (onClick) {
                                self.addHandler(pin, 'click', onClick);
                            }
                        }

                        return pins || pin;
                    };

                    /*
                     * @ngdoc method
                     * @name addHandler
                     * @methodOf huiDetails.controller:bingMaps
                     *
                     * @param {object} element map object on which handler should be added
                     * @param {string} event name of the event
                     * @param {object} handler function to be attached to the event
                     * @param {number} interval minimum interval between events (delault to 1000 milliseconds)
                     *
                     * @description
                     * Attaches the handler for the event that is thrown by the target.
                     */
                    self.addHandler = function(element, event, handler, interval) {
                        if (!($window.Microsoft.Maps.Events.hasHandler(element, event))) {
                            $window.Microsoft.Maps.Events.addThrottledHandler(element, event, handler, interval || 1000);
                        }
                    };

                    return self;
                }
            ];
        }
    ]);
};

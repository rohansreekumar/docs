'use strict';

/**
 * @ngdoc service
 * @name dfpCta
 * @module huiDfp
 *
 * @description
 *
 * Service for creating and displaying ads using $window.googletag.
 * @link https://support.google.com/dfp_sb/answer/1651549?hl=en
 *
 * directive dfpCta is used to create ad positions.
 * much code cribbed from gary justin - gary.justin@forrent.com
 *
 * @example
 *
 * // create slot configuration
 * var slot = {
 * 	unit: ,
 * 	size: [],
 * 	id: <ad id>
 * }
 *
 * // register with service
 * dfpCta.defineSlot(slot);
 *
 * // ad div to page
 *
 * var div = document.createElement(div);
 * div.id = <ad id>
 * document.appendChild(div);
 *
 * // run ad
 * dfpCta.runAd(slot.id);
 */

/**
 * @ngdoc service
 * @name dfpCtaProvider
 * @module huiDfp
 *
 *
 * @required $window
 * @required $q
 * @required $_
 * @required $dfpCtaUtils
 * @required $dfpRendered
 *
 * @description
 * dfpCta provider
 *
 */
module.exports = function (ngModule) {
    ngModule.provider('dfpCta', function () {
        var _this = this;

        _this.defaults = {
            setCentering: true // centers all ads on site-ish
        };

        /**
         * @ngdoc method
         * @name dfpCtaProvider#setDefaults
         * @description
         *
         * Set defaults for dfpCta
         *
         * @param {object} newDefaults New defaults to extend the existing defaults
         *
         **/
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            '$window',
            '$rootScope',
            '$q',
            '$log',
            '_',
            'dfpCtaUtils',
            'dfpRendered',
            function (
                $window,
                $rootScope,
                $q,
                $log,
                _,
                dfpCtaUtils,
                dfpRendered
            ) {
                var self = this,
                    publicMethods,
                    privateMethods;

                /**
                 * reference to promises so that we dont' load or set certain things more than once
                 * @type {Object}
                 */
                self.$promiseCache = {};
                /**
                 * slot configurations registered with this service
                 * @type {Object}
                 */
                self.$slots = {};
                /**
                 * slots declared with googletag
                 * @type {Object}
                 */
                self.$definedSlots = {};

                /**
                 * @ngdoc method
                 * @name dfpCta#defineSlot
                 * @description
                 * Register slot configuration with service
                 * @param  {object} options slot configueration
                 * @return {object}
                 */
                function defineSlot (options) {
                    self.$slots[options.id] = options;
                    return self.$slots[options.id];
                }
                /**
                 * @ngdoc method
                 * @name dfpCta#disableAds
                 *
                 * @description
                 * Disable loading and rendering of all advertisements.
                 *
                 * @returns {object}
                 */
                function disableAds () {
                    self.$disabled = true;
                }

                /**
                 * @ngdoc method
                 * @name dfpCta#setRendered
                 *
                 * @description
                 * Calls dfpRendered setRendered when slotRenderedEnded is triggered
                 *
                 * @param {object} slot - A slot object that contains unit, size and id properties.
                 * @param {object} event - Determines if dfp slot is empty or not.
                 */
                function setRendered (slot, event) {
                    dfpRendered.setRendered(event, slot);
                }

                /**
                 * Load GPT
                 * @return {Promise} resolves when library loads
                 * @private
                 */
                function loadLibrary () {
                    if (self.$promiseCache.loadLibrary) {
                        return self.$promiseCache.loadLibrary;
                    }
                    self.$promiseCache.loadLibrary = dfpCtaUtils.loadLibrary();

                    return self.$promiseCache.loadLibrary;
                }

                /**
                 * One time settings for GPT that must be set before enabling services.
                 *
                 * enableSingleRequest - https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_enableSingleRequest
                 * enableAsyncRendering - https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_enableSyncRendering
                 * disableInitialLoad - https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_disableInitialLoad
                 * setCentering - https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_setCentering
                 *
                 * @return {Promise} resolves when these settings are set
                 * @private
                 */
                function libSettings () {
                    var defer;

                    if (self.$promiseCache.libSettings) {
                        return self.$promiseCache.libSettings;
                    }
                    defer = $q.defer();
                    self.$promiseCache.libSettings = defer.promise;

                    loadLibrary()
                        .then(function () {
                            $window.googletag.cmd.push(function () {
                                $window.googletag.pubads().enableSingleRequest();
                                $window.googletag.pubads().disableInitialLoad();
                                $window.googletag.pubads().enableAsyncRendering();
                                $window.googletag.pubads().setCentering(_this.defaults.setCentering);

                                defer.resolve();
                            });
                        });

                    return self.$promiseCache.libSettings;
                }

                /**
                 * define slot with google
                 * https://developers.google.com/doubleclick-gpt/reference#googletag.defineSlot
                 * @return {Object.Promise} An object whose values are promises that will be resolved when the ad with key's id is defined with GPT
                 * @private
                 */
                function defineSlots () {
                    if (!self.$promiseCache.defineSlots) {
                        self.$promiseCache.defineSlots = {};
                    }

                    loadLibrary()
                        .then(function () {
                            _.forEach(self.$slots, function (slot, id) {
                                var defer;

                                if (self.$promiseCache.defineSlots[id]) {
                                    return;
                                }

                                defer = $q.defer();
                                $window.googletag.cmd.push(function () {
                                    self.$definedSlots[id] = $window.googletag.defineSlot(slot.unit, slot.size, id);
                                    if (slot.callback && _.isFunction(slot.callback)) {
                                        self.$definedSlots[id].addService($window.googletag.pubads().addEventListener('slotRenderEnded', setRendered.bind(event, slot)));
                                    } else {
                                        self.$definedSlots[id].addService($window.googletag.pubads());
                                    }

                                    // slot level segment targeting
                                    if (slot.targeting) {
                                        angular.forEach(slot.targeting, function (value, key) {
                                            self.$definedSlots[id].setTargeting(key, value);
                                        });
                                    }
                                    // page level segment targeting
                                    if (self.targeting && self.targeting.targeting) {
                                        angular.forEach(self.targeting.targeting, function (value, key) {
                                            self.$definedSlots[id].setTargeting(key, value);
                                        });
                                    }

                                    defer.resolve(self.$definedSlots[id]);
                                });

                                self.$promiseCache.defineSlots[id] = defer.promise;
                            });
                        });

                    return self.$promiseCache.defineSlots;
                }

                /**
                 * enable services for defined slots
                 * https://developers.google.com/doubleclick-gpt/reference#googletag.enableServices
                 *
                 * @return {Promise} Resolves when services are enabled
                 * @private
                 */
                function enableServices () {
                    var defer;

                    if (self.$promiseCache.enableServices) {
                        return self.$promiseCache.enableServices;
                    }
                    defer = $q.defer();
                    self.$promiseCache.enableServices = defer.promise;

                    loadLibrary()
                        .then(function () {
                            $window.googletag.cmd.push(function () {
                                $window.googletag.enableServices();
                                defer.resolve();
                            });
                        });

                    return self.$promiseCache.enableServices;
                }

                /**
                 * @ngdoc method
                 * @name dfpCta#runAd
                 * @description
                 * Displays an ad slot
                 *
                 * loadLibrary - loads configured dfp library
                 * defineSlots - defines ad slots with GPT
                 * libSettings - sets library options before enabling services
                 * enableServices - enables ad services for positions on page
                 * displays ad
                 *
                 * @param  {String} id Id of the ad slot we are running
                 */
                function runAd (id) {
                    if (self.$disabled) {
                        $log.info('dfp disabled: ', id);
                        return;
                    }
                    loadLibrary()
                        .then(defineSlots)
                        .then(function (p) {
                            return $q.all(self.$promiseCache.defineSlots);
                        })
                        .then(libSettings)
                        .then(enableServices)
                        .then(function () {
                            var defer = $q.defer(),
                                debugTargeting = {};

                            $window.googletag.cmd.push(function () {
                                $window.googletag.display(id);
                                $window.googletag.pubads().refresh([self.$definedSlots[id]]);
                                if ($window.app && $window.app.dev) {
                                    _.map(self.$definedSlots[id].getTargetingKeys(), function (key) {
                                        debugTargeting[key] = self.$definedSlots[id].getTargeting(key);
                                    });

                                    $log.info('dfp: ', self.$slots[id].unit, id, debugTargeting, 'size: ', self.$slots[id].size);
                                }

                            });
                            return defer.promise;
                        })
                        .then(function () {
                            $rootScope.$apply();
                        })
                        .catch(function (e) {
                            throw new Error(e);
                        });
                }

                /**
                 * @ngdoc method
                 * @name dfpCta#resetPage
                 * @description
                 * Reset targeting between 'page views'
                 *
                 * @param {Object} pageProps Current page props
                 */
                function resetPage (pageProps) {
                    self.targeting = pageProps && pageProps.targeting && pageProps.targeting.dfp;
                }

                /**
                 * @ngdoc method
                 * @name dfpCta#destroySlot
                 * @description
                 * Deletes slots from cache and slot object and destroys slot
                 * using the googletag destroySlot
                 *
                 * @param  {string} id Slot id
                 */
                function destroySlot (id) {
                    delete self.$promiseCache.defineSlots[id];
                    delete self.$slots[id];

                    $window.googletag.cmd.push(function clearPageSlots () {
                        $window.googletag.destroySlots([self.$definedSlots[id]]);
                    });
                }

                privateMethods = {
                    $setRendered: setRendered,
                    $loadLibrary: loadLibrary,
                    $libSettings: libSettings,
                    $defineSlots: defineSlots,
                    $enableServices: enableServices
                };

                publicMethods = {
                    defineSlot: defineSlot,
                    disableAds: disableAds,
                    runAd: runAd,
                    $resetPage: resetPage,
                    destroySlot: destroySlot
                };

                return _.extend(self, privateMethods, publicMethods);
            }
        ];

    });
};

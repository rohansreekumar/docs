'use strict';

/**
 * @ngdoc provider
 * @name oas.provider:oas
 *
 * @description
 * oas service provider
 *
 */
module.exports = function (ngModule) {

    ngModule.provider('oas', function () {

        var _this = this;

        _this.defaults = {};

        /**
         * @ngdoc method
         * @name setDefaults
         * @methodOf oas.provider:oas
         * @description
         *
         * Set defaults for oas
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        /**
         * @ngdoc method
         * @name $get
         * @methodOf oas.provider:oas
         *
         * @description
         * Set defaults for oas
         *
         * @requires _
         * @requires $q
         * @requires $window
         * @requires $log
         * @requires oas.oasUtil
         * @requires $
         * @requires huiRouter.pageProperties
         *
         **/
        _this.$get = [
            '_',
            '$q',
            '$window',
            '$log',
            'oasUtil',
            '$',
            'pageProperties',
            function (
                _,
                $q,
                $window,
                $log,
                oasUtil,
                $,
                pageProps
            ) {
                var self = this,
                    publicMethods = {};

                $window.oas_tag = $window.oas_tag || {};
                /**
                 * The slots that are active/want to be active on the page.
                 * @type {Object}
                 */
                self.$currentSlots = {};
                /**
                 * The slots that have been defined in an oas_tag.sizes() call.
                 * @type {Array}
                 */
                self.$definedSlots = [];
                /**
                 * By setting resolved promises to properties of this object,
                 * used to control whether to execute an asynchronous function
                 * as well as check if it has been executed
                 * @type {Object}
                 */
                self.$promiseCache = {};
                /**
                 * Lets us check if oas_tag.sizes has been called,
                 * which indicates that ads have been declared for the site at
                 * least once. We need to check because we can't call
                 * oas_tag.reloadAds without having hads loaded at least once.
                 * We might be able to simply check for the existence of
                 * oas_tag.reloadAds instead according to one of the examples in the docs.
                 * @type {Number}
                 */
                self.sizesCalled = 0;

                /**
                 * @ngdoc method
                 * @name $init
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * set base global settings
                 * @returns {Promise} resolves after init is run
                 * @private
                 */
                function init() {
                    var d;

                    if (!self.$promiseCache.init) {
                        d = $q.defer();
                        self.$promiseCache.init = d.promise;

                        $window.oas_tag.allowSizeOverride = 'true';
                        $window.oas_tag.analytics = true; // required to collect taxonomy & referral data
                        $window.oas_tag.taxonomy = '';
                        $window.oas_tag.sizes = self.sizes;

                        if ($window.app && $window.app.dev) {
                            $window.oas_tag.callbackHandler = function () {
                                $window.oas_tag.addHandler('debug', $debugSlot, 'onload');
                            };
                        }
                        d.resolve();
                    }
                    return self.$promiseCache.init;
                }

                /**
                 * @ngdoc method
                 * @name $debugSlot
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * Logs debug data when used as a callback for ads
                 * * width              // ad width from ad response
                 * * height             // ad height from ad response
                 * * position          // ad position from ad response
                 * * clickUrl           // ad click url from ad response
                 * * fileUrl             // ad file url from ad response
                 * * impUrl            // ad impression url from ad response
                 * * type                // ad mime type from ad response
                 * * alt                   // ad alt description from ad response
                 * * extraHtml      // ad extra html field from ad response
                 * * extraText       // ad extra text field from ad response
                 * * campaignId    // ad campaign id from ad response
                 * * target             // ad target field from ad response
                 * * creativeId      // ad creative id from ad response
                 * * creative          // ad creative content from ad response
                 *
                 * @param  {Object} data data for all live ads
                 * @param  {String} pos  Position beind debugged
                 *
                 * @private
                 */
                function $debugSlot(data, pos) {
                    //get ad data about the ad position
                    var ad = data[pos];

                    if (ad) {
                        $log.info('oas: ', ad);
                    }
                }

                /**
                 * @ngdoc method
                 * @name $loadAds
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * Call oas_tag.loadAd for each active position
                 *
                 * @private
                 */
                function $loadAds() {
                    _.forEach(self.$currentSlots, function (slot) {
                        $window.oas_tag.loadAd(slot.position);
                    });
                }

                /**
                 * @ngdoc method
                 * @name $$reloadAds
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * reload ads if you can, otherwise load ads. This function is debounced. It clears the promiseCache for reload/loading of ads when it runs.
                 *
                 * @param  {Deferred} d deferred object that is resolved when ads are loaded or reloaded.
                 *
                 * @private
                 */
                function $$reloadAds(d) {
                    if (self.sizesCalled) {
                        $window.oas_tag.reloadAds();
                    } else {
                        $loadAds();
                    }
                    d.resolve();
                    delete self.$promiseCache.reloadAds;
                }
                self.$reloadAds = _.debounce($$reloadAds, 500);

                /**
                 * @ngdoc method
                 * @name reloadAds
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * reloads Ads
                 *
                 * @returns {Promise} resolves when ads have been loaded
                 *
                 * @private
                 */
                function reloadAds() {
                    var d;
                    if (!self.$promiseCache.reloadAds) {
                        d = $q.defer();
                        self.$promiseCache.reloadAds = d.promise;

                        self.$reloadAds(d);
                    }

                    return self.$promiseCache.reloadAds;
                }

                /**
                 * @ngdoc method
                 * @name loadLibrary
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * load the oas library from the oasUtil service
                 * @returns {Promise} resolves when the library is loaded
                 * @private
                 */
                function loadLibrary() {
                    if (!self.$promiseCache.loadLibrary) {
                        self.$promiseCache.loadLibrary = oasUtil.loadLibrary();
                    }

                    return self.$promiseCache.loadLibrary;
                }

                /**
                 * @ngdoc method
                 * @name setQuery
                 * @methodOf oas.service:oas
                 * @description
                 * set the site page and query, different for every page, query will be serialized using params provided by helios
                 * @param {String} sitePage    site page identifier in oas - 'www.homes.com'
                 * @param {Object} queryParams targeting parameters from helios
                 *
                 * @returns {object} promise object resolves when oas_tag fields are assigned
                 * @private
                 */
                function setQuery(sitePage, queryParams) {
                    var d,
                        customZipParam = '',
                        targeting;

                    if (!self.$promiseCache.setQuery || $window.oas_tag.site_page !== _.get(pageProps, '$current.targeting.oas.sitePage')) {
                        d = $q.defer();
                        self.$promiseCache.setQuery = d.promise;

                        $window.oas_tag.site_page = _.get(pageProps, '$current.targeting.oas.sitePage');
                        targeting = _.clone(_.get(pageProps, '$current.targeting.oas.targeting'));
                        if (targeting.customzip) {
                            if (typeof targeting.customzip === 'string') {
                                customZipParam = '&customzip=' + targeting.customzip;
                            } else if (_.isArray(targeting.customzip)) {
                                _.forEach(targeting.customzip, function (itm) {
                                    customZipParam += '&customzip=' + itm;
                                });
                            }
                            delete targeting.customzip;
                        }
                        $window.oas_tag.query = decodeURIComponent($.param(targeting)) + customZipParam;
                        d.resolve();

                    }

                    return self.$promiseCache.setQuery;
                }

                /**
                 * @ngdoc method
                 * @name $definePosition
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * Define or update a slot
                 * @param  {String} position A valid tag position name
                 * @param  {Array} size     size[0] = width size[1] = height for targeting the ad position.
                 *
                 * @private
                 */
                function $definePosition(position, size) {
                    var slot = self.$currentSlots[position];
                    if (!slot) {
                        self.$currentSlots[position] = {
                            position: position,
                            size: size
                        };
                    } else {
                        slot.size = size;
                    }

                }

                /**
                 * @ngdoc method
                 * @name destroyPosition
                 * @methodOf oas.service:oas
                 * @description
                 * Remove an ad postion from the list of positions to manage.
                 * @param  {String} id Unique identifier used when registering positions, at the moment, simply the position string.
                 */
                publicMethods.destroyPosition = function destroyPosition(id) {
                    delete self.$currentSlots[id];
                    delete self.$definedSlots[id];

                };

                /**
                 * @ngdoc method
                 * @name sizes
                 * @methodOf oas.service:oas
                 * @description
                 * Will call definePos for every defined slot, used for the $window.oas_tag sizes function
                 */
                publicMethods.sizes = function () {
                    _.forEach(self.$currentSlots, function (slot) {
                        if (!_.find(self.$definedSlots, {
                            position: slot.position
                        })) {
                            $window.oas_tag.definePos(slot.position, slot.size);
                            self.$definedSlots[slot.position] = slot;
                        }
                    });

                    ++self.sizesCalled;
                };

                /**
                 * @ngdoc method
                 * @name loadCta
                 * @methodOf oas.service:oas
                 * @description
                 * load ads and optionally define them
                 * @param  {String} position position in oas
                 * @param  {Array} size     width, height of ad position
                 * @returns {Promise}  promise object resolves after completion of set of actions mentioned
                 */
                publicMethods.loadCta = function (position, size) {

                    $definePosition(position, size);
                    return init()
                        .then(setQuery)
                        .then(loadLibrary)
                        .then(reloadAds)
                        .catch(function () {
                            throw new HuiError('oas load failed', ['page:' + $window.oas_tag.site_page, 'position:' + position]);
                        });
                };

                /**
                 * @ngdoc method
                 * @name resetPage
                 * @methodOf oas.service:oas
                 *
                 * @description
                 * Ready the site_page and targeting_query values based on pageProperties
                 */
                publicMethods.resetPage = function resetPage() {
                    // set page targeting
                    delete self.$promiseCache.setQuery;
                };

                return angular.extend(self, publicMethods);
            }
        ];

    });

};

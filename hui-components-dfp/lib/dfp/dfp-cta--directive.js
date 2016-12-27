'use strict';

/**
 * @ngdoc directive
 * @name app.huiDfp.directive:dfpCtaLink
 *
 * @author gary justin - https://github.dominionenterprises.com/gary-justin/fr-dfp-advertisement
 *
 * @restrict E
 *
 * @description
 * Acts as a placeholder for ads when they're returned from the google ad service.
 *
 * @requires _
 * @requires $window
 * @requires dfpIds
 *
 * @param {String} [ctaId] Ad ID.
 * @param {String} [dfpListingType] page listing type so as to route desktop ads correctly
 * @param {Array} size Parameter used to set the height and width of the ad slot
 * @param {String} unit Parameter used to set the id of the ad with network code, app id, and page name
 * @param {String} position Parameter used to identify position which correlates with google dfp admin.
 * @param {Object} location Parameter used to set location targeting.
 * @param {bollean} checkRender Parameter used to determine whether to addEventListener to the slot.
 *
 * @example
 * <dfp-cta-link
 *      data-cta-id="div-gpt-cta-574899414907433380-3"          // mX only
 *      data-listing_type="div-gpt-cta-574899414907433380-3"    // desktop only
 *      data-unit="Details"
 *      data-location="::viewCtrl.pageProps.targeting.result.dfp.location"
 *      data-size="[320,50]"
 *      data-position="Middle">
 * </dfp-cta-link>
 */

module.exports = function (ngModule) {

    ngModule.directive('dfpCtaLink', [
        '_',
        '$window',
        'dfpIds',
        function (
            _,
            $window,
            dfpIds
        ) {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                require: 'dfpCtaLink',
                template: '<div class="ng-dfp-cta"></div>',
                controller: 'dfpCtaController',
                controllerAs: 'dfpCtaCtrl',
                bindToController: {
                    ctaId: '@?',
                    dfpListingType: '@?',
                    size: '=',
                    position: '@',
                    unit: '@',
                    location: '=',
                    callback: '='
                },
                compile: function (tEl, tAttrs) {
                    var self = this,
                        cta,
                        positionID,
                        preLink;

                    preLink = function preLink ($scope, el, $attr, ctrl) {
                        var self = this,
                            position = $attr.position,
                            dfpListingType = $attr.dfpListingType,
                            unit = _.camelCase($attr.unit);

                        cta = document.createElement('div');
                        if ($window.t_k === '_desktop') {
                            cta.id = dfpIds[unit][$attr.dfpListingType][$attr.position];
                        } else {
                            cta.id = $attr.ctaId;
                        }
                    };
                    function postLink ($scope, el, attr, ctrl) {
                        el.append(cta);
                        ctrl.init(el);
                    }
                    return {
                        pre: preLink,
                        post: postLink
                    };
                }
            };
        }
    ]);

    /**
     * @ngdoc controller
     * @name app.huiDfp.controller:dfpCtaController
     *
     * @author gary justin - https://github.dominionenterprises.com/gary-justin/fr-dfp-advertisement
     *
     * @description
     * Used as a place to set additional configurations on ads, define and/or run them.
     *
     * @requires $scope
     * @requires $window
     * @requires dfpCta
     * @requires dfpAppCode
     * @requires dfpNetworkCode
     * @requires dfpREndered
     * @requires _
     * @requires dfpIds
     */
    ngModule.controller('dfpCtaController', [
        '$scope',
        '$window',
        'dfpCta',
        'dfpAppCode',
        'dfpNetworkCode',
        'dfpRendered',
        '_',
        'dfpIds',
        function (
            $scope,
            $window,
            dfpCta,
            dfpAppCode,
            dfpNetworkCode,
            dfpRendered,
            _,
            dfpIds
          ) {
            var self = this,
                slotDef,
                unit = _.camelCase(self.unit);

            // Set the end of the unit string per listing_status or listing_type (if FORECLOSURE)
            if ($window.t_k === '_desktop') {
                self.ctaId = dfpIds[unit][self.dfpListingType][self.position];

                if (self.dfpListingType === 'foreclosure') {
                    self.pageType = '/FORECLOSURE';
                } else if (self.dfpListingType === 'offMarket') {
                    self.pageType = '/SOLD';
                } else if (self.dfpListingType === 'forRent') {
                    self.pageType = '/RENTAL';
                } else {
                    self.pageType = '/RESALE';
                }
            }

            // if any of the required parameters aren't set. Return false and don't
            // define any slots.
            //
            /**
             * @ngdoc method
             * @name dfpCtaController#init
             * @description
             * define and run ad
             */
            self.init = function initDfpCta () {
                if (!self.ctaId || !self.size || !self.position || !self.unit) {
                    return false;
                }

                // otherwise set the unit value to our constant values plus the value of the
                // unit passed into the directive
                self.unit = dfpNetworkCode + '/' + dfpAppCode + '/' + self.unit + (self.pageType || '');

                // and define a juicy dfp slot.
                slotDef = {
                    unit: self.unit,
                    size: self.size,
                    id: self.ctaId,
                    targeting: {
                        pos: self.position
                    },
                    location: self.location
                };


                if (_.isFunction(self.callback)) {
                    slotDef.callback = self.callback;
                    self.stopListening = dfpRendered.onUpdate(self, self.callback);
                }

                dfpCta.defineSlot(slotDef);

                // run the cta.
                dfpCta.runAd(self.ctaId);


                $scope.$on('$destroy', function () {
                    dfpCta.destroySlot(self.ctaId);

                    // Check to see if callback was added to ad slot
                    if (self.stopListening) {
                        dfpRendered.clearUpdate(self.stopListening);
                    }
                });

            };

        }
    ]);
};

'use strict';

/**
 * @ngdoc provider
 * @name trackScrollProvider
 * @module huiTrackScroll
 *
 * @description
 * trackScroll service provider.
 *
 */

/**
 * @ngdoc service
 * @name trackScroll
 * @module huiTrackScroll
 *
 * @requires $window
 *
 * @description
 * Keeps track of scrolls and report back values
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('trackScroll', [
        function () {
        var defaults = this.defaults = {},
            _this = this;

        /**
         * @ngdoc method
         * @name trackScrollProvider#setDefaults
         * @param {Object} newDefaults New defaults to extend the existing
         *
         * @description
         * Set defaults for trackScroll.
         *
         **/
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.extend(defaults, newDefaults);
        };

        _this.$get = [
            '$window',
            function (
                $window
            ) {
                var self = this,
                    oldScrollTop,
                    baseline = $window.pageYOffset;

                self.totalDelta = 0;
                self.scrollDirection = 'down';

                /**
                 * @ngdoc method
                 * @name trackScroll#$getScrollTop
                 *
                 * @description
                 * Gets the scrollTop value for calculating scroll distance
                 */
                self.$getScrollTop = function () {
                    return angular.element(window).scrollTop();
                };

                /**
                 * @ngdoc method
                 * @name trackScroll#$getPageYOffset
                 *
                 * @description
                 * Gets the current pageYOffset value for calculating scroll distance
                 */
                self.$getPageYOffset = function () {
                    return $window.pageYOffset;
                };

                /**
                 * @ngdoc method
                 * @name trackScroll#$checkDirectionSwitch
                 *
                 * @description
                 * Check for a change in scroll direction
                 */
                self.$checkDirectionSwitch = function (currentDirection) {
                    if (currentDirection !== self.scrollDirection) {
                        self.scrollDirection = currentDirection;
                        self.totalDelta = 0;
                        return true;
                    } else {
                        return false;
                    }
                };

                /**
                 * @ngdoc method
                 * @name trackScroll#baselineCheck
                 *
                 * @description
                 * Checks if the baseline is above or below the pageYOffset
                 */
                self.baselineCheck = function () {
                    return (baseline < $window.pageYOffset) ? true : false;
                };

                /**
                 * @ngdoc method
                 * @name trackScroll#setBaseline
                 *
                 * @description
                 * Sets the baseline to the pageYOffset
                 */
                self.setBaseline = function () {
                    baseline = $window.pageYOffset;
                    return baseline;
                };

                /**
                 * @ngdoc method
                 * @name trackScroll#returnSetScroll
                 * @param {number} value - distance required for trigger
                 *
                 * @description
                 * Returns a trigger when the scroll value is equal to the provides scroll amount value parameter.
                 */
                self.returnSetScroll = function (value) {
                    var currentScrollTop = self.$getScrollTop(),
                        scrollDelta;

                    scrollDelta = (oldScrollTop !== undefined) ? currentScrollTop - oldScrollTop : currentScrollTop;

                    if (scrollDelta > 0) {
                        self.$checkDirectionSwitch('up');
                    } else if (scrollDelta < 0) {
                        self.$checkDirectionSwitch('down');
                    }

                    oldScrollTop = currentScrollTop;

                    if (self.totalDelta <= value) {
                        self.totalDelta = self.totalDelta + scrollDelta;
                        return true;
                    } else {
                        self.totalDelta = self.totalDelta + scrollDelta;
                        return false;
                    }
                };
                return self;
            }
        ];
    }
]);
};

'use strict';

/**
 * @ngdoc provider
 * @name navDisplayProvider
 * @module track-scroll
 *
 * @description
 * navDisplay service provider.
 *
 */

/**
 * @ngdoc service
 * @name navDisplay
 * @module track-scroll
 *
 * @requires trackScroll
 * @requires $timeout
 *
 * @description
 * Adds and removes classes as needed to show/hide two stacked elements at the top of the screen.
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('navDisplay', [
        function () {
        var _this = this;

        _this.defaults = {
            topElementClass: 'main-nav',
            bottomElementClass: 'search-header',
            scrollDistance: -30,
            animationSpeed: 315
        };

        /**
         * @ngdoc method
         * @name navDisplayProvider#setDefaults
         * @param {Object} newDefaults New defaults to extend the existing
         *
         * @description
         * Set defaults for navDisplay.
         *
         **/
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.extend(_this.defaults, newDefaults);
        };

        _this.$get = [
            'trackScroll',
            '$timeout',
            function (
                trackScroll,
                $timeout
            ) {
                var self = this;

                /**
                 * @ngdoc method
                 * @name navDisplay#getBottomElement
                 *
                 * @description
                 * Return angular element instance of bottomElement
                 */
                self.getBottomElement = function () {
                    return angular.element('.' + self.defaults.bottomElementClass);
                };

                /**
                 * @ngdoc method
                 * @name navDisplay#getTopElement
                 *
                 * @description
                 * Return angular element instance of topElement
                 */
                self.getTopElement = function () {
                    return angular.element('.' + self.defaults.topElementClass);
                };

                /**
                 * @ngdoc method
                 * @name navDisplay#showTopElement
                 * @param {string} show
                 *
                 * @description
                 * Toggle the visibility of the topElement while the bottomElement is visible
                 */
                self.showTopElement = function(show) {
                    if (!show) {
                        self.getBottomElement().removeClass(self.defaults.bottomElementClass + '--push-down');
                        self.getTopElement().removeClass(self.defaults.topElementClass + '--visible');
                        self.getTopElement().addClass(self.defaults.topElementClass + '--hidden');
                    } else {
                        self.getBottomElement().addClass(self.defaults.bottomElementClass + '--push-down');
                        self.getTopElement().removeClass(self.defaults.topElementClass + '--hidden');
                        self.getTopElement().addClass(self.defaults.topElementClass + '--visible');
                    }
                };

                /**
                 * @ngdoc method
                 * @name navDisplay#delayedToggleTopElement
                 *
                 * @param {string} value
                 *
                 * @description
                 * Toggle the topElement --fixed class with a delay.
                 */
                self.delayedToggleTopElement = function (value) {
                    $timeout(function () {
                        if (value === 'up' && self.getTopElement().hasClass(self.defaults.topElementClass + '--fixed')) {
                            self.getTopElement().removeClass(self.defaults.topElementClass + '--hidden ' + self.defaults.topElementClass + '--fixed');
                        } else if (value === 'down') {
                            self.getTopElement().addClass(self.defaults.topElementClass + '--fixed');
                        }
                    }, self.defaults.animationSpeed);
                };

                /**
                 * @ngdoc method
                 * @name navDisplay#scrollAction
                 *
                 * @description
                 * Activates scroll listener to toggle the topElement based on the track scroll service's response.
                 */
                self.scrollAction = function() {
                    if (self.getBottomElement().hasClass(self.defaults.bottomElementClass + '--visible')) {
                        if (trackScroll.baselineCheck()) {
                            self.showTopElement(false);
                        } else {
                            if (trackScroll.returnSetScroll(self.defaults.scrollDistance)) {
                                self.showTopElement(true);
                            }
                        }
                    }
                    trackScroll.setBaseline();
                };

                /**
                 * @ngdoc method
                 * @name navDisplay#down
                 *
                 * @description
                 * Moves the bottomElement into view and puts the topElement at the top of the DOM out of view.
                 */
                self.down = function() {
                    self.getBottomElement().addClass(self.defaults.bottomElementClass + '--visible');
                    self.delayedToggleTopElement('down');
                };

                /**
                 * @ngdoc method
                 * @name navDisplay#up
                 *
                 * @description
                 * Moves the bottomElement out of view and removes the topElement from the top of the DOM.
                 */
                self.up = function() {
                    self.showTopElement(false);
                    self.getBottomElement().removeClass(self.defaults.bottomElementClass + '--visible');
                    self.delayedToggleTopElement('up');
                };

                return self;
            }
        ];
    }
]);
};

'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc provider
     * @name scrollInputIntoViewProvider
     * @module huiInputFocusScroll
     *
     * @description
     * scrollInputIntoView service provider
     */
    ngModule.provider('scrollInputIntoView', [
        function () {
            var _this = this;

            _this.defaults = {
                headerHeight: 50,
                footerHeight: 50
            };

            _this.setDefaults = function (newDefaults) {
                _this.defaults = angular.extend(_this.defaults, newDefaults);
            };

            /**
             * @ngdoc service
             * @name scrollInputIntoView
             * @module huiInputFocusScroll
             *
             * @require $window
             *
             * @description
             * Methods for scrollInputIntoView
             *
             */
            _this.$get = [
                '$window',
                function ($window) {

                    var self = this;

                    self.setDefaults({
                        innerHeight: $window.innerHeight
                    });

                    /**
                     * @ngdoc function
                     * @name findPos
                     * @param {object} obj
                     * A DOM node.
                     *
                     * @description
                     * Finds the distance between the top of the
                     * document and the DOM node. Note that it reports
                     * the distance between the DOM node and the
                     * element the directive is bound to correctly,
                     * where jQuery#offset does not.
                     *
                     * @returns {number}
                     * Distance in pixels from the top of the document.
                     * Contrast with rect, which reports dimensions
                     * relative to the viewport.
                     */
                    self.findPos = function (obj) {
                        var currentTop = 0;

                        if (obj.offsetParent) {
                            do {
                                currentTop += obj.offsetTop;
                            } while (obj = obj.offsetParent); // jshint ignore:line
                        }

                        return currentTop;
                    };

                    /**
                     * @ngdoc function
                     * @name isElementInViewPort
                     * @param {object} el
                     * A DOM element to check
                     *
                     * @description
                     * A function that determines if a given DOM
                     * element is in the viewport (only checks the top
                     * and bottom edges).  Elements that are hanging
                     * off the edge are considered to be out of the
                     * viewport.
                     *
                     * @returns {boolean}
                     * Is the element completely in the viewport?
                     */
                    self.isElementFullyVisible = function (el) {

                        var rect = el.parentElement.getBoundingClientRect();

                        // Top Edge Case
                        if (rect.top > 0 && rect.top < self.defaults.headerHeight) {
                            return false;

                        // Bottom Edge Case
                        } else if (rect.bottom > self.defaults.innerHeight - self.defaults.footerHeight &&
                                   rect.bottom < self.defaults.innerHeight) {
                            return false;
                        // Is the element completely between the
                        // header and footer?
                        } else if ((rect.top > self.defaults.headerHeight &&
                                    rect.bottom > self.defaults.headerHeight) &&
                                   (rect.top < self.defaults.innerHeight - self.defaults.footerHeight &&
                                    rect.bottom < self.defaults.innerHeight - self.defaults.footerHeight)) {
                            return true;
                        // All other cases
                        } else {
                            return false;
                        }
                    };

                    /**
                     * @ngdoc function
                     * @name scrollInputIntoView
                     * @param {object} scrollableElement
                     * An object in the DOM.
                     *
                     * @description
                     * A function that determines if it is necessary
                     * to change the scrollableElement's scrollTop
                     * property in order to show the selected input
                     * field.
                     */
                    self.scroll = function (scrollableElement) {

                        var activeElement = $window.document.activeElement,
                            distanceFromTop,
                            scrollToHere,
                            rect;

                        /**
                         * Check to see what activeElement's tagname is.
                         * If it is 'INPUT' and isElementFullyVisible()
                         * returns false, keep going.
                         */
                        if (activeElement.tagName === 'INPUT' &&
                            !self.isElementFullyVisible(activeElement)) {

                            rect = activeElement.parentElement.getBoundingClientRect();

                            distanceFromTop = self.findPos(activeElement.parentElement);

                            /**
                             * If the given input is in the top
                             * half of the viewport, scroll to a
                             * few pixels above the label.
                             */
                            if (rect.bottom <  self.defaults.innerHeight / 2) {

                                scrollToHere = distanceFromTop -
                                               self.defaults.headerHeight -
                                               32;

                           /**
                            * Otherwise, scroll to 16 pixels below
                            * the input's bottom border.
                            */
                            } else {

                                scrollToHere = distanceFromTop +
                                               activeElement.parentElement.clientHeight +
                                               self.defaults.headerHeight -
                                               self.defaults.innerHeight +
                                               16;

                            }

                            scrollableElement.scrollTop(scrollToHere);

                        }

                    };
                    return self;
                }
            ];
        }
    ]);
};

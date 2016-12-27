'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name contentCarouselUtility
     * @module huiContentCarousel
     * @restrict E
     *
     * @description
     * The content carousel directive creates and handles carousel for any HTML content.
     * The directive expects a `slides` array containing the data used to populate the carousel and
     * a `carousel-gallery` that will act as the element tag of the directive that will reside
     * within the carousel directive.
     *
     * @param carouselGallery {string} The element tag of the directive to be populated inside the carousel.
     The 'child' directive should be restricted to an `E` (element-only).
     * @param slides {array} Contains the data for the carousel content. It is recommended that this be
     an array of objects.
     * @param noWrap {expression} Evaluates as boolean that determines whether or not infinite loop swiping
     is allowed. Defaults to `false` which allows cyclic swiping.
     * @param active {string} The index of the slide at which the carousel should start.
     *
     * @requires $compile
     * @requires _
     *
     * @example
     * <content-carousel-utility data-slides="myCtrl.myData"
     *     data-carousel-gallery="carousel-demo" data-no-wrap="true" active="2">
     * </content-carousel-utility>
     */

    ngModule.directive('contentCarouselUtility', [
        '$compile',
        '_',
        function ($compile, _) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    carouselGallery: '@',
                    slides: '=',
                    noWrap: '=',
                    active: '@'
                },
                compile: function () {
                    return {
                        pre: function (scope, element) {
                            var self = scope, carouselEl, slideEl, contentEl, repeatAttr;

                            // Set up the main carousel element
                            carouselEl = angular.element('<div uib-carousel></div>');
                            // Set attribute `no-wrap` for cyclic swiping of the carousel.
                            // `no-wrap=true` does not wrap the carousel slides and prevents cyclic swiping.
                            // Set attribute active for the index of first active slide.
                            // It defaults to 0 if `self.active` is not provided.
                            carouselEl.attr({
                                'no-wrap': self.noWrap === true,
                                active: (_.isUndefined(self.active)) ? 0 : self.active
                            });

                            // Set up the individual slide element.
                            // This element will be "ng-repeated" for the given data.
                            slideEl = angular.element('<div uib-slide></div>');
                            repeatAttr = 'slide in slides track by $index';
                            slideEl.attr({
                                'ng-repeat': repeatAttr,
                                index: '$index'
                            });

                            // Set up the element for the dirctive created for the custom content
                            contentEl = angular.element('<' + self.carouselGallery + '>');
                            contentEl.attr({
                                slide: 'slide',
                                index: '$index',
                                class: 'slide-content'
                            });

                            // Append the elements to the `carouselEl`, compile it and add it to the `$element`
                            carouselEl.append(slideEl.append(contentEl));
                            $compile(carouselEl)(scope);
                            element.append(carouselEl);
                        }
                    };
                }
            };
        }
    ]);
};

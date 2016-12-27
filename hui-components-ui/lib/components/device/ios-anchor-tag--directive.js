'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name ngHref
     * @module huiDetails
     * @restrict E
     *
     * @description
     * Displays CTA for FRC properties that is usually shown in the place of the property lead form.
     *
     * @example
     *
     */
    ngModule.directive('a', function (userDevice, $location, $window) {
        return {
            restrict: 'E',
            priority: 1,
            link: function (scope, element, attrs) {
                var dragging,
                    externalUrl,
                    telephoneLink,
                    device = userDevice.get();

                // Adds event listeners for ios to fix double tap on anchor tags
                if (device.platform === 'ios' && typeof attrs.oldStackAnchor === 'undefined') {
                    externalUrl = new RegExp(/\/\//);
                    telephoneLink = new RegExp(/tel:/);
                    // If user is scrolling through page, set draggin true
                    element.on('touchmove', function () {
                        dragging = true;
                    });

                    // When user touches, set dragging to false till they begin to scroll
                    element.on('touchstart', function () {
                        dragging = false;
                    });

                    // If user is not scrolling on touch and clicks on a link, change location to href
                    element.on('touchend', function (event) {
                        if (dragging) {
                            return;
                        }

                        if (attrs.href) {
                            /* istanbul ignore else */
                            if (!externalUrl.test(attrs.href) && !telephoneLink.test(attrs.href) && !attrs.target) {
                                // If not external link, use location url
                                $location.url(attrs.href);
                                scope.$apply();
                            } else if (attrs.target && attrs.target === '_blank') {
                                $window.open.href = attrs.href;
                            } else {
                                $window.location.href = attrs.href;
                            }
                        }
                    });
                }
            }
        };
    });
};

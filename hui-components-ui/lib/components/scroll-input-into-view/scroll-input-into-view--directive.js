'use strict';

module.exports = function(ngModule) {

    /**
     * @ngdoc directive
     * @name scrollInputIntoView
     * @requires
     * $window, userDevice, scrollInputIntoView
     *
     * @restrict A
     * @description
     * A directive that binds to a scrollable element and listens for either a
     * resize or focusin event to fire.  When either event is heard, it calls
     * scrollInputIntoView, passing the scrollable element as an argument.
     */
    ngModule.directive('scrollInputIntoView', [
        'userDevice',
        'scrollInputIntoView',
        '$window',
        function(
            userDevice,
            scrollInputIntoView,
            $window
        ) {
            return {
                restrict: 'A',
                link: function(scope, element, attributes) {

                    var device = userDevice.get();

                    /**
                     * If the handset is running Android, listen for the resize
                     * event. Although Chrome supports the 'focusin' event, Firefox
                     * does not.
                     */
                    if (device.platform === 'android') {
                        element.on('resize', function () {
                            scrollInputIntoView.scroll(element);
                        });

                    /**
                     * If the handset is running iOS, listen for the focusin event.
                     */
                    } else if (device.platform === 'ios') {
                        element.on('focusin', function () {
                            scrollInputIntoView.scroll(element);
                        });
                    }
                }
            };
        }
    ]);
};

'use strict';

module.exports = function(ngModule) {

    ngModule
        /**
         * @ngdoc directive
         * @name waypoint
         * @module huiwaypoint
         * @restrict AE
         * @description
         * Directive that triggers its handler function when passed on page scroll.
         * Calls function defined in ref when waypoint is passed.
         *
         * @param {Function} ref - Reference to the function to be called by the waypoint
         *
         * @example
         * <waypoint data-ref="$root.globalNav.toggleHeader"></waypoint>
         */
        .directive('waypoint', [
            '$parse',
            '$timeout',
            function ($parse,
                      $timeout) {
                return {
                    restrict: 'AE',
                    link: function (scope, element, attrs) {
                        var waypoint,
                            parseRef = $parse(attrs.ref)(scope),
                            parseOffset = $parse(attrs.offset)(scope);

                        $timeout(/* istanbul ignore next: hard to test Waypoint setup */ function () {
                            waypoint = new Waypoint({ //jshint ignore:line
                                element: element[0],
                                handler: function(direction) {
                                    if (!$('body').hasClass('_lock--scroll')) {
                                        if (typeof parseRef === 'function') {
                                            parseRef(direction, waypoint);
                                        }
                                    }
                                }
                            });
                        }, 1000).then(/* istanbul ignore next: hard to test waypoint destroy */ function() {
                            scope.$on('$destroy', function() {
                                waypoint.destroy();
                            });
                        });
                    }
                };
            }
        ]);
};

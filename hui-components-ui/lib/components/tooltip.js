'use strict';

module.exports = function (ngModule) {


    ngModule.directive('tooltip', [
        function () {
            /**
             * @ngdoc directive
             *
             * @name  tooltip
             * @module  hui
             *
             *
             * @restrict A
             *
             * @description
             *
             * The `tooltip` directive ads a jQuery UI tooltip
             *
             * @example
             <example>
             <a tooltip heading="Title" text="This is more information about the destination of this link">Link</a>
             </example>
             */

            var directive = {
                restrict: 'A',
                scope: {
                    heading: '@',
                    text: '@'
                }
            };

            directive.link = function ($scope, element) {
                angular.element(element).tooltip({
                    content: function () {
                        var s = '';

                        if ($scope.heading) {
                            s = '<span class="title">' + $scope.heading + ':</span> ' + $scope.text;
                        } else {
                            s = $scope.text;
                        }

                        return s;
                    },
                    show: {
                        effect: 'fadeIn',
                        duration: 200,
                        easing: 'easeOutCirc'
                    }
                });
            };

            return directive;
        }
    ]);

};

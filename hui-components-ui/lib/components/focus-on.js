'use strict';

module.exports = function (ngModule) {


    ngModule.directive('focusOn', [
        '$timeout',
        '$parse',
        function ($timeout, $parse) {
            /**
             * @ngdoc directive
             *
             * @name  focusOn
             * @module  hui
             *
             *
             * @restrict A
             * @param {string} focusMe  The expression to watch on the scope.
             *
             * @description
             *
             * The `focusMe` directive will focus the element when the specified value is true.
             * http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
             *
             */

            var directive = {
                restrict: 'A'
                //scope: true,   // optionally create a child scope
            };

            directive.link = function (scope, element, attrs) {
                var model = $parse(attrs.focusOn);


                scope.$watch(model, function (value) {


                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            };

            return directive;
        }
    ]);
};

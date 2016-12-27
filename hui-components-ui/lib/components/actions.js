'use strict';

module.exports = function (ngModule) {
    ngModule.factory('hdcActionConfig',
        [
            function () {
                return {
                    defaultClass: 'action'
                };
            }
        ]);


    /**
     * @ngdoc directive
     *
     * @name  action
     * @module  hui
     *
     *
     * @restrict E
     *
     * @description
     *
     * The action directive creates an action "link"
     *
     * @element
     * @example
     <example>
     <action>
     </example>
     */
    ngModule.directive('action', [
        function () {
            var directive = {
                restrict: 'E',
                require: '^label',
                replace: true,
                scope: {
                    label: '@'
                },
                templateUrl: '/ui/templates/action.html'
            };

            directive.controller = function () {
            };
            return directive;

        }
    ]);

};




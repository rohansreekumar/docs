'use strict';

module.exports = function (ngModule) {
    /**
     * @ngdoc directive
     * @name bindHtmlCompile
     * @module huiBindHtml
     *
     * @requires $compile
     *
     * @description
     * Binds directives to the page when passed through scope.
     *
     */
    ngModule.directive('bindHtmlCompile', [
        '$compile',
        function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(function () {
                        return scope.$eval(attrs.bindHtmlCompile);
                    }, function (value) {
                        // Incase value is a TrustedValueHolderType, sometimes it
                        // needs to be explicitly called into a string in order to
                        // get the HTML string.
                        element.html(value && value.toString());
                        $compile(element.contents())(scope);
                    });
                }
            };
        }
    ]);
};

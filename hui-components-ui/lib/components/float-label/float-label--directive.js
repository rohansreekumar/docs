'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     *
     * @name  floatLabel
     * @module  hui
     *
     * @restrict A
     * @element form
     *
     * @description
     *
     * The `floatLabel` implements the [Float Label design pattern](http://bradfrost.com/blog/post/float-label-pattern/), floating placeholder label above active input fields
     *
     * @param {string} float-label Float label text
     *
     * @example
     <example>
     <form>
     <div float-label="Float Label">
     <input type="text"
     name="betterFieldModel"
     required
     placeholder="Float Label"
     data-ng-model="betterFieldModel">
     </div>
     <div float-label="Float Label on a Textarea">
     <textarea type="text"
     name="betterFieldModel2"
     placeholder="Float Label on a Textarea"
     data-ng-model="betterFieldModel2">
     </div>

     <div float-label="Float Label on a Select Element">
     <select data-ng-model="betterFieldModel3 name="betterFieldModel3">
     <option>Float Label on a Select Element</option>
     <option value="1">Option A </option>
     <option value="2">Option B </option>
     </select>
     </div>

     </form>
     </example>
     */

    ngModule.directive('floatLabel', [
        function () {

            var directive = {
                restrict: 'A',
                replace: true,
                transclude: true,
                templateUrl: '/ui/templates/float-label.html',
                require: '^form',
                scope: {
                    label: '@floatLabel'
                }
            };
            //http://aboutcode.net/2013/07/13/twitter-bootstrap-control-group-directive-for-angularjs.html

            directive.link = function (scope, element, attrs, formCtrl) {
                var labelExpression,
                    validExpression,
                    errorExpression,
                    inputName = element.find(':input').attr('name');

                // whether to add error class
                errorExpression = function () {
                    return scope.$parent[formCtrl.$name][inputName].$invalid && scope.$parent[formCtrl.$name][inputName].$touched;
                };
                // whether to add complete class
                validExpression = function () {
                    return scope.$parent[formCtrl.$name][inputName].$valid && scope.$parent[formCtrl.$name][inputName].$touched;
                };
                // whether to show label and add class
                labelExpression = function () {
                    return !!scope.$parent[formCtrl.$name][inputName].$viewValue;
                };

                // Watch the parent scope, because current scope is isolated.
                scope.$parent.$watch(errorExpression, function (isError) {
                    scope.isError = isError;
                });
                scope.$parent.$watch(validExpression, function (isValid) {
                    scope.isValid = isValid;
                });
                scope.$parent.$watch(labelExpression, function (isLabel) {
                    scope.showLabel = isLabel;
                });
            };


            return directive;
        }
    ]);
};

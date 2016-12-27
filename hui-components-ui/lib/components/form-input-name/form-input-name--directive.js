'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name formInputName
     * @module huiFormInputName
     * @requires ngModel
     * @restrict A
     *
     * @description
     * Validates a full name field
     *
     * @example
     * <form name="leadFormForm">
     *     <input name="name" ng-model="name" form-input-name type="text" />
     * </form>
     *
     */
    ngModule
        .directive('formInputName', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, el, attrs, ngModel) {

                    // two words
                    function validateName (modelValue) {

                        if (typeof modelValue !== 'string') {
                            return false;
                        }

                        return (modelValue.indexOf(' ') > -1);
                    }

                    // if no ngModel, don't do anything and don't freak out either.
                    if (!ngModel) {
                        return;
                    }

                    // append parsers
                    ngModel.$validators.fullName = function (modelValue, viewValue) {
                        return ngModel.$isEmpty(modelValue) || validateName(modelValue, viewValue);
                    };
                }
            };
        });
};

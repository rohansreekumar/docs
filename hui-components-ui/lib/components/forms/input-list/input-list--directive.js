'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc function
     * @name inputListDirectiveConfig
     * @module huiForms
     *
     * @description
     * Since all of the properties on the input list directives are similar, this creates a single source of config
     * properties to use between them.
     *
     * @param templateUrl Url of template for inputList
     * @param {string} formInputName Name for the form input
     * @param {object} formInputData The data for each item that is part of the list including restricted value criteria
     * @param {string=} formInputContext Required if values will be restricted. Watched for changes and passed to formInputData.restrictValue to give context to the decision to restrict values in the list.
     * @param {*} formInputModel The ngModel value to be updated
     * @param {boolean} splitFlag This is an optional parameter added for sortby functionality on SRP. This value determines if the directive has to split the filtered values to be displayed outside and inside a drop down.
     * @param {integer} splitSize This is an optional parameter added for sortby functionality on SRP. This value determines the number of values to be displayed outside the drop down.
     * @param {number} formInputRowLimit the number of columns to limit each row
     *
     * @returns input list directive config
     * ```
     * {
     *  restrict: string,
     *  replace: boolean,
     *  templateUrl: *,
     *  scope:
     *      {
     *          formInputName: string,
     *          formInputModel: string,
     *          formInputData: string,
     *          formInputContext: string
     *      },
     *      bindToController: boolean,
     *      controllerAs: string,
     *      controller: string
     * }
     * ```
     */
    function inputListDirectiveConfig (templateUrl) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: templateUrl,
            scope: {
                formInputName: '@',
                formInputModel: '=',
                formInputData: '=',
                formInputContext: '@',
                formInputTracking: '@',
                splitFlag: '=?',
                splitSize: '=?',
                formInputRowLimit: '='
            },
            bindToController: true,
            controllerAs: 'listCtrl',
            controller: 'InputListController'
        };
    }

    /**
     * @ngdoc directive
     * @name formInputCheckList
     * @module huiForms.formInputCheckList
     *
     * @description
     * Creates a check list form input. You can select one or more values from a list of values.
     *
     * @returns inputListDirectiveConfig with the passed in template URL as the template url property.
     *
     * @example
     * <form-input-radio-list
     *        class="form-select"
     *        data-form-input-name="order_by"
     *        data-form-input-data="listingSearchFilter.fieldData.order_by"
     *        data-form-input-context="filterCtrl.searchParams"
     *        data-form-input-model="filterCtrl.searchParams.order_by[0]"></form-input-radio-list>
     */
    ngModule.directive('formInputCheckList', [
        function () {

            return inputListDirectiveConfig('/templates/forms/form-input--check-list.html');
        }
    ]);
    /**
     * @ngdoc directive
     * @name formInputRadioList
     * @module huiForms.formInputRadioList
     *
     * @description
     * Creates a radio list form input. You can select one value from a list of values.
     *
     * @returns inputListDirectiveConfig with the passed in template URL as the template url property.
     *
     * @example
     * <form-input-check-list
     *     data-form-input-name="property_type"
     *     data-form-input-data="listingSearchFilter.fieldData.property_type"
     *     data-form-input-context="filterCtrl.searchParams"
     *     data-form-input-model="filterCtrl.searchParams.property_type"></form-input-check-list>
     */
    ngModule.directive('formInputRadioList', [
        function () {

            return inputListDirectiveConfig('/templates/forms/form-input--radio-list.html');

        }
    ]);

    ngModule.directive('formInputSelectList', [
        function () {

            return inputListDirectiveConfig('/templates/forms/form-input--select-list.html');
        }
    ]);

    /**
     * @ngdoc directive
     * @name huiForms.formInputList.forms.directive:formInputRadioSplitList
     * @restrict E
     *
     * @description
     * Creates a radio list form input along with a drop down. You can select one value which are present outside and also from a list of values inside the dropdown.
     *
     * @link huiForms.formInputList.forms.directive:formInputRadioSplitList
     *
     *
     * @returns inputListDirectiveConfig with the passed in template URL as the template url property.
     */

    ngModule.directive('formInputRadioSplitList', [
        function () {

            return inputListDirectiveConfig('/templates/forms/form-input--radio-split-list.html');
        }
    ]);

    /**
     * @ngdoc directive
     * @name huiForms.formInputList.forms.directive:formInputButtonMultiSelectList
     * @restrict E
     *
     * @description description
     *  Displays multi select form input list
     */

    ngModule.directive('formInputButtonMultiSelectList', [
        function () {

            return inputListDirectiveConfig('/templates/forms/form-input--button-multi-select-list.html');
        }
    ]);

    /**
     * @ngdoc directive
     * @name huiForms.formInputList.forms.directive:formInputButtonSingleSelectList
     * @restrict E
     *
     * @description description
     *  Displays single select form input list
     */

    ngModule.directive('formInputButtonSingleSelectList', [
        function () {

            return inputListDirectiveConfig('/templates/forms/form-input--button-single-select-list.html');
        }
    ]);
};

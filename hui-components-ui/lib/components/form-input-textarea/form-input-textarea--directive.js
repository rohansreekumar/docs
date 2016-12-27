'use strict';

module.exports = function (ngModule) {

    /*
     * @ngdoc controller
     * @name formInputTextareaController
     * @module formInputTextarea
     * @description
     * Performs operations on the form input text area directive.
     */
    ngModule.controller('formInputTextareaController',
        function () {
            var self = this;
            self.isEdit = false;

            /*
             * @ngdoc method
             * @name formInputTextareaController#toggleTextarea
             * @module formInputTextarea
             * @description
             * Keeps track of whether the textarea is open or not.
             */
            self.toggleTextarea = function () {
                self.isEdit = (self.isEdit ? false : true);
            };
        });

    /*
     * @ngdoc directive
     * @name formInputTextareaAutoFocus
     * @module formInputTextarea
     * @restrict A
     *
     * @example
     * <textarea
     *      rows="4"
     *      class="form-field details"
     *      data-form-input-textarea-auto-focus="boolean">
     *    </textarea>
     * @description
     * Gives focus to input element automatically upon activation/instantiation.
     */
    ngModule.directive('formInputTextareaAutoFocus', [
        '$parse',
        function (
            $parse
        ) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.formInputTextareaAutoFocus);
                    scope.$watch(model, function (value) {
                        if (value === true) {
                            element[0].focus();
                        }
                    });
                }
            };
        }
    ]);

    /*
     * @ngdoc directive
     * @name formInputTextarea
     * @module formInputTextarea
     * @restrict E
     *
     * @example
     * <form name="leadForm" ng-submit="detailsCtrl.leadForm.submit()">
     *  <div data-float-label="Full Name">
     *    <input
     *             tabindex="1"
     *             name="fullName"
     *             placeholder="Full Name"
     *             data-ng-model="detailsCtrl.leadForm.params.fullName">
     *         </div>
     *        <form-input-textarea
     *          form-input-model="detailsCtrl.leadForm.params.comments">
     *        </form-input-textarea>
     *      <button type="submit" class="button">Submit Lead</button>
     * </form>
     *
     * @params {object} - formInputModel - model that is bound to scope which represents the message
     * within the textarea.
     *
     * @description
     * Displays a textarea input that can be inserted into any form.
     */

    ngModule.directive('formInputTextarea',
        function () {
            return {
                restrict: 'E',
                replace: true,
                bindToController: {
                    formInputModel: '='
                },
                controller: 'formInputTextareaController',
                controllerAs: 'formInputTextCtrl',
                templateUrl: '/ui/templates/form-input-textarea.html',
                scope: {}
            };
        });
};

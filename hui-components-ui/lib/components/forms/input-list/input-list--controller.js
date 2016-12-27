'use strict';

/**
 * @ngdoc controller
 * @name InputListController
 * @module huiForms
 *
 * @requires $rootScope
 * @requires $scope
 *
 * @description
 * Controller for input lists.
 *
 */

module.exports = function (ngModule) {

    ngModule.controller('InputListController', [
        '$scope',
        '$rootScope',
        'inputList',
        '_',
        function (
            $scope,
            $rootScope,
            inputList,
            _
        ) {

            var self = this,
            getValueObject,
            valueLabel;

            self.multi = [];
            self.multi[0] = self.formInputData;

            /**
             * @ngdoc
             * @name InputListController#setSelectButton
             *
             * @description
             * Sets the default value to be displayed on the select button or
             * sets the value passed in the param.
             *
             * @param {string} value label to be displayed
             */
            self.setSelectButton = function (value) {
                // Get object of provided value
                getValueObject = _.where($scope.listCtrl.formInputData.values, {value: value});
                valueLabel = _.get(getValueObject[0], 'label', null);

                // Set button to value`s corresponding label or use default 'For Sale'
                return valueLabel || _.get(self, 'formInputData.values[0].label', null);
            };

            /**
             * @ngdoc
             * @name InputListController#setupMultiSettings
             *
             * @description
             * Sets the directive to use multi rows.
             *
             * @param {number} rowLimit label to be displayed
             */
            self.setupMultiSettings = function (rowLimit) {
                if (rowLimit) {
                    self.multiRows = true;
                    self.multi = _.chunk(self.formInputData.values, rowLimit);
                }
            };

            inputList.init($scope, self);
            self.setSelectButton();
            self.setupMultiSettings(self.formInputRowLimit);


        }
    ]);

};

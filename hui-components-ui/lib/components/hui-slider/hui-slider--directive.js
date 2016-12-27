'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name slider
     * @module huiSlider
     * @restrict AE
     * @description
     * Directive that provides the range slider
     *
     * @param
     *
     * @example
     * <slider slider-config="config"  on-change="updateResults"></slider>
     */
    ngModule.directive('slider', [
        function () {
            return {
                restrict: 'AE',
                controller: 'sliderController',
                controllerAs: 'sliderCtrl',
                scope: {
                    sliderConfig: '=',
                    sliderDisplayValue: '=',
                    newSliderValue: '=',
                    onChange: '&'
                },
                templateUrl: '/templates/hui-slider.html'
            };
        }
    ])
        /**
         * @ngdoc controller
         * @name sliderController
         * @module huiDetails
         * @description
         * Provides range slider control
         */
        .controller('sliderController', [
            '$scope',
            '$timeout',
            function (scope, $timeout) {
                $timeout(function () {
                    scope.sliderValue = scope.sliderConfig.defaultValue;
                    scope.min = scope.sliderConfig.min;
                    scope.max = scope.sliderConfig.max;
                    scope.steps = scope.sliderConfig.steps;
                    scope.step = scope.sliderConfig.step;
                });

                /**
                 * @ngdoc method
                 * @name sliderController#onSliderChange
                 * @description
                 * Binds method to be called on onChange event of the slider
                 *
                 * @param newValue {string} current value of the slider
                 * @param oldValue {string} last value of the slider
                 *
                 */
                scope.onSliderChange = function (newValue, oldValue) {
                    if (newValue !== oldValue && newValue >= scope.min && newValue <= scope.max) {
                        scope.onChange()(newValue, scope.sliderConfig.label);
                    } else if (newValue < scope.min) {
                        scope.onChange()(scope.min, scope.sliderConfig.label);
                    } else if (newValue > scope.max) {
                        scope.onChange()(scope.max, scope.sliderConfig.label);
                    }
                };

                /**
                 * @ngdoc method
                 * @name sliderController#setSliderValue
                 * @description
                 * Binds method to be called on value od scope#newSliderValue changed
                 *
                 * @param newValue {string} current value of the slider
                 * @param oldValue {string} last value of the slider
                 *
                 */
                scope.setSliderValue = function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        scope.sliderValue = newValue;
                    }
                };

                scope.$watch('sliderValue', scope.onSliderChange);
                scope.$watch('newSliderValue', scope.setSliderValue);
            }
        ]);
};

'use strict';

module.exports = function (ngModule) {
    /**
     * @ngdoc directive
     * @name wnSlider
     * @description
     * Provides slider html and functionality based on
     *
     * @param {value} ngModel
     * @param {string} min
     * @param {string} max
     * @param {Array} steps
     * @param {string} step
     *
     * @requires $document
     * @requires valueConverter
     * @requires lodash
     *
     * @example
     * *As attribute*
     *  <div wn-slider class="slider-wrapper" ng-model="sliderValue"  min="min" max="max" steps="steps"  step="step"></div>
     */
    ngModule.directive('wnSlider', [
        '$document',
        'valueConverter',
        '_',
        function ($document, valueConverter, _) {

            var template = '<div class="slider"><span class="slider-selected">' +
                '<span class="slider-pointer" tabindex="0"></span></span></div>';

            /**
             * Get the users mouse position.
             * If jQuery is included on the page before angular, the touch and
             * mouse events are wrapped within a jQuery object.
             * http://stackoverflow.com/questions/16674963/event-originalevent-jquery
             */
            function getEventXPosition(e) {
                if (e.pageX || (e.originalEvent && e.originalEvent.pageX)) {
                    return e.pageX || e.originalEvent.pageX;
                }

                if (e.touches && e.touches.item) {
                    return e.touches.item(0).pageX;
                } else if (e.originalEvent && e.originalEvent.touches) {
                    return e.originalEvent.touches[0].pageX;
                }
            }

            return {
                template: template,
                require: 'ngModel',
                restrict: 'EA',
                link: function ($scope, element, attributes) {
                    // Declare elements
                    var sliderElement = element.find('div'),
                        selected = angular.element(element.find('span')[0]),
                        updateModelOnAction = function (e) {
                            var percentage = 0,
                                xMin = 0,
                                xMax = 0,
                                xVal = 0;

                            xMin = sliderElement[0].getBoundingClientRect().left;
                            xMax = sliderElement[0].offsetWidth + xMin;
                            xVal = getEventXPosition(e);
                            percentage = valueConverter.valueToPercent(xMin, xMax, xVal);
                            $scope[attributes.ngModel] = valueConverter.percentToValue($scope[attributes.min], $scope[attributes.max], percentage, $scope[attributes.steps], $scope[attributes.step]);
                            $scope.$apply();
                        },
                        setSliderPercentage = function (percentage) {
                            selected.css('width', percentage + '%');
                        },
                        updateSlider = function (newVal, oldValue) {
                            var percentageToSet = 0;
                            newVal = parseFloat(newVal);

                            if (isNaN(newVal)) {
                                newVal = oldValue;
                            }

                            $scope[attributes.ngModel] = valueConverter.getValueWithinRange(newVal, $scope[attributes.max], $scope[attributes.min]);
                            percentageToSet = valueConverter.valueToPercent($scope[attributes.min], $scope[attributes.max], newVal, $scope[attributes.steps], $scope[attributes.step]);

                            setSliderPercentage(percentageToSet);
                        };

                    $scope.$watch(attributes.ngModel, updateSlider);

                    $scope.$watch(attributes.steps, function (newValue, oldValue) {
                        if (_.isArray($scope[attributes.steps])) {
                            $scope[attributes.min] = $scope[attributes.steps][0];
                            $scope[attributes.max] = $scope[attributes.steps][$scope[attributes.steps].length - 1];

                            valueConverter.calculateStepsPercentage($scope[attributes.steps]);
                        }
                    });

                    /**
                     * Update the min value only if it doesn't exceed the max
                     */
                    $scope.$watch(attributes.min, function (newValue, oldValue) {
                        if (newValue > $scope[attributes.max]) {
                            $scope[attributes.min] = oldValue;
                        } else {
                            updateSlider($scope[attributes.ngModel]);
                        }
                    });

                    /**
                     * Update the max value only if it doesn't drop below min
                     */
                    $scope.$watch(attributes.max, function (newValue, oldValue) {
                        if (newValue < $scope[attributes.min]) {
                            $scope[attributes.max] = oldValue;
                        } else {
                            updateSlider($scope[attributes.ngModel]);
                        }
                    });

                    // Bind events for touch/mouse
                    sliderElement.on('mousedown touchstart', function (e) {
                        // Prevent ghostclick (mousedown/click firing after touchstart)
                        e.preventDefault();

                        // Move the pointer straight away
                        updateModelOnAction(e);

                        /*
                         *	Bind to the document so that the drag+drop remains whilst
                         * the user has clicked the handle, but not yet released it.
                         */
                        $document.on('mousemove touchmove', function (e) {
                            // prevent other events firing whilst interacting with the slider
                            e.preventDefault();
                            updateModelOnAction(e);
                        });

                    });

                    // Remove touch/mouse move events when we release the pointer
                    $document.on('mouseup touchend', function (e) {
                        $document.off('mousemove touchmove');
                    });

                }
            };
        }
    ]);
};

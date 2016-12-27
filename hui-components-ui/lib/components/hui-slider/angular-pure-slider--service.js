'use strict';

module.exports = function (ngModule) {
    /**
    * @ngdoc service
    * @name valueConverter
    * @module angular-pure-slider.value-converter
    *
    * @requires _
    *
    * @description
    * Used for converting values between percent and value of slider
    *
    */
    ngModule.service('valueConverter', [
        '_',
        function (_) {
            var valueConverter = {},
                stepsPercentage = [];

            /**
            * @ngdoc method
            * @name valueToPercent
            * @description
            * Converts a value to a percentage based on min/max
            *
            * @param min {integer} minimum value of slider
            * @param max {integer} maximum of the slider
            * @param value {integer} value of the slider
            * @param steps {Array} array of the slider
            * @param step {integer} step of the slider
            *
            * @return Int
            *   The percentage based on the provided values.
            */
            valueConverter.valueToPercent = function (min, max, value, steps, step) {
                var index = 0,
                    percentageToSet = 0;

                if (steps) {
                    index = steps.indexOf(valueConverter.closestValue(value, steps));
                    percentageToSet = stepsPercentage[index];
                } else {
                    percentageToSet = (value - min) / (max - min) * 100;
                    percentageToSet = valueConverter.round(percentageToSet, 100 / (max - min) * (step || 1), min);
                }
                return valueConverter.getValueWithinRange(percentageToSet, 100, 0);
            };


            /**
            * @ngdoc method
            * @name percentToValue
            * @description
            * Converts a percent to a value based on min/max
            *
            * @param min {integer} minimum value of slider
            * @param max {integer} maximum of the slider
            * @param percent {integer} percentage of the slider
            * @param steps {Array} steps of the slider
            * @param step {integer} step of the slider
            *
            * @return Int
            *   Converts a percent to a value based on a min/max
            */
            valueConverter.percentToValue = function (min, max, percent, steps, step) {
                var index;

                if (steps) {
                    index = stepsPercentage.indexOf(valueConverter.closestValue(percent, stepsPercentage));
                    return steps[index];
                } else {
                    return valueConverter.round(((max - min) * percent) / 100 + min, (step || 1), min);
                }
            };

            /**
            * @ngdoc method
            * @name calculateStepsPercentage
            * @description
            * calculate percentage for respective steps
            *
            * @param steps {Array} value of the slider
            *
            * @return Int
            *   returns mapping between steps and percentages
            */
            valueConverter.calculateStepsPercentage = function (steps) {
                var min = _.min(steps),
                    max = _.max(steps);

                if (_.isArray(steps)) {
                    stepsPercentage = steps.map(function (step) {
                        return Math.min(Math.round(100 * step / (max - min)), 100);
                    });
                }
                return stepsPercentage;
            };

            /**
            * @ngdoc method
            * @name round
            * @description
            * round the provided value based on step and min
            *
            * @param value {Integer} value of the slider
            * @param step {Integer} step of the slider
            * @param min {Interger} minimum value of the slider
            *
            * @return Int
            *   round the provided value based on step and min
            */
            valueConverter.round = function (value, step, min) {
                return Math.ceil((value - min) / step) * (step * 100) / 100 + min;
            };

            /**
            * @ngdoc method
            * @name closestValue
            * @description
            * calculates closest value based on value and array
            *
            * @param value {Integer} value of the slider
            * @param array {Array} slider values
            *
            * @return Int
            *   returns round the provided value based on step and min
            */
            valueConverter.closestValue = function (value, array) {
                var val = 0,
                    closest = array[0],
                    newdiff,
                    diff = Math.abs(value - closest);
                for (val = 0; val < array.length; val++) {
                    newdiff = Math.abs(value - array[val]);
                    if (newdiff < diff) {
                        diff = newdiff;
                        closest = array[val];
                    }
                }
                return closest;
            };

            /**
            * @ngdoc method
            * @name getValueWithinRange
            * @description
            * calculates value with in range of min and max
            *
            * @param value {Integer} value of the slider
            * @param max {Integer} maximum value of slider
            * @param min {Integer} minimum value of slider
            *
            * @return Int
            *   returns value with in range of min and max
            */
            valueConverter.getValueWithinRange = function (value, max, min) {
                value = Math.min(value, max);
                value = Math.max(value, min);
                return value;
            };

            return valueConverter;
        }
    ]);
};

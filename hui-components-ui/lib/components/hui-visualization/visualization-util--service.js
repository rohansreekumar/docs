'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc service
     * @name visualizationUtil
     * @module huiVisualization
     *
     *
     * @description
     * visulaizationUtil service  provides
     * getPalette method - pallete should provide the correct color in the correct order
     * getGrid method for common axis generation
     *    x axis should generate max, min and optionally middle value for a d3 chart from given data
     *    y axis should generate a max, min value from given data
     *
     **/
    ngModule.service('visualizationUtil', [
        'd3Utils',
        '_',
        function (
            d3Utils,
            _
        ) {

            var _this = this,
                chartScale = {},
                formatter = {};
            _this.d3 = d3Utils.d3;

            /**
             * @ngdoc method
             * @name getPalette
             * @returns {array} colorSet - array of colors in defined order
             *
             * @description
             * Returns pallete color in the correct order.
             *
             */
            _this.getPalette = function () {
                var colorSet = [
                    '#f7841b',
                    '#092e4f',
                    '#7fa9cf',
                    '#aec3d7',
                    '#dde9f3'
                ];
                return colorSet;
            };

            /**
             * @ngdoc method
             * @name stripWhiteSpace
             * @param {string} value - string with white spaces
             * @returns {string} value - string after triming white-spaces
             *
             * @description
             * Returns string without white-spaces
             *
             */
            function stripWhiteSpace(value) {
                return value.replace(/ /g, '');
            }

            /**
             * @ngdoc method
             * @name getMinValue
             * @param {array} dataSet - input as a array of data with time and price values
             * @param {int} index - index value of the given data set
             * @param {boolean} isDateObject - checks for date object
             * @returns {int} value - max value from the given data set
             *
             * @description
             * Returns max value for the given data set
             *
             */
            function getMaxValue(dataArray, index, isDateObject) {
                var i, value, values = [];
                for (i = 0; i < dataArray.length; i++) {
                    value = !isDateObject ? dataArray[i][index] : new Date(stripWhiteSpace(dataArray[i][index])).valueOf();
                    values.push(Math.ceil(parseFloat(value)));
                }

                values.sort(function (a, b) {
                    return a - b;
                });

                return values[values.length - 1];
            }

            /**
             * @ngdoc method
             * @name getMinValue
             * @param {array} dataSet - input as a array of data with time and price values
             * @param {int} index - index value of the given data set
             * @param {boolean} isDateObject - checks for date object
             * @returns {int} value - min value from the given data set
             *
             * @description
             * Returns min value for the given data set
             *
             */
            function getMinValue(dataArray, index, isDateObject) {
                var i, value, values = [];
                for (i = 0; i < dataArray.length; i++) {
                    value = !isDateObject ? dataArray[i][index] : new Date(stripWhiteSpace(dataArray[i][index])).valueOf();
                    values.push(Math.floor(parseFloat(value)));
                }

                values.sort(function (a, b) {
                    return a - b;
                });

                return values[0];
            }

            /**
             * @ngdoc method
             * @name getGrid
             * @param {array} dataSet - input as a array of data with time and price values
             * @returns {object} x, y - max, min value for x and y axis and optional mid value for d3 chart from given data set
             *
             * @description
             * getGrid method for common axis generation
             *    x axis should generate max, min and optionally middle value for a d3 chart from given data
             *    y axis should generate a max, min value from given data
             *
             */

            _this.getGrid = function (dataSet) {
                var xMin = getMinValue(dataSet, 0, true),
                    xMax = getMaxValue(dataSet, 0, true),
                    yMin = getMinValue(dataSet, 1),
                    yMax = getMaxValue(dataSet, 1);

                return {
                    x: {
                        min: xMin,
                        max: xMax
                    },
                    y: {
                        min: yMin,
                        max: yMax
                    }
                };
            };

            /**
             * @ngdoc method
             * @name chartScale#build
             *
             * @param {string} scaleType - type of d3 scale defalut value is 'linear'
             *
             * @return {object} sclae - d3 scale object.
             *
             * @description
             * Builds d3 scale
             *
             */
            chartScale.build = function (scaleType) {
                if (!scaleType || typeof chartScale[scaleType] !== 'function') {
                    scaleType = 'linear';
                }

                return new chartScale[scaleType]();
            };
            /**
             * @ngdoc method
             * @name chartScale#linear
             *
             * @return {object} d3 linear scale
             *
             * @description
             * Generates d3 linear scale.
             *
             */
            chartScale.linear = function () {
                return _this.d3.scale.linear();
            };
            /**
             * @ngdoc method
             * @name chartScale#ordinal
             *
             * @return {object} d3 ordinal scale
             *
             * @description
             * Generates d3 ordinal scale.
             *
             */
            chartScale.ordinal = function () {
                return _this.d3.scale.ordinal();
            };
            /**
             * @ngdoc method
             * @name chartScale#time
             *
             * @return {object} d3 time scale
             *
             * @description
             * Generates d3 time scale.
             *
             */
            chartScale.time = function () {
                return _this.d3.time.scale();
            };

            /**
             * @ngdoc method
             * @name formatter#build
             *
             * @param {string} format - format string accepts predefined formats (i.e. currency, number and monthYear) or any d3 format string.
             *
             * @return {object} format - d3 format object.
             *
             * @description
             * Builds d3 format object
             *
             */
            formatter.build = function (format) {
                if (!format) {
                    format = 'number';
                }

                if (typeof formatter[format] !== 'function') {
                    return _this.d3.format(format);
                }

                return new formatter[format]();
            };
            /**
             * @ngdoc method
             * @name formatter#number
             *
             * @return {object} d3 number format object
             *
             * @description
             * Generates d3 number format object.
             *
             */
            formatter.number = function () {
                return _this.d3.format(',');
            };
            /**
             * @ngdoc method
             * @name formatter#currency
             *
             * @return {object} d3 currency format object
             *
             * @description
             * Generates d3 currency format object.
             *
             */
            formatter.currency = function () {
                return _this.d3.format('$,');
            };
            /**
             * @ngdoc method
             * @name formatter#monthYear
             *
             * @return {object} d3 monthYear format object
             *
             * @description
             * Generates d3 monthYear format (i.e. mm/yy) object.
             *
             */
            formatter.monthYear = function () {
                return _this.dateToShow;
            };

            /*
            * @ngdoc method
            * @name dateToShow
            * @param {date} dt - date object
            *
            * @description
            * Sets the x axis tick values
            *
            */
            _this.dateToShow = function (dt) {
                var year = dt.getFullYear();
                year = year.toString().substr(2, 2);
                return ((dt.getMonth() + 1) + '/' + year);
            };
            /**
             * @ngdoc method
             * @name getAxis
             * @param {string} name - Name of the axis.
             * @returns {object} axis - d3 axis with given parameters.
             *
             * @description
             * getAxis method for common axis generation
             *
             */
            _this.getAxis = function (name, range, options) {
                var axis,
                    tickFormatter,
                    axisScale,
                    xDefaultOptions = {
                        scale: 'time',
                        ticks: 5,
                        orient: 'bottom'
                    },
                    yDefaultOptions = {
                        format: 'currency',
                        ticks: 4,
                        orient: 'left'
                    };

                if (!options) {
                    options = {};
                }

                _.extend(options, (name.toLowerCase() === 'x' ? xDefaultOptions : yDefaultOptions));

                tickFormatter = formatter.build(options.format);
                axisScale = chartScale.build(options.scale);
                if (range && Array.isArray(range)) {
                    axisScale.range(range);
                }

                axis = _this.d3.svg.axis()
                    .scale(axisScale)
                    .tickFormat(tickFormatter)
                    .ticks(options.ticks)
                    .orient(options.orient);

                return axis;
            };
        }
    ]);

};

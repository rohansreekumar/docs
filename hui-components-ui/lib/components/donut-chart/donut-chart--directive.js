'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name donutChart
     * @module donutChart
     * @requires d3Utils - provides access to d3 utilities.
     * @requires donutChartService - provides donut chart rendering utilities.
     * @requires lodash - provides access to array operations.
     *
     * @restrict AE
     * @description
     * Directive that creates a donut chart based on the data set provided
     * Utilizes d3 service to draw chart.
     *
     * @param chartConfig {object} configuration of the donut chart
     * @param chartInput {object} series input data
     * @param chartInterior {object} Provides data for interior text of donut chart.
     *
     * @example
     * <donut-chart data-chart-input="estimated_values"></donut-chart>
     */
    ngModule.directive('donutChart', [
        'd3Utils',
        'donutChartService',
        '_',
        function (d3Utils, donutChartService, _) {
            return {
                restrict: 'AE',
                scope: {
                    chartConfig: '=',
                    chartInput: '=',
                    chartInterior: '=',
                    refresh: '='
                },
                link: function (scope, element) {
                    var d3 = d3Utils.d3,
                        activeItem,
                        seriousCount,
                        baseValues = {
                            chartDiameter: 190,
                            donutWidth: 20
                        },
                        chartConfig = {
                            width: 400,
                            height: 190,
                            margin: { top: 10, right: 10, bottom: 10, left: 10 },
                            legend: { width: 160 },
                            commasFormatter: d3.format(',.0f'),
                            getDollars: function (value) {
                                return '$' + this.commasFormatter(value);
                            }
                        };

                    _.merge(chartConfig, scope.chartConfig, { rhythm: 20, legendLines: 2.5, donut: {} });

                    chartConfig.donut.diameter = Math.min(chartConfig.width - chartConfig.legend.width, chartConfig.height);
                    chartConfig.donut.width = Math.round(chartConfig.donut.diameter * baseValues.donutWidth / baseValues.chartDiameter);
                    chartConfig.donut.radius = 9 * chartConfig.donut.width / 2;
                    chartConfig.correctionBorder = chartConfig.donut.diameter - chartConfig.donut.radius * 2;

                    seriousCount = scope.chartInput.length;
                    /*
                     * @ngdoc method
                     * @name initSvgElements
                     *
                     * @description
                     * Intialize svg elements
                     *
                     */
                    scope.initSvgElements = function () {
                        var legendItem;

                        donutChartService.createCanvas(element[0], chartConfig);
                        donutChartService.renderChart(chartConfig, scope.chartInput);
                        legendItem = donutChartService.renderLegend(chartConfig, scope.chartInput);
                        donutChartService.renderInterior(chartConfig, scope.chartInterior);

                        legendItem
                            .on('click', /* istanbul ignore next: click event tested in service */ function (data) {
                                donutChartService.Legend.onCLick(activeItem, data);
                            })
                            .on('mouseover', /* istanbul ignore next: mouseover event tested in service */ function (data) {
                                donutChartService.Legend.onMouseOver(data);
                            })
                            .on('mouseout', /* istanbul ignore next: mouseout event tested in service */ function () {
                                donutChartService.Legend.onMouseOut(activeItem);
                            });
                    };
                    /*
                     * @ngdoc method
                     * @name init
                     *
                     * @description
                     * Generate series data and draw the line chart
                     *
                     */
                    scope.init = function () {
                        //Draw donut chart
                        scope.initSvgElements();
                    };

                    //init chart
                    scope.init();

                    scope.$watch('refresh', function () {
                        donutChartService.updateChart(scope.chartInput, scope.chartInterior);
                    });
                }
            };
        }
    ]);
};

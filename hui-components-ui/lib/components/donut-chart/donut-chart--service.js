'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc service
     * @name donutChartService
     * @module huiDonutChart
     *
     * @requires d3Utils
     * @requires visualizationUtil
     *
     * @description
     * Provides donut chart rendering utilities.
     *
     */
    ngModule.service('donutChartService', [
        'd3Utils',
        'visualizationUtil',
        function (d3Utils, visualizationUtil) {

            var service = this;
            service.d3 = d3Utils.d3;
            service.chartConfig = {};
            service.seriousCount = 0;

            /**
             * @ngdoc method
             * @name createCanvas
             *
             * @description
             * creates canvas with size mentioned in config object.
             *
             * @param {object} element Angular dom element.
             * @param {object} chartConfig chart configaration.
             *
             */
            service.createCanvas = function (element, chartConfig) {
                service.chartConfig = chartConfig;
                service.parentElement = element;

                service.chartCanvas = service.d3
                    .select(service.parentElement)
                    .append('svg')
                    .attr('class', 'donut-chart-canvas')
                    .attr('width', chartConfig.width)
                    .attr('height', chartConfig.height);

                return service.chartCanvas;
            };
            /**
             * @ngdoc method
             * @name renderChart
             *
             * @description
             * Renders donut chart on canvas.
             *
             * @param {object} chartConfig chart configaration.
             * @param {object} data chart data.
             *
             */
            service.renderChart = function (chartConfig, data) {
                var chartCanvas,
                    donutArc,
                    donutData;

                service.seriousCount = data.length;

                chartCanvas = service.d3.select(service.parentElement).select('svg');

                service.donutLayer = chartCanvas.append('g')
                    .attr('transform', 'translate(' +
                    (chartConfig.donut.radius + chartConfig.margin.left) + ',' +
                    (chartConfig.donut.radius + chartConfig.margin.top) + ')')
                    .attr('id', 'donutLayer');

                donutArc = service.d3.svg.arc()
                    .innerRadius(chartConfig.donut.radius - chartConfig.donut.width)
                    .outerRadius(chartConfig.donut.radius);

                donutData = service.d3.layout.pie()
                    .value(function (data) { return data.value; })
                    .sort(null);

                service.pathToDraw = service.donutLayer.selectAll('path')
                    .data(donutData(data));

                service.pathToDraw.enter()
                    .append('path')
                    .attr('d', donutArc)
                    .attr('fill', /* istanbul ignore next: callback function should be testd by d3 */ function (data, index) {
                        return visualizationUtil.getPalette()[data.data.colorIndex || index];
                    });
            };
            /**
             * @ngdoc method
             * @name calcFontSize
             *
             * @description
             * Calculate font size to fit in the given radius.
             *
             * @param {object} element text element.
             * @param {number} radius in whihc text need to be fit.
             * @param {rhythm} rhythm is base size for text.
             * @param {maxSize} maxSize is maximum font size.
             *
             */
            service.calcFontSize = function (element, radius, rhythm, maxSize) {
                var fontSize = Math.min(2 * radius, (2 * radius) / element.getComputedTextLength() * rhythm);
                return Math.min(maxSize, fontSize) + 'px';
            };
            /**
             * @ngdoc method
             * @name renderInterior
             *
             * @description
             * Renders Interior content of the donut chart.
             *
             * @param {object} chartConfig chart configaration.
             * @param {object} data chart data.
             *
             */
            service.renderInterior = function (chartConfig, data) {
                var chartCanvas;

                if (!data) { return; }

                service.chartConfig = chartConfig;

                chartCanvas = service.d3.select(service.parentElement).select('svg');

                // Position interior label and value
                service.interiorArea = chartCanvas.append('g')
                    .attr('class', 'interior')
                    .attr('fill', '#cccccc')
                    .attr('text-anchor', 'middle')
                    .attr('width', chartConfig.width * 7)
                    .attr('height', chartConfig.rhythm * 3.25)
                    .attr('transform', 'translate(' +
                    (chartConfig.donut.radius + chartConfig.margin.left) + ',' +
                    (chartConfig.donut.width * 4 + chartConfig.margin.top) + ')');

                service.interiorArea.append('g')
                    .append('text')
                    .text(data.title)
                    .attr('class', 'label')
                    .style('font-size', /* istanbul ignore next: callback function should be testd by d3 */ function () {
                        return service.calcFontSize(this, chartConfig.donut.radius, chartConfig.rhythm, 12);
                    })
                    .attr('id', 'interior-label');

                service.interiorArea.append('g')
                    .append('text')
                    .text(data.text)
                    .attr('class', 'value')
                    .style('font-size', /* istanbul ignore next: callback function should be testd by d3 */ function () {
                        return service.calcFontSize(this, chartConfig.donut.radius, chartConfig.rhythm, 32);
                    })
                    .attr('id', 'interior-value')
                    .attr('dy', chartConfig.donut.width * 1.5);
            };
            /**
             * @ngdoc method
             * @name renderLegend
             *
             * @description
             * Renders Legend on canvas.
             *
             * @param {object} chartConfig chart configaration.
             * @param {object} data chart data.
             *
             */
            service.renderLegend = function (chartConfig, data) {

                var chartCanvas,
                    legend,
                    legendItem;

                chartCanvas = service.d3.select(service.parentElement).select('svg');

                // Position Legend
                service.legendArea = chartCanvas.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' +
                    (chartConfig.donut.radius * 2 + chartConfig.margin.left + 20) + ',' +
                    (chartConfig.margin.top + chartConfig.correctionBorder) + ')');

                legend = service.legendArea
                    .selectAll('g')
                    .data(data);

                legendItem = legend
                    .data(data)
                    .enter()
                    .append('g')
                    .attr('class', 'legend-item')
                    .style('fill', /* istanbul ignore next: callback function should be testd by d3 */ function (data, index) {
                        return visualizationUtil.getPalette()[data.colorIndex || index];
                    })
                    .attr('dy', chartConfig.rhythm * 0.25)
                    .attr('transform', service.Legend.calcOriginalPosition);

                legendItem.append('text')
                    .attr('class', '_label label')
                    .attr('font-size', 12)
                    .attr('transform', 'translate(30, 0)')
                    .text(/* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                        return data.label;
                    });

                legendItem.append('text')
                    .attr('class', '_value value')
                    .attr('font-size', 14)
                    .attr('dy', chartConfig.rhythm * 0.75)
                    .attr('transform', 'translate(30, 0)')
                    .text(/* istanbul ignore next: callback function should be testd by d3 */function (data) {
                        return chartConfig.getDollars(data.value);
                    });

                legendItem.append('circle')
                    .attr('r', 10)
                    .attr('cy', 2)
                    .attr('stroke', /* istanbul ignore next: callback function should be testd by d3 */ function (data, index) {
                        return visualizationUtil.getPalette()[data.colorIndex || index];
                    })
                    .attr('transform', 'translate(' + (20 - chartConfig.correctionBorder) + ',0)');

                return legendItem;
            };
            /**
             * @ngdoc object
             * @name Legend
             *
             * @description
             * Holds all Legend methods
             *
             */
            service.Legend = {};
            /**
             * @ngdoc method
             * @name Legend#onCLick
             *
             * @description
             * Legend click event
             *
             * @param {object} activeItem selected data item.
             * @param {object} data current data item.
             *
             */
            service.Legend.onCLick = function (activeItem, data) {
                if (service.Legend.activeItem === data) {
                    service.Legend.activeItem = null;
                } else {
                    service.Legend.activeItem = data;
                }

                service.setActiveFlag(service.Legend.activeItem);

                if (service.Legend.activeItem) {
                    service.Legend.setPositionForActive(service.Legend.activeItem);
                    service.donutArc.setPositionForActive(service.Legend.activeItem);
                } else {
                    service.Legend.resetPosition();
                    service.donutArc.resetPosition();
                }
            };
            /**
             * @ngdoc method
             * @name Legend#onMouseOver
             *
             * @description
             * Legend mouse over event.
             *
             * @param {object} activeItem selected data item.
             * @param {object} data current data item.
             *
             */
            service.Legend.onMouseOver = function (data) {
                service.setHoverFlag(data);

                if (service.Legend.activeItem !== data) {
                    service.Legend.applyHoverEffect(data);
                }
            };
            /**
             * @ngdoc method
             * @name Legend#onmouseOut
             *
             * @description
             * Legend mouse out event.
             *
             */
            service.Legend.onMouseOut = function () {
                service.setHoverFlag();
                service.Legend.applyHoverEffect(service.Legend.activeItem);
            };
            /**
             * @ngdoc method
             * @name Legend#changeLegendItem
             *
             * @param {object} chartCanvas chart canvas
             * @param {string} queryString query string to filter elements
             * @param {number} radius legend circle radius
             * @param {number} labelFontSize label font size
             * @param {number} valueFontSize value font size
             * @param {number} opacity opacity of the legend item
             *
             * @description
             * Changes visual apperiance for legend.
             *
             */
            service.Legend.applyVisualChanges = function (chartCanvas, queryString, radius, labelFontSize, valueFontSize, opacity) {

                if (opacity) {
                    chartCanvas
                        .selectAll(queryString)
                        .attr('opacity', opacity);
                }

                chartCanvas
                    .selectAll(queryString)
                    .select('circle')
                    .attr('r', radius);

                chartCanvas
                    .selectAll(queryString)
                    .select('.label')
                    .attr('font-size', labelFontSize);

                chartCanvas
                    .selectAll(queryString)
                    .select('.value')
                    .attr('font-size', valueFontSize);
            };
            /**
             * @ngdoc method
             * @name setFlagForElement
             *
             * @param {object} element element to set css class
             * @param {string} flag css class name used as flag
             * @param {object} selectedData  selected element data
             * @param {object} currentData current data element
             *
             * @description
             * Sets a flag to the selected element and reset on all other elements.
             *
             */
            service.setFlagForElement = function (element, flag, selectedData, currentData) {
                service.d3.select(element)
                    .classed(flag, (selectedData === currentData));
            };
            /**
             * @ngdoc method
             * @name Legend#calculateOriginalPosition
             *
             * @param {number} index index of legend
             *
             * @description
             * Calculates legend item original positions.
             *
             */
            service.Legend.calcOriginalPosition = function (data, index) {
                var y = 0;
                y = index * (service.chartConfig.legendLines - 0.25) * service.chartConfig.rhythm;

                return 'translate(0, ' + y + ')';
            };
            /**
             * @ngdoc method
             * @name Legend#resetPosition
             *
             * @description
             * Resets legend item positions.
             *
             */
            service.Legend.resetPosition = function () {
                var chartCanvas = service.d3.select(service.parentElement).select('svg');

                service.Legend.applyVisualChanges(chartCanvas, '.legend-item', 10, 12, 14, 1);

                chartCanvas
                    .selectAll('.legend-item')
                    .attr('transform', service.Legend.calcOriginalPosition);
            };
            /**
             * @ngdoc method
             * @name setActiveFlag
             *
             * @description
             * Sets active flag in css class for legend item and donut arc.
             *
             * @param {object} current item data where action performed.
             *
             */
            service.setActiveFlag = function (current) {
                var chartCanvas = service.d3.select(service.parentElement).select('svg'),
                    donutLayer = chartCanvas.select('#donutLayer');

                chartCanvas
                    .selectAll('.legend-item')
                    .each(/* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                        service.setFlagForElement(this, 'active', current, data);
                    });

                donutLayer
                    .selectAll('path')
                    .each(/* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                        service.setFlagForElement(this, 'active', current, data.data);
                    });
            };
            /**
             * @ngdoc method
             * @name setHoverFlag
             *
             * @description
             * Sets hover flag in css class for legend item and donut arc.
             *
             * @param {object} current item data where action performed.
             *
             */
            service.setHoverFlag = function (current) {
                var chartCanvas = service.d3.select(service.parentElement).select('svg'),
                    donutLayer = chartCanvas.select('#donutLayer');

                chartCanvas
                    .selectAll('.legend-item')
                    .attr('temp',  /* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                        service.setFlagForElement(this, 'hover', current, data);
                        return null;
                    });

                donutLayer
                    .selectAll('path')
                    .attr('temp', /* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                        service.setFlagForElement(this, 'hover', current, data.data);
                        return null;
                    });
            };
            /**
             * @ngdoc method
             * @name Legend#calculateActiveItemPosition
             *
             * @param {object} current current data object
             * @param {object} data selected data object
             * @param {number} index index of the legend item
             *
             * @description
             * Calculates selected legend item positions.
             *
             */
            service.Legend.calcActiveItemPosition = function (current, data, index) {
                var y = 0;
                if (current !== data) {
                    y = (service.chartConfig.height -
                        ((service.seriousCount - index - 1) *
                            (service.chartConfig.legendLines - 0.25) *
                            service.chartConfig.rhythm));
                }
                return 'translate(0, ' + y + ')';
            };
            /**
             * @ngdoc method
             * @name setPositionForActive
             *
             * @description
             * Reorder and reposition legend items when click on legend.
             *
             * @param {object} current item data where action performed.
             *
             */
            service.Legend.setPositionForActive = function (current) {
                var chartCanvas = service.d3.select(service.parentElement).select('svg');

                service.Legend.applyVisualChanges(chartCanvas, '.legend-item.active', 12.5, 14, 18, 1);

                chartCanvas
                    .selectAll('.legend-item.active')
                    .attr('transform', 'translate(0, 0)');

                service.Legend.applyVisualChanges(chartCanvas, '.legend-item:not(.active)', 10, 12, 14, 0.3);

                chartCanvas
                    .selectAll('.legend-item:not(.active)')
                    .attr('transform', /* istanbul ignore next: callback function should be testd by d3 */ function (data, index) {
                        return service.Legend.calcActiveItemPosition(current, data, index);
                    });
            };
            /**
             * @ngdoc method
             * @name Legend#applyHoverEffect
             *
             * @description
             * Apply hover effect to legend items.
             *
             * @param {object} activeItem selected data item.
             * @param {object} data current data item.
             *
             */
            service.Legend.applyHoverEffect = function (data) {
                var chartCanvas = service.d3.select(service.parentElement).select('svg'),
                    setOpacity = true;

                chartCanvas.select('.legend-item.active')
                    .attr('temp', /* istanbul ignore next: callback function should be testd by d3 */ function () {
                        setOpacity = false;
                    });

                service.applyHoverEffect(setOpacity, data);
            };
            /**
             * @ngdoc method
             * @name applyHoverEffect
             *
             * @description
             * Apply hover effect to legend items.
             *
             * @param {object} setOpacity flag to set opacity or not.
             * @param {object} data current data item.
             *
             */
            service.applyHoverEffect = function (setOpacity, data) {
                var chartCanvas = service.d3.select(service.parentElement).select('svg');

                service.Legend.applyVisualChanges(chartCanvas, '.legend-item.hover:not(.active)', 12.5, 14, 18, setOpacity ? 1 : false);
                service.Legend.applyVisualChanges(chartCanvas, '.legend-item:not(.hover):not(.active)', 10, 12, 14, setOpacity ? ((data) ? 0.5 : 1) : false);

                if (setOpacity) {
                    chartCanvas
                        .selectAll('path.hover')
                        .attr('opacity', 1);

                    chartCanvas
                        .selectAll('path:not(.hover)')
                        .attr('opacity', (data) ? 0.5 : 1);
                }
            };
            /**
             * @ngdoc object
             * @name donutArc
             *
             * @description
             * Holds all donut methods
             *
             */
            service.donutArc = {};
            service.donutArc.nextStartAngle = 0;
            /**
             * @ngdoc method
             * @name donutArc#resetPosition
             *
             * @description
             * Moves donut arcs to original positions.
             *
             */
            service.donutArc.resetPosition = function () {
                var chartCanvas = service.d3.select(service.parentElement).select('svg');

                service.d3
                    .select(service.parentElement)
                    .selectAll('path')
                    .attr('opacity', 1)
                    .attr('d', service.donutArc.getArc);

            };
            /**
             * @ngdoc method
             * @name donutArc#getArc
             *
             * @description
             * Build arc with start and end points to order arcs by selection.
             *
             * @param {object} data current data item.
             *
             */
            service.donutArc.getArc = function (data) {
                var redrawArc,
                    startAngle = service.donutArc.nextStartAngle,
                    endAngle = startAngle + data.endAngle - data.startAngle;
                service.donutArc.nextStartAngle = endAngle;
                redrawArc = service.d3.svg.arc()
                    .innerRadius(service.chartConfig.donut.radius - service.chartConfig.donut.width)
                    .outerRadius(service.chartConfig.donut.radius);

                return redrawArc.endAngle(endAngle).startAngle(startAngle)();
            };
            /**
             * @ngdoc method
             * @name donutArc#setPositionForActive
             *
             * @description
             * Sets position of active donut arc.
             *
             */
            service.donutArc.setPositionForActive = function () {
                var chartCanvas = service.d3.select(service.parentElement).select('svg');

                service.d3
                    .select(service.parentElement)
                    .selectAll('path.active')
                    .attr('opacity', 1)
                    .attr('d', service.donutArc.getArc);

                service.d3
                    .select(service.parentElement)
                    .selectAll('path:not(.active)')
                    .attr('opacity', 0.3)
                    .attr('d', service.donutArc.getArc);
            };
            /**
             * @ngdoc method
             * @name updateChart
             *
             * @param data {object} data to show on chart
             * @param interiorData {object} text whihc displays inside donut chart
             *
             * @description
             * Update chart with new values.
             *
             */
            service.updateChart = function (data, interiorData) {

                var pieDataNew,
                    path,
                    legend;

                pieDataNew = service.d3.layout.pie()
                    .value(function (data) { return data.value; })
                    .sort(null);

                path = service.donutLayer.selectAll('path')
                    .data(pieDataNew(data));

                legend = service.legendArea
                    .selectAll('g')
                    .data(data);

                legend.selectAll('._label')
                    .text(/* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                        return data.label;
                    });

                path.enter().append('path');

                path.attr('d', service.donutArc.getArc)
                    .attr('fill', /* istanbul ignore next: callback function should be testd by d3 */ function (data, index) {
                        return visualizationUtil.getPalette()[index];
                    });

                legend.selectAll('._value').text(/* istanbul ignore next: callback function should be testd by d3 */ function (data) {
                    return service.chartConfig.getDollars(data.value);
                });

                service.chartCanvas
                    .select('g.interior')
                    .selectAll('g')
                    .selectAll('text.value')
                    .style('font-size', 32)
                    .text(interiorData.text)
                    .style('font-size', /* istanbul ignore next: callback function should be testd by d3 */ function () {
                        return service.calcFontSize(this, service.chartConfig.donut.radius, service.chartConfig.rhythm, 32);
                    });

                path.exit().remove();
                legend.exit().remove();
            };
        }
    ]);
};

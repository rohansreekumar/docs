'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name huiLineGraph.directive:lineGraph
     *
     * @requires d3Utils - provides access to d3 utilities
     * @requires visualizationUtil - provides getPalette and getGrid method
     *
     * @restrict AE
     * @description
     * Directive that creates a line graph based on the data set provided
     * Utilizes d3 service and huiVisualization getPalette and getGrid method
     *
     *
     * @param graphInput {object} series input data
     * @param compactType {boolean} compact version
     *
     * @example
     * <line-graph data-graph-input="estimated_values" data-compact-type-values="hide_home_values></line-graph>
     */
    ngModule.directive('lineGraph', [
        'd3Utils',
        'visualizationUtil',
        function (d3Utils, visualizationUtil) {
            return {
                restrict: 'AE',
                scope: {
                    graphInput: '=',
                    compactType: '='
                },
                link: function (scope, element, attrs) {
                    var xScale,
                        yScale,
                        xAxis,
                        yAxis,
                        valueline,
                        svg,
                        tooltipDateFormat,
                        tooltipContainer,
                        toolTipDiv,
                        tooltipValueFormat,
                        activeLine = null,
                        maxX = null,
                        maxY = null,
                        minX = null,
                        minY = null,
                        hoverX,
                        hoverY,
                        hoverVert,
                        hoverHoriz,
                        hoverXRect,
                        hoverYRect,
                        dummyLayer,
                        linesToDraw = [],
                        d3 = d3Utils.d3,
                        isCompact = scope.compactType,
                        //set svg dimensions
                        margin = {
                            top: 30,
                            right: 20,
                            bottom: 70,
                            left: 20
                        },
                        width = (isCompact ? 380 : 680) - margin.left - margin.right,
                        height = 320 - margin.top - margin.bottom,
                        seriesData = scope.graphInput,
                        lineColors = visualizationUtil.getPalette(),
                        //parse date
                        parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ').parse;

                    //format tooltip date
                    tooltipDateFormat = d3.time.format('%m/%y');

                    tooltipValueFormat = d3.format(',');

                    /**
                     * @ngdoc method
                     * @name svgClicked
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * svg click handler
                     *
                     */
                    scope.svgClicked = function () {
                        hoverX.select('circle').classed({
                            'selected-vertex': false
                        });
                        hoverX.style({
                            display: 'none'
                        });
                        hoverY.style({
                            display: 'none'
                        });
                        tooltipContainer.classed({
                            'tooltip-cntnr-hover': false
                        });
                    };
                    /**
                     * @ngdoc method
                     * @name initSvgElements
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * Intialize svg elements
                     *
                     */
                    scope.initSvgElements = function () {
                        // Adds the svg canvas
                        svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width + margin.left + margin.right)
                            .attr('height', height + margin.top + margin.bottom)
                            .on('click', scope.svgClicked)
                            .on('touchend', scope.svgClicked)
                            .append('g')
                            .attr('transform',
                            'translate(' + margin.left + ',' + margin.top + ')');
                        scope.svg = svg;
                        //add tooltip container
                        tooltipContainer = d3.select(element[0]).append('div')
                            .classed({
                                'tooltip-container': true
                            });

                        toolTipDiv = tooltipContainer.append('div')
                            .attr('class', 'tooltip');

                        dummyLayer = svg.append('g').attr('id', 'dummyLayer');

                    };
                    /**
                     * @ngdoc method
                     * @name getElementLength
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @param {array} element data node for legend
                     *
                     * @description
                     * returns width for the legend to be added
                     *
                     * @returns {int} width - legend width
                     */
                    scope.getElementLength = function (element) {
                        var width,
                            movedElem;
                        dummyLayer.append(function () {
                            return element.node();
                        });
                        width = element.node().getBBox().width;
                        movedElem = element.remove();
                        svg.append(function () {
                            return element.node();
                        });
                        return width;
                    };
                    /**
                     * @ngdoc method
                     * @name setlegendParams
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * Sets the legend info and position
                     *
                     */
                    scope.setlegendParams = function () {
                        var index,
                            lineColor,
                            text,
                            textLength,
                            colorIdx = linesToDraw.length - 1,
                            circleArea = 10,
                            currentRightIndex = width;
                        for (index = linesToDraw.length - 1; index >= 0; index--) {
                            lineColor = lineColors[colorIdx--];
                            if (linesToDraw[index].d && linesToDraw[index].d.length > 0) {
                                text = svg.append('text').text(linesToDraw[index].legend.label);
                                textLength = scope.getElementLength(text);

                                text.attr('x', isCompact ? (currentRightIndex - textLength - width / 4) : currentRightIndex - circleArea - textLength)
                                    .attr('y', isCompact ? height + margin.bottom : 0)
                                    .attr('class', 'legend')
                                    .attr('transform', 'translate(0, -10)')
                                    // style the legend
                                    .style({
                                        fill: lineColor,
                                        'text-transform': 'capitalize',
                                        cursor: 'pointer',
                                        'margin-right': 20
                                    })
                                    .datum(linesToDraw[index].name)
                                    .on('click', scope.onLegendClick)
                                    .on('touchend', scope.onLegendClick);

                                svg.append('circle')
                                    .attr({
                                        cx: isCompact ? (currentRightIndex - textLength - width / 4) - 10 : currentRightIndex - circleArea - textLength - 10,
                                        cy: isCompact ? height + margin.bottom : 0,
                                        r: 5,
                                        transform: 'translate(0, -15)'
                                    })
                                    .style({
                                        fill: lineColor,
                                        cursor: 'pointer'
                                    })
                                    .datum(linesToDraw[index].name)
                                    .on('click', scope.onLegendClick)
                                    .on('touchend', scope.onLegendClick);
                                currentRightIndex -= textLength + circleArea + 20;
                            }
                        }
                    };
                    /**
                     * @ngdoc method
                     * @name appendHoverElements
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * Append all hover points to the svg
                     *
                     */
                    scope.appendHoverElements = function () {
                        hoverX = svg.append('g')
                            .classed('hover-x', true)
                            .style({
                                display: 'none',
                                fill: '#FFFFFF'
                            });
                        hoverXRect = hoverX.append('rect')
                            .attr({
                                x: isCompact ? '-5' : '-12',
                                y: isCompact ? '-25' : '-5',
                                width: '20',
                                height: '50',
                                rx: 5,
                                ry: 5,
                                transform: isCompact ? 'rotate(-90)' : ''
                            });
                        hoverX.append('text')
                            .attr({
                                x: '',
                                y: '',
                                dx: isCompact ? '' : '-20',
                                dy: isCompact ? '' : '3',
                                'text-anchor': 'middle',
                                transform: isCompact ? '' : 'rotate(-90)'
                            })
                            .style({
                                fill: '#FFFFFF',
                                'font-size': '12px'
                            });
                        hoverVert = hoverX.append('line').classed('hover-line', true);

                        hoverY = svg.append('g')
                            .classed('hover-y', true)
                            .style({
                                display: 'none',
                                fill: '#FFFFFF'
                            });
                        hoverYRect = hoverY.append('rect')
                            .attr({
                                x: '0',
                                y: '-12',
                                width: '70',
                                height: '20',
                                rx: 5,
                                ry: 5
                            });
                        hoverY.append('text')
                            .attr({
                                x: '',
                                y: '',
                                dx: '60',
                                dy: '3',
                                'text-anchor': 'end'
                            })
                            .style({
                                fill: '#FFFFFF',
                                'font-size': '12px'
                            });
                        hoverX.append('circle')
                            .attr('id', 'hoverCircle')
                            .attr('r', 5)
                            .style({
                                fill: 'transparent'
                            });
                        hoverHoriz = hoverY.append('line').classed('hover-line', true);
                        hoverHoriz.attr({
                            x1: xScale(minX),
                            x2: width + 10,
                            y1: 0,
                            y2: 0
                        });

                        hoverVert.attr({
                            x1: 0,
                            y1: yScale(maxY * 1.05),
                            y2: -height,
                            x2: 0
                        });
                    };
                    /**
                     * @ngdoc method
                     * @name findNearest
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @param {array} xMouse element data node
                     * @param [array] series array of data
                     *
                     * @description
                     * returns nearest node to be shown
                     *
                     * @returns {array} nearest - node array
                     */
                    scope.findNearest = function (xMouse, series) {

                        var nearest = null,
                            dx = Number.MAX_VALUE,
                            xData,
                            xDiff;

                        series.forEach(function (data) {

                            xData = new Date(data[0]);
                            xDiff = Math.abs(xMouse.getTime() - xData.getTime());

                            if (xDiff < dx) {
                                dx = xDiff;
                                nearest = data;
                            }
                        });

                        return nearest;
                    };
                    /**
                     * @ngdoc method
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @name onMouseMoveOnLine
                     * @param {string} lineColor - line color
                     * @param {array} arr - array of data
                     * @param {boolean} isLine - true if hovered series line else false
                     *
                     * @description
                     * generates data points and axis labels for hover event on line
                     *
                     */
                    scope.onMouseMoveOnLine = function (lineColor, arr) {
                        var mouseCoords = d3.mouse(svg.node()),
                            selectedNodeDate = xScale.invert(mouseCoords[0]),
                            nearestNode = scope.findNearest(selectedNodeDate, arr),
                            x = xScale(new Date(nearestNode[0])),
                            y = yScale(nearestNode[1]),
                            xData = new Date(nearestNode[0]),
                            yData = nearestNode[1];

                        hoverX.attr({
                            transform: 'translate(' + x + ', ' + height + ')'
                        })
                            .select('text').text(tooltipDateFormat(xData));
                        hoverY.attr({
                            transform: 'translate(' + -10 + ', ' + y + ')'
                        })
                            .select('text').text('$' + yData);
                        hoverX.select('circle')
                            .attr('cx', 0)
                            .attr('cy', -height + y)
                            .style({
                                fill: lineColor
                            });
                        hoverHoriz.attr({
                            x2: width + 10
                        });

                        hoverVert.attr({
                            y2: -height
                        });
                        hoverY.select('line').attr({
                            stroke: lineColor
                        });
                        hoverX.select('line').attr({
                            stroke: lineColor
                        });
                    };

                    /**
                     * @ngdoc method
                     * @name setChartParameters
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * sets the chart parameters
                     *
                     */
                    scope.setChartParameters = function () {
                        var i,
                            arrX = [],
                            arrY = [],
                            getParsedDate,
                            getYValue;

                        // Define the axes
                        //create and draw the x axis
                        xAxis = visualizationUtil.getAxis('x', [72, width], { format: 'monthYear' });
                        xScale = xAxis.scale();

                        //create and draw the y axis
                        yAxis = visualizationUtil.getAxis('y', [height - 15, 0])
                            .tickSize(0 - width);
                        yScale = yAxis.scale();

                        // Define the line
                        valueline = d3.svg.line()
                            .x(function (d) {
                                return xScale(parseDate(d[0]));
                            })
                            .y(function (d) {
                                return yScale(d[1]);
                            })
                            .interpolate('cardinal');

                        // set the domains.

                        getParsedDate = function (d) {
                            return parseDate(d['0']);
                        };

                        getYValue = function (d) {
                            return d['1'];
                        };
                        angular.forEach(seriesData, function (value, i) {
                            if (seriesData[i].data) {
                                Array.prototype.push.apply(arrX, seriesData[i].data.map(getParsedDate));
                                Array.prototype.push.apply(arrY, seriesData[i].data.map(getYValue));
                            }
                        });

                        maxX = new Date(Math.max.apply(null, arrX));
                        maxY = Math.max.apply(null, arrY);
                        minX = new Date(Math.min.apply(null, arrX));
                        minY = Math.min.apply(null, arrY);

                        xScale.domain([(minX), (maxX)]);
                        yScale.domain([minY, maxY * 1.05]); // adding 5% to the max for padding.

                    };
                    /**
                     * @ngdoc method
                     * @name removeVertex
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * Removes all selected vertex points
                     *
                     */
                    scope.removeVertex = function () {
                        hoverX.select('circle').classed({
                            'selected-vertex': false
                        });
                    };

                    /**
                     * @ngdoc method
                     * @name generateSvgLine
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @param {array } arr - array of input data, i, lineColor, key
                     * @param {int} i - index value
                     * @param {array} lineColor - array of colors to be rendered for line
                     * @param {string} key - series name
                     * @param {int} count - series count
                     *
                     * @description
                     * generates series line, data points and tooltip
                     *
                     */
                    scope.generateSvgLine = function (arr, i, lineColor, key, count) {
                        var onLegendClick,
                            vertexClassName = key.split(/\s+/g).join(''),
                            legendSpace = isCompact ? width / 4 : width / 6;
                        // Add the valueline path
                        svg.append('path')
                            .attr('class', 'line')
                            .attr('d', valueline(arr))
                            .attr('id', 'tag' + key)
                            .attr('stroke', lineColor)
                            .attr('fill', 'none')
                            .attr('cursor', 'pointer')
                            .on('mousemove', function () {
                                scope.onMouseMoveOnLine(lineColor, arr);
                            })
                            .on('mouseout', function () {
                                scope.hideHoverElements();
                            })
                            .on('mouseover', function () {
                                scope.showHoverElements(false, lineColor);
                            })
                            .on('click', function (d) {
                                var mouse = d3.mouse(this),
                                    mouseData = xScale.invert(mouse[0]),
                                    result = scope.findNearest(mouseData, arr),
                                    x = xScale(new Date(result[0])),
                                    y = yScale(result[1]),
                                    d3this = d3.select(this);

                                scope.onMouseMoveOnLine(lineColor, arr);
                                scope.showTooltip(result, x, y, key, lineColor, true, d3this);
                            })
                            .on('touchend', function (d) {
                                var mouse = d3.mouse(this),
                                    mouseData = xScale.invert(mouse[0]),
                                    result = scope.findNearest(mouseData, arr),
                                    x = xScale(new Date(result[0])),
                                    y = yScale(result[1]),
                                    d3this = d3.select(this);
                                scope.hideHoverElements();
                                scope.showHoverElements(this, lineColor);
                                scope.showTooltip(result, x, y, key, lineColor, true, d3this);
                            });

                        /**
                         * @ngdoc method
                         * @name hideHoverElements
                         * @methodOf huiLineGraph.directive:lineGraph
                         *
                         * @description
                         * Hide hover elements
                         *
                         */
                        scope.hideHoverElements = function () {
                            //if the node is selected, do not change its state.
                            if (hoverX.select('circle').classed('selected-vertex')) {
                                hoverX.style({
                                    display: 'null'
                                });
                                hoverY.style({
                                    display: 'null'
                                });
                            } else {
                                hoverX.style({
                                    display: 'none'
                                });
                                hoverY.style({
                                    display: 'none'
                                });
                            }
                        };
                        /**
                         * @ngdoc method
                         * @name showHoverElements
                         * @methodOf huiLineGraph.directive:lineGraph
                         *
                         * @param {object} _this - current element
                         * @param {string} lineColor - current line color
                         *
                         * @description
                         * show hover elements
                         *
                         */
                        scope.showHoverElements = function (_this, lineColor) {
                            // show the hovers
                            hoverX.style({
                                display: null
                            });
                            hoverY.style({
                                display: null
                            });

                            hoverXRect.attr({
                                fill: lineColor
                            });
                            hoverYRect.attr({
                                fill: lineColor
                            });
                            scope.onMouseMoveOnLine(lineColor, arr);
                        };
                        /**
                         * @ngdoc method
                         * @name showTooltip
                         * @methodOf huiLineGraph.directive:lineGraph
                         *
                         * @param {array} d - data array
                         * @param {int} cx - current x position
                         * @param {int} cy - current y position
                         * @param {string} key - current element id
                         * @param {string} lineColor - selected line color
                         * @param {boolean} isLine - true if line is clicked
                         * @param {object} d3this - current element
                         *
                         * @description
                         * Show tooltip on click event
                         *
                         */
                        scope.showTooltip = function (d, cx, cy, key, lineColor, isLine, d3this) {
                            // remove all selected vertices first.
                            scope.removeVertex();
                            scope.onLegendClick(key);
                            tooltipContainer.style({
                                left: (cx + (margin.left) + 5) + 'px',
                                top: (cy + margin.top) + 'px'
                            }).classed({
                                'tooltip-cntnr-hover': true
                            });
                            hoverHoriz.attr({
                                x2: cx
                            });

                            hoverVert.attr({
                                y2: -height + cy
                            });
                            hoverX.select('circle').classed({
                                'selected-vertex': true
                            }).style({
                                fill: lineColor
                            });
                            toolTipDiv
                                .html('<div>' +
                                '<span class="tooltip-key">' + key + '</span>' +
                                '</div>' +
                                '<div>' +
                                '<span class="tooltip-value"><sup>$</sup>' + tooltipValueFormat(d[1]) + '</span>' +
                                '</div>');

                            d3.event.stopPropagation();
                        };
                        /**
                         * @ngdoc method
                         * @name onLegendClick
                         * @methodOf huiLineGraph.directive:lineGraph
                         *
                         * @param {array} d - data array
                         *
                         * @description
                         * Highlights the corresponding line on the graph
                         *
                         */
                        scope.onLegendClick = function (d) {

                            var selectedWidth = 5,
                                uselectedWidth = 3;

                            if (d == activeLine) {
                                // toggle line unselect.
                                d3.select('#tag' + activeLine)
                                    .transition().duration(100)
                                    .style('stroke-width', uselectedWidth);

                                activeLine = null;
                                return;
                            }
                            // unselect activeLineNum
                            if (activeLine !== null) {
                                d3.select('#tag' + activeLine)
                                    .transition().duration(100)
                                    .style('stroke-width', uselectedWidth);

                                activeLine = null;
                            }
                            // select current line.
                            d3.select('#tag' + d)
                                .transition().duration(100)
                                .style('stroke-width', selectedWidth);

                            activeLine = d;
                        };
                    };

                    /**
                     * @ngdoc method
                     * @name drawLineChart
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * draw the line chart
                     *
                     */
                    scope.drawLineChart = function () {
                        var xTicks,
                            xTicksLength,
                            yDomain, yTicks,
                            xTickValues = [],
                            colorIdx = 0,
                            k,
                            xTickDiff,
                            xStep;
                        scope.initSvgElements();

                        scope.setChartParameters();

                        xTicks = xScale.ticks();
                        xTicksLength = xTicks.length;
                        xTickDiff = xTicks[xTicksLength - 1] - xTicks[0];
                        xStep = xTickDiff / 4;

                        Array.prototype.push.apply(xTickValues, (isCompact ? [
                            xTicks[0],
                            xTicks[
                            Math.floor(xTicksLength * 0.5)
                            ],
                            xTicks[xTicksLength - 1]
                        ] : [
                                xTicks[0],
                                new Date(xTicks[0].getTime() + xStep),
                                new Date(xTicks[0].getTime() + xStep * 2),
                                new Date(xTicks[0].getTime() + xStep * 3),
                                xTicks[
                                (xTicksLength - 1)
                                ]
                            ]));

                        xAxis.tickValues(xTickValues);

                        yDomain = yScale.domain();
                        yTicks = isCompact ? [yDomain[0], yDomain[1]] : d3.range(yDomain[0], yDomain[1] + 1, Math.floor((yDomain[1] - yDomain[0]) / 4));
                        yAxis.tickValues(yTicks);
                        // Add the X Axis
                        svg.append('g')
                            .attr('class', 'x axisX')
                            .attr('transform', 'translate(0,' + height + ')')
                            .call(xAxis)
                            .selectAll('text')
                            .style({
                                'text-anchor': isCompact ? 'middle' : 'end'
                            })
                            .attr({
                                dx: isCompact ? '' : '-0.8em',
                                dy: isCompact ? '' : '-0.8em',
                                transform: isCompact ? '' : 'rotate(-90)'
                            });

                        // Add the Y Axis
                        svg.append('g')
                            .attr('class', 'y axisY')
                            .call(yAxis);

                        svg.select('.axisY').selectAll('.tick')
                            .select('text').attr({
                                y: -10,
                                x: 0
                            })
                            .style({
                                'text-anchor': 'start'
                            });

                        scope.setlegendParams();
                        scope.appendHoverElements();

                        // draw the lines
                        linesToDraw.forEach(function (l2d) {
                            scope.generateSvgLine(l2d.d, colorIdx, lineColors[colorIdx++], l2d.name, linesToDraw.length);
                        });
                    };
                    /**
                     * @ngdoc method
                     * @name init
                     * @methodOf huiLineGraph.directive:lineGraph
                     *
                     * @description
                     * Generate series data and draw the line chart
                     *
                     */
                    scope.init = function () {
                        angular.forEach(seriesData, function (value, key) {
                            if (seriesData[key].data) {
                                linesToDraw.push({
                                    name: key,
                                    legend: seriesData[key].legend || { label: key },
                                    d: seriesData[key].data
                                });
                            }
                        });

                        linesToDraw.sort(function (a, b) {
                            return Math.max.apply(null, b.d.map(function (d) {
                                return d['1'];
                            })) - Math.max.apply(null, a.d.map(function (d) {
                                return d['1'];
                            }));
                        });

                        if (linesToDraw.length > 0) {
                            scope.drawLineChart();
                        } else {
                            return false;
                        }
                    };
                    //init chart
                    scope.init();
                }
            };
        }
    ]);
};

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Line Graph module', function () {
    beforeEach(angular.mock.module('huiD3', 'huiVisualization'));
    beforeEach(angular.mock.module('huiLineGraph'));
    var createGraph = function (bool, self, $rootScope, graphInput) {
            self.scope = $rootScope.$new();
            self.scope.graphInput = graphInput;
            self.scope.compactType = bool;
            self.template = '<line-graph class="line-graph" data-graph-input="graphInput" data-compact-type="' + bool + '"></line-graph>';

        },
        rootScope, self, mouseOverSpy, mouseClickSpy, d3,
        sampleGraphdata = {
            city: {
                data: [
                    [
                        '2013-06-18T00:00:00.000Z',
                        174800
                    ],
                    [
                        '2013-05-09T00:00:00.000Z',
                        175000
                    ]
                ]
            },
            zip: {
                data: [
                    [
                        '2013-05-09T00:00:00.000Z',
                        190250
                    ],
                    [
                        '2013-04-15T00:00:00.000Z',
                        186100
                    ]
                ]
            },
            Home: {
                data: [
                    [
                        '2014-06-09T00:00:01.000Z',
                        135100
                    ],
                    [
                        '2014-07-07T00:00:01.000Z',
                        135300
                    ]
                ]
            },
            description: 'The Home located at 8126 TIDEWATER DR decreased in value by 1.22% from May to June. In June, the Home has an estimated value of $137,100.'
        },
        document;

    describe('Line Graph Directive', function () {
        context('binding of the element', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function ($rootScope, $window, d3Utils) {
                self = this;
                rootScope = $rootScope;
                d3 = d3Utils.d3;
                document = $window.document;
                createGraph(false, self, rootScope, sampleGraphdata);

            }));

            util.helpers.directive(angular);
            beforeEach(angular.mock.inject(function ($rootScope, $window) {
                mouseOverSpy = self.sinon.spy(self.$el.isolateScope(), 'onMouseMoveOnLine');
                mouseClickSpy = self.sinon.spy(self.$el.isolateScope(), 'removeVertex');
            }));

            it('should bind to an element', angular.mock.inject(function ($timeout) {
                $timeout.flush(1000);
                expect(self.$el.parent().html()).to.contain('<line-graph');
            }));

            context('when graph legends are clicked', function () {
                it('should remove all selected points', angular.mock.inject(function () {
                    var sc = self.$el.isolateScope();
                    sc.$apply();
                    sc.svgClicked();
                    expect(self.$el.hasClass('selected-vertex')).to.be.false;
                }));
                it('set stroke width of corresponding line on the graph', angular.mock.inject(function () {
                    var sc = self.$el.isolateScope();
                    sc.$apply();
                    sc.onLegendClick('zip');
                    expect(angular.element('#tagzip').css('stroke-width')).to.equal('1');
                }));
                it('on double click it should change stroke width to normal', angular.mock.inject(function () {
                    var sc = self.$el.isolateScope();
                    sc.$apply();
                    sc.onLegendClick('zip');
                    sc.onLegendClick('zip');
                    expect(angular.element('#tagzip').css('stroke-width')).to.not.equal('3');
                }));
                it('on click of other legend it should change active line width to normal', angular.mock.inject(function () {
                    var sc = self.$el.isolateScope();
                    sc.$apply();
                    sc.onLegendClick('zip');
                    sc.onLegendClick('city');
                    expect(angular.element('#tagzip').css('stroke-width')).to.equal('1');
                }));

            });

            context('binding of the element with compactType true', function () {
                util.helpers.sinon(chai);
                beforeEach(angular.mock.inject(function ($rootScope) {
                    var self = this;
                    rootScope = $rootScope;
                    createGraph(true, self, rootScope, sampleGraphdata);
                }));

                util.helpers.directive(angular);
                it('should bind to an element when compact type is true', angular.mock.inject(function ($timeout) {
                    var self = this;

                    $timeout.flush(1000);
                    expect(self.$el.parent().html()).to.contain('<line-graph');
                }));
            });
            context('when graph line is clicked', function () {
                it('should remove all selected data points', angular.mock.inject(function () {
                    var sc = self.$el.isolateScope();
                    sc.$apply();
                    sc.removeVertex();
                    expect(self.$el.hasClass('selected-vertex')).to.be.false;
                }));
            });
            describe('Mouse events', function () {
                var eventTrigger = function (eventName, element) {
                    var event = document.createEvent('SVGEvents');
                    event.initEvent(eventName, true, true);
                    element[0].dispatchEvent(event);
                };
                it('should bind mousemove event', function () {
                    d3.mouse = function (d) {
                        return [560, 50];
                    };
                    eventTrigger('mousemove', angular.element(self.$el.find('#tagzip')));
                    expect(mouseOverSpy.called).to.be.true;
                });
                it('should bind mouseover event', function () {
                    d3.mouse = function (d) {
                        return [560, 50];
                    };
                    eventTrigger('mouseover', angular.element(self.$el.find('#tagzip')));
                    expect(mouseOverSpy.called).to.be.true;
                });
                it('should bind mouseout event', function () {
                    eventTrigger('mouseout', angular.element(self.$el.find('#tagzip')));
                    expect(angular.element('.hover-x').css('display')).to.equal('none');
                });
                it('should bind click event', function () {
                    d3.mouse = function (d) {
                        return [560, 50];
                    };
                    eventTrigger('click', angular.element(self.$el.find('#tagzip')));
                    expect(mouseClickSpy.called).to.be.true;
                });
                it('should bind touchend event', function () {
                    d3.mouse = function (d) {
                        return [560, 50];
                    };
                    eventTrigger('touchend', angular.element(self.$el.find('#tagzip')));
                    expect(mouseClickSpy.called).to.be.true;
                });
                it('should show selected node on click', function () {
                    d3.mouse = function (d) {
                        return [560, 50];
                    };
                    eventTrigger('click', angular.element(self.$el.find('#tagzip')));
                    eventTrigger('mouseout', angular.element(self.$el.find('#tagzip')));
                    expect(angular.element('.hover-x').css('display')).to.equal('none');
                });
            });
            context('binding of the element when no data', function () {
                util.helpers.sinon(chai);
                beforeEach(angular.mock.inject(function ($rootScope) {
                    var self = this;
                    rootScope = $rootScope;
                    sampleGraphdata = {};
                    createGraph(true, self, rootScope, sampleGraphdata);
                }));

                util.helpers.directive(angular);
                it('should hide the graph when no data', angular.mock.inject(function ($timeout) {
                    var self = this;
                    $timeout.flush(1000);
                    expect(self.$el.parent().html()).to.contain('<line-graph');
                }));
            });
        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Donut Chart Module', function () {
    describe('Donut Chart Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.module('huiD3', 'huiDonutChart'));

        beforeEach(angular.mock.inject(function (_donutChartService_, d3Utils) {
            var self = this;
            self.service = _donutChartService_;
            self.d3 = d3Utils.d3;

            self.config =
                {
                    width: 350,
                    height: 190,
                    margin: { top: 10, right: 10, bottom: 10, left: 10 },
                    legend: { width: 160 },
                    donut: {}
                };

            self.config.donut.diameter = self.config.height;
            self.config.donut.width = self.config.donut.diameter * 20 / 190;
            self.config.donut.radius = 9 * self.config.donut.width / 2;
            self.config.correctionBorder = self.config.donut.diameter - self.config.donut.radius * 2;

            self.data = [
                { label: 'Label1', value: 100 },
                { label: 'Label2', value: 200 },
                { label: 'Label3', value: 300 },
                { label: 'Label4', value: 400 }
            ];

            self.legendData = {
                title: '',
                text: ''
            };

            self.mockD3Select = {
                append: function () {
                    return this;
                },
                attr: function () {
                    return this;
                },
                select: function () {
                    return this;
                },
                selectAll: function () {
                    return this;
                },
                data: function () {
                    return this;
                },
                each: function () {
                    return this;
                },
                enter: function () {
                    return this;
                },
                map: function () {
                    return this;
                },
                text: function () {
                    return this;
                },
                style: function () {
                    return this;
                },
                classed: function () {
                    return this;
                },
                transition: function () {
                    return this;
                },
                remove: function () {
                    return this;
                },
                exit: function () {
                    return this;
                }

            };

            self.sinon.d3SelectStub = self.sinon.stub(d3Utils.d3, 'select').returns(self.mockD3Select);
            self.element = angular.element('<div></div>');
        }));

        describe('Create Canvas Method', function () {
            describe('When given an element and config', function () {
                it('should create svg canvas with width and height mentioned in config', function () {
                    var self = this;

                    self.service.createCanvas(self.element, self.config);
                    expect(self.service.chartConfig).to.eql(self.config);
                });
            });
        });


        describe('Render Chart Method', function () {
            describe('When given an config and data', function () {
                it('should set serious count with data length', function () {
                    var self = this;

                    self.service.renderChart(self.config, self.data);
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                    expect(self.service.seriousCount).to.eql(self.data.length);
                });
            });
        });

        describe('Update Chart Method', function () {
            describe('When given an new data', function () {
                it('should set serious count with data length', function () {
                    var self = this;

                    self.service.createCanvas(self.element, self.config);
                    self.service.renderChart(self.config, self.data);
                    self.service.renderLegend(self.config, self.data);

                    self.service.updateChart(self.data, { text: '$1,234', title: 'Sample' });
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                    expect(self.service.seriousCount).to.eql(self.data.length);
                });
            });
        });

        describe('Render Legend Method', function () {
            describe('When given an config and data', function () {
                it('should call d3.select method to find svg element', function () {
                    var self = this;

                    self.legend = self.service.renderLegend(self.config, self.data);
                    self.service.Legend.applyVisualChanges(self.legend, '.legend-item', 10, 12, 14, 1);
                    self.service.applyHoverEffect(true, self.data);
                    expect(self.sinon.d3SelectStub.called).to.be.true;

                    self.legend = self.service.renderLegend(self.config, self.data);
                    self.service.Legend.applyVisualChanges(self.legend, '.legend-item', 10, 12, 14, 1);
                    self.service.applyHoverEffect(true, null);
                    expect(self.sinon.d3SelectStub.called).to.be.true;

                    self.legend = self.service.renderLegend(self.config, self.data);
                    self.service.Legend.applyVisualChanges(self.legend, '.legend-item', 10, 12, 14, false);
                    self.service.applyHoverEffect(false, self.data);
                    self.service.applyHoverEffect(false, null);
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                });
            });
        });

        describe('Render Interior Method', function () {
            describe('When given an config and data', function () {
                it('should set serious count with data length', function () {
                    var self = this;

                    self.service.renderInterior(self.config, self.legendData);
                    expect(self.sinon.d3SelectStub.called).to.be.true;

                    self.service.renderInterior(self.config, undefined);
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                });
            });
        });

        describe('Render Interior Method', function () {
            describe('When given an config and data', function () {
                it('should set serious count with data length', function () {
                    var self = this;

                    self.service.Legend.onCLick();
                    expect(self.sinon.d3SelectStub.called).to.be.true;

                    self.service.Legend.onCLick({ label: 'Principal&Interest', value: 486, x: 10, y: 0 }, {});
                    expect(self.sinon.d3SelectStub.called).to.be.true;

                    self.service.Legend.activeItem = null;
                    self.service.Legend.onMouseOver({});
                    self.service.Legend.onMouseOver(null);
                    expect(self.sinon.d3SelectStub.called).to.be.true;

                    self.service.Legend.onMouseOut();
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                });
            });
        });

        describe('Render Interior Method', function () {
            describe('When given an config and data', function () {
                it('should set serious count with data length', function () {
                    var self = this,
                        d = {
                            endAngle: 0,
                            startAngle: 0
                        };

                    self.service.createCanvas(self.element, self.config);
                    self.service.donutArc.getArc(d);
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                });
            });
        });

        describe('Calculate Active Legend Item Postion Method', function () {
            describe('When selected data and current data is same ', function () {
                it('should be (0,0) ', function () {
                    var self = this;

                    expect(self.service.Legend.calcActiveItemPosition()).to.eql('translate(0, 0)');
                });
            });

            describe('When selected data and current data are different ', function () {
                it('should be calculated based on position ', function () {
                    var self = this;
                    self.service.chartConfig.height = 100;
                    self.service.seriousCount = 4;
                    self.service.chartConfig.legendLines = 2.5;
                    self.service.chartConfig.rhythm = 20;

                    expect(self.service.Legend.calcActiveItemPosition({}, undefined, 1)).to.eql('translate(0, 10)');
                });
            });
        });

        describe('Set Flag for Element Method', function () {
            describe('When selected data and current data is same ', function () {
                it('should set the css flag', function () {
                    var self = this;

                    self.service.setFlagForElement();
                    expect(self.sinon.d3SelectStub.called).to.be.true;
                });
            });
        });
    });
});

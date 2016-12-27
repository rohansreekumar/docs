'use strict';

require('./../index.js');

var chai = require('chai'),
    util = require('hui-components-mock/lib/test'),
    expect = chai.expect;

// replace openModals global var with self.service

describe('Modals Module', function () {

    beforeEach(angular.mock.module('huiD3', 'huiVisualization'));

    describe('visualizationUtil Service', function () {

        beforeEach(angular.mock.inject(function (_visualizationUtil_, _d3Utils_) {
            var self = this;

            self.service = _visualizationUtil_;
            self.d3 = _d3Utils_.d3;
        }));

        describe('getPallete Method', function () {

            it('should return array of colors', function () {
                var self = this,
                    result = self.service.getPalette();
                expect(result).to.eql([
                    '#f7841b',
                    '#092e4f',
                    '#7fa9cf',
                    '#aec3d7',
                    '#dde9f3'
                ]);
            });

        });
        describe('getGrid Method', function () {
            it('should return array of colors', function () {
                var self = this,
                    dataset = [
                        [
                            '2013-06-18T00:00:00.000Z',
                            174800
                        ],
                        [
                            '2013-05-09T00:00:00.000Z',
                            175000
                        ]
                    ],
                    result = self.service.getGrid(dataset);

                expect(result.x.min).to.eql(1368057600000);
                expect(result.x.max).to.eql(1371513600000);
                expect(result.y.min).to.eql(174800);
                expect(result.y.max).to.eql(175000);
            });
        });
        describe('dateToShow Method', function () {
            it('should return string in MM/YY format', function () {
                var self = this;

                expect(self.service.dateToShow(new Date(2016, 6, 1))).to.eql('7/16');
            });
        });
        describe('getAxis Method', function () {
            it('should return axis', function () {
                var self = this,
                    xAxis,
                    yAxis;

                xAxis = self.service.getAxis('x', [72, 100], { format: 'monthYear' });
                expect(xAxis.scale).to.not.be.undefined;

                xAxis = self.service.getAxis('y', [72, 100], { scale: 'ordinal' });
                expect(xAxis.scale).to.not.be.undefined;

                xAxis = self.service.getAxis('x', [72, 100], { format: '$,' });
                expect(xAxis.scale).to.not.be.undefined;

                xAxis = self.service.getAxis('x', [72, 100], {});
                expect(xAxis.scale).to.not.be.undefined;

                yAxis = self.service.getAxis('y', [72, 100]);
                expect(xAxis.scale).to.not.be.undefined;

                yAxis = self.service.getAxis('y');
                expect(xAxis.scale).to.not.be.undefined;
            });
        });

    });
});

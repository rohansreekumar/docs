'use strict';

var chai = require('chai'),
    expect = chai.expect;

describe('Angular pure slider Module', function () {

    beforeEach(angular.mock.module('huiSlider'));

    describe('angular pure slider Service', function () {

        beforeEach(angular.mock.inject(function (_valueConverter_) {
            var self = this;
            self.service = _valueConverter_;
        }));

        it('should return percentage based on value with step', function () {
            var self = this,
                result = self.service.valueToPercent(0, 10, 3, null, 1);
            expect(result).to.equal(30);
        });

        it('should return percentage based on value without step', function () {
            var self = this,
                result = self.service.valueToPercent(0, 10, 3, null, null);
            expect(result).to.equal(30);
        });

        it('should return percentage based on value without step', function () {
            var self = this,
                steps = [
                    1,
                    2,
                    3,
                    4
                ],
                stepsPercentage = self.service.calculateStepsPercentage(steps),
                result = self.service.valueToPercent(0, 10, 4, steps, null);
            expect(result).to.equal(100);
        });

        it('should return value based on percentage with min and max', function () {
            var self = this,
                result = self.service.percentToValue(0, 4, 50, null, 1);
            expect(result).to.equal(2);
        });

        it('should return value based on percentage with steps', function () {
            var self = this,
                steps = [
                    1,
                    2,
                    3,
                    4
                ],
                stepsPercentage = self.service.calculateStepsPercentage(steps),
                result = self.service.percentToValue(1, 4, 0, steps, null);
            expect(result).to.equal(1);
        });
    });

});

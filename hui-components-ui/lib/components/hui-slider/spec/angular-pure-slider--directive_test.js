'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Angular pure slider Module', function () {
    var rootScope, scope, $el;
    beforeEach(angular.mock.module('huiSlider'));
    beforeEach(angular.mock.inject(function ($rootScope) {
        rootScope = $rootScope;
        scope = rootScope.$new();

        scope.min = 1;
        scope.max = 9;
        scope.step = 1;
        scope.sliderValue = 10;
    }));
    describe('with max, min and steps', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(function () {
            var self = this;
            self.scope = scope;
            self.template = '<div wn-slider class="slider-wrapper" ng-model="sliderValue" min="min" max="max" steps="steps" step="step"></div>';
            $el = this.$el;
        });

        it('should set slider default value if exceeds max range', function () {
            expect(scope.sliderValue).to.equal(9);
        });

        it('should set slider default value if less than min range', function () {
            scope.sliderValue = 0;
            rootScope.$digest();
            expect(scope.sliderValue).to.equal(1);
        });

        it('should invoke mouseevent', function () {
            var xMin = angular.element($el)[0].getBoundingClientRect().left,
                xMax = angular.element($el)[0].offsetWidth + xMin;
            $el.find('div').trigger({ type: 'mousedown', pageX: xMin + 120 });
            expect(scope.sliderValue).to.equal(4);
        });

        it('should reset min value if it exceeds max range', function () {
            scope.min = 10;
            rootScope.$digest();
            expect(scope.min).to.equal(1);
        });

        it('should set max value if it less than min range', function () {
            scope.max = 0;
            rootScope.$digest();
            expect(scope.max).to.equal(9);
        });

        it('should reset slider value if it not number', function () {
            scope.sliderValue = 'test';
            rootScope.$digest();
            expect(scope.sliderValue).to.equal(9);
        });


    });

    describe('with max and min, without step', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(function () {
            var self = this;
            self.scope = scope;
            self.scope.step = null;
            self.template = '<div wn-slider class="slider-wrapper" ng-model="sliderValue" min="min" max="max" steps="steps" step="step"></div>';
            $el = this.$el;
        });

        it('should invoke mousedown event', function () {
            var xMin = angular.element($el)[0].getBoundingClientRect().left,
                xMax = angular.element($el)[0].offsetWidth + xMin;
            $el.find('div').trigger({ type: 'mousedown', pageX: xMin + 120 });
            expect(scope.sliderValue).to.equal(4);
        });

        it('should invoke mouseup event', function () {
            $el.find('div').trigger({ type: 'mouseup' });
            expect(scope.sliderValue).to.equal(9);
        });
    });

    describe('with steps', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);

        beforeEach(function () {
            var self = this;
            self.scope = scope;
            self.scope.steps = [
                1,
                2,
                3,
                4,
                5,
                6,
                7
            ];
            self.template = '<div wn-slider class="slider-wrapper" ng-model="sliderValue" min="min" max="max" steps="steps" step="step"></div>';
            $el = this.$el;
        });

        it('should invoke mouse down event', function () {
            var xMin = angular.element($el)[0].getBoundingClientRect().left,
                xMax = angular.element($el)[0].offsetWidth + xMin;
            $el.find('div').trigger({ type: 'mousedown', originalEvent: { pageX: 160 } });
            expect(scope.sliderValue).to.equal(2);
        });

        it('should reset slider default value if not in range', function () {
            scope.sliderValue = 0;
            rootScope.$digest();
            expect(scope.sliderValue).to.equal(1);
        });

        describe('touch events ', function () {
            it('jquery touch events', function () {
                var xMin = angular.element($el)[0].getBoundingClientRect().left,
                    xMax = angular.element($el)[0].offsetWidth + xMin;
                scope.sliderValue = 15;
                scope.$apply();
                $el.find('div').trigger({ type: 'mousemove', originalEvent: { touches: [{ pageX: 200 }] } });
                expect(scope.sliderValue).to.equal(7);
            });

            it('nativetouch events', function () {
                var xMin = angular.element($el)[0].getBoundingClientRect().left,
                    xMax = angular.element($el)[0].offsetWidth + xMin;
                $el.find('div').trigger({ type: 'mousedown', touches: { item: function (i) { return { pageX: 120 }; } } });
                expect(scope.sliderValue).to.equal(2);
            });
        });
    });
});

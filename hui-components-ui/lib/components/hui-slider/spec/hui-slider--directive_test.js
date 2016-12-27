'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Slider Module', function () {
    beforeEach(angular.mock.module('huiSlider'));

    describe('Slider Directive', function () {
        context('binding of the element', function () {
            var $el, sc;
            util.helpers.sinon(chai);
            util.helpers.directive(angular);

            beforeEach(angular.mock.inject(function ($rootScope, $timeout) {
                var self = this;
                self.$timeout = $timeout;

                self.scope = $rootScope.$new();
                self.scope.sliderConfig = {
                    min: 660.5,
                    max: 740.5,
                    step: 1,
                    minLabel: '660',
                    maxLabel: '740+',
                    label: 'Credit Score',
                    defaultValue: 740,
                    tooltip: 'This is your credit score.'
                };
                self.scope.updateResults = function () {
                    return true;
                };

                self.template = '<slider slider-config="sliderConfig" on-change="updateResults"></slider>';

                $el = this.$el;
                sc = $el.isolateScope();
            }));

            it('should bind to an element', function () {
                var self = this;
                expect(self.$el.parent().html()).to.contain('<slider');
            });
            it('should set slider value to default value', function () {
                var self = this;
                self.$timeout.flush(1000);
                expect(sc.sliderValue).to.equal(740);
            });

            it('should support decimal values for min and max', function () {
                var self = this;
                self.$timeout.flush(1000);
                expect(sc.sliderValue).to.equal(740);
                expect(sc.min).to.equal(660.5);
                expect(sc.max).to.equal(740.5);
            });

            it('should bind onChange method', function () {
                var self = this;
                sc.onChange = function () {
                    return function (a, b) {
                        return a++;
                    };
                };
                sc.onSliderChange(680, 681);
                expect(sc.onChange()).to.be.a('function');
            });
            it('should update slider value to new value', function () {
                var self = this;
                self.$timeout.flush(1000);
                sc.setSliderValue(250, 0);
                expect(sc.sliderValue).to.equal(250);
            });
            it('should pass minimum value when newvalue is less than minimum value', function () {
                var self = this;
                self.$timeout.flush(1000);
                sc.onSliderChange(-123, 457);
                expect(sc.min).to.equal(660.5);
            });
            it('should pass maximum value when new value is greater than maximum value', function () {
                var self = this;
                self.$timeout.flush(1000);
                sc.onSliderChange(1000, 457);
                expect(sc.max).to.equal(740.5);
            });
        });
    });
});

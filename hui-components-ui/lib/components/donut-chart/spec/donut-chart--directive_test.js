'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Slider Module', function () {
    beforeEach(angular.mock.module('huiDonutChart'));

    describe('Slider Directive', function () {
        context('binding of the element', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function ($rootScope, $controller, _donutChartService_) {
                var self = this;

                self.$rootScope = $rootScope;
                self.scope = $rootScope.$new();
                self.scope.chartInput = [];

                self.donutChartService = _donutChartService_;
                self.sinon.updateChartStub = self.sinon.stub(_donutChartService_, 'updateChart');

                self.scope.sliderConfig = {
                    min: 660,
                    max: 740,
                    step: 1,
                    minLabel: '660',
                    maxLabel: '740+',
                    label: 'Credit Score',
                    defaultValue: 740,
                    tooltip: 'This is your credit score.'
                };
                self.template = '<donut-chart data-chart-input="[{label:\'Principal&Interest\',value:486},{label:\'Insurance\',value:1336},{label:\'Taxes\',value:588},{label:\'PMI\',value:489}]" data-chart-interior="{title:\'EstimatedPayment\',text:\'$2,536\'}"></donut-chart>';

            }));

            util.helpers.directive(angular);
            it('should bind to an element', angular.mock.inject(function () {
                var self = this;
                expect(self.$el.parent().html()).to.contain('<donut-chart');
            }));

            it('should watch \'refresh\' and call donutChartService#updateChart method', angular.mock.inject(function () {
                var self = this;
                expect(self.$el.parent().html()).to.contain('<donut-chart');

                self.$el.scope().refresh = 'A';
                self.$rootScope.$digest();

                self.$el.scope().refresh = 'B';
                self.$rootScope.$digest();

                expect(self.sinon.updateChartStub.called).to.be.true;
            }));

        });
    });
});

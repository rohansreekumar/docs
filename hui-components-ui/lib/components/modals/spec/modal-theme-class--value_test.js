'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),

    useCase = describe;

require('./../index.js');

describe('huiModals Module', function () {

    describe('modalThemeClass', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiModals', ['huiModals']);

            // Get provider reference
            self.testModule.config(function (modalThemeClassProvider) {
                // bind the provider to a variable
                self.serviceProvider = modalThemeClassProvider;
            });

            // Get service reference
            angular.mock.module('test.huiModals');
            angular.mock.inject(function (modalThemeClass) {
                self.service = modalThemeClass;
            });
        });


        describe('Provider', function () {
            describe('setDefaults method', function () {
                it('should update the defaults', function () {
                    var self = this;

                    self.serviceProvider.setDefaults({
                        hypotheticalDefault: 'Needs Caffeine'
                    });

                    expect(self.serviceProvider.defaults).to.have.property('hypotheticalDefault', 'Needs Caffeine');

                });

            });
        });


        describe('Service', function () {

        });


    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),

    useCase = describe;

require('./../index.js');

describe('huiDfp Module', function () {

    describe('dfpNetworkCode', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiDfp', ['huiDfp']);

            // Get provider reference
            self.testModule.config(function (dfpNetworkCodeProvider) {
                // bind the provider to a variable
                self.serviceProvider = dfpNetworkCodeProvider;
            });

            // Get service reference
            angular.mock.module('test.huiDfp');
            angular.mock.inject(function (dfpNetworkCode) {
                self.service = dfpNetworkCode;
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
            it('should return the default value', function () {
                var self = this;

                expect(self.service).to.equal('65144157');
            });
        });

    });
});

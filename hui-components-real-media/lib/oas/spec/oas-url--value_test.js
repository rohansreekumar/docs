'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');


require('./../index.js');

describe('oas Module', function () {

    describe('oasUrl', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.oas', ['oas']);

            // Get provider reference
            self.testModule.config(function (oasUrlProvider) {
                // bind the provider to a variable
                self.serviceProvider = oasUrlProvider;
            });

            // Get service reference
            angular.mock.module('test.oas');
            angular.mock.inject(function (oasUrl) {
                self.service = oasUrl;
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
    });
});

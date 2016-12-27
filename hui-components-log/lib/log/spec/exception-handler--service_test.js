'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),

    useCase = describe;

require('./../index.js');

describe('huiLog Module', function () {

    describe('$exceptionHandler', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiLog', ['huiLog']);

            // Get provider reference
            self.testModule.config(function ($exceptionHandlerProvider) {
                // bind the provider to a variable
                self.serviceProvider = $exceptionHandlerProvider;
            });

            // Get service reference
            angular.mock.module('test.huiLog');
            angular.mock.inject(function ($exceptionHandler, exceptionLogging) {
                self.service = $exceptionHandler;
                self.exceptionLogging = exceptionLogging;
            });
        });

        describe('Service', function () {
            it('should return the exceptionLogging service error method', function () {
                var self = this;

                expect(self.service).to.equal(self.exceptionLogging.error);

            });
        });

    });
});

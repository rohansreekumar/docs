'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),
    Logger = require('./../../logger');

require('./../index.js');

describe('huiLog Module', function () {

    describe('exceptionLogging', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiLog', ['huiLog']);

            // Get provider reference
            self.testModule.config(function (exceptionLoggingProvider) {
                // bind the provider to a variable
                self.serviceProvider = exceptionLoggingProvider;
            });

            // Get service reference
            angular.mock.module('test.huiLog');
            angular.mock.inject(function (exceptionLogging) {
                self.service = exceptionLogging;
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

            describe('$init method', function () {
                beforeEach(angular.mock.inject(function ($window) {

                    $window.logger = false;
                }));
                afterEach(angular.mock.inject(function ($window) {

                    $window.logger = false;
                }));
                context('exceptionLogging has not been initialized', function () {

                    context('window.$logger has not been set', function () {

                        it('should create a new Logger', angular.mock.inject(function ($window) {
                            var self = this;

                            self.service.$init();

                            expect($window.logger instanceof Logger).to.be.true;
                        }));
                    });
                    it('should use window.$logger', angular.mock.inject(function ($window) {
                        var self = this;

                        function Foo (bar) {
                            this.bar = bar;
                        }
                        Foo.prototype.constructor = Foo;
                        $window.logger = new Foo('foo');

                        self.service.$init();

                        expect($window.logger instanceof Foo).to.be.true;
                    }));
                    it('should set itself to initialized', function () {
                        var self = this;

                        self.service.$init();

                        expect(self.service.$initialized).to.be.true;
                    });
                });
                context('exceptionLogging has been initialized', function () {
                    it('should do nothing.', angular.mock.inject(function ($window) {
                        var self = this;

                        self.service.$initialized = true;
                        self.service.$init();

                        expect($window.logger).to.be.false;
                    }));
                });
            });

            describe('$queueError method', function () {
                util.helpers.sinon();
                beforeEach(function () {
                    var self = this;

                    self.service.$init();
                    self.sinon.initSpy = self.sinon.spy(self.service, '$init');
                    self.sinon.loggerSpy = self.sinon.spy(self.service.$logger, 'error');

                    self.service.$queueError(new Error('oops'));
                });
                it('should call $init', function () {
                    var self = this;
                    expect(self.sinon.initSpy.called).to.be.true;
                });
                it('should call $logger.error', function () {
                    var self = this;
                    expect(self.sinon.loggerSpy.called).to.be.true;
                });
            });

            describe('error method', function () {
                util.helpers.sinon();

                beforeEach(angular.mock.inject(function ($log) {
                    var self = this;

                    self.sinon.logErrorSpy = self.sinon.stub($log, 'error');
                    self.sinon.$queueErrorSpy = self.sinon.stub(self.service, '$queueError');

                    self.service.error(new Error('oopsie'));
                }));

                it('should call $log.error', function () {
                    var self = this;

                    expect(self.sinon.logErrorSpy.called).to.be.true;
                });
                it('should $queueError', function () {
                    var self = this;

                    expect(self.sinon.$queueErrorSpy.called).to.be.true;
                });
            });

        });


    });
});

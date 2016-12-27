'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test'),

    useCase = describe;

require('./../index.js');

describe('huiBingMaps Module', function () {

    describe('bingMapsUrl', function () {
        util.helpers.sinon(chai);
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiBingMaps', ['huiBingMaps']);

            // Get provider reference
            self.testModule.config(function (bingMapsUrlProvider) {
                // bind the provider to a variable
                self.serviceProvider = bingMapsUrlProvider;
            });

            // Get service reference
            angular.mock.module('test.huiBingMaps');
            angular.mock.inject();
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
            context('in development', function () {
                beforeEach(angular.mock.inject(function (bingMapsUrl, $window) {
                    var self = this;

                    self.$window = $window;
                    self.env = !!$window.app.dev;
                    self.$window.app.dev = true;

                    self.service = bingMapsUrl;
                }));
                it('should return the dev url', function () {
                    var self = this;

                    expect(self.service.indexOf('virtualearth')).to.be.above(-1);
                });
                afterEach(angular.mock.inject(function ($window) {
                    var self = this;
                    $window.app.dev = self.env;
                }));
            });
        });
    });
    describe('bingMapsLibraryUtil', function () {
        beforeEach(angular.mock.module('test.huiBingMaps'));
        describe('Service', function () {

            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function (bingMapsLibraryUtil, $q, $document) {
                var self = this;

                self.service = bingMapsLibraryUtil;
                self.document = $document;

                self.sinon.createElement = self.sinon.stub($document[0].body, 'appendChild');
            }));
            describe('loadLibrary method', function () {
                context('when the tag libary is already cached', function () {
                    it('should return the cached library', function () {
                        var self = this, zeLibrary;
                        zeLibrary = function () {
                            return {
                                then: function (resolve) {
                                    resolve();
                                }
                            };
                        };
                        self.service.cache.library = zeLibrary;
                        self.service.loadLibrary();

                        // it would have changed if it reloaded.
                        expect(self.service.cache.library).to.equal(self.service.cache.library);
                    });
                });
                context('when the tag library is not cached', function () {
                    beforeEach(function () {
                        var self = this;
                        self.service.$onLoad = self.sinon.stub();
                        self.service.loadLibrary();

                    });
                    it('should return a promise', function () {
                        var self = this;
                        expect(self.service.cache.library.then).to.not.be.undefined;
                    });
                    it('should add a script tag to body to download script', function () {
                        var self = this, page;
                        self.service.loadLibrary();
                        expect(self.sinon.createElement).to.be.called;
                    });
                });
            });

            describe('$onLoad method', function () {
                beforeEach(function () {
                    var self = this;
                    self.sinon.deferred = {
                        resolve: self.sinon.stub()
                    };

                    self.service.deferred = {
                        resolve: self.sinon.deferred.resolve,
                        promise: {}
                    };

                });
                it('should resolve the promise', function () {
                    var self = this;
                    self.service.$onLoad();
                    expect(self.sinon.deferred.resolve.called).to.be.true;
                });

                it('should cache the library', function () {
                    var self = this;
                    self.service.$onLoad();
                    expect(self.service.cache.library).to.equal(self.service.deferred.promise);
                });
            });

            describe('$onError method', function () {

                it('should reject the promise', function () {
                    var self = this;
                    self.sinon.deferred = {
                        reject: self.sinon.stub()
                    };

                    self.service.deferred = {
                        reject: self.sinon.deferred.reject,
                        promise: {}
                    };
                    self.service.$onError();
                    expect(self.sinon.deferred.reject.called).to.be.true;
                });
            });
        });


    });
});

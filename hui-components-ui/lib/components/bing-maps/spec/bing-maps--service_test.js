'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),

    useCase = describe;

require('./../index.js');

describe('huiBingMaps Module', function () {

    describe('bingMaps', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiBingMaps', ['huiBingMaps']);

            // Get provider reference
            self.testModule.config(function (bingMapsProvider) {
                // bind the provider to a variable
                self.serviceProvider = bingMapsProvider;
            });

            // Get service reference
            angular.mock.module('test.huiBingMaps');
            angular.mock.inject(function (bingMaps) {
                self.service = bingMaps;
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

        util.helpers.sinon(chai);
        describe('Service', function () {
            beforeEach(angular.mock.inject(function (bingMapsLibraryUtil, $q) {
                var self = this;

                self.loadLibraryStub = self.sinon.stub(bingMapsLibraryUtil, 'loadLibrary');
            }));
            describe('setBingKey method', function () {
                beforeEach(angular.mock.inject(function (bingKeyDev, bingKeyLive, $window) {
                    var self = this;

                    self.bingKeyDev = bingKeyDev;
                    self.bingKeyLive = bingKeyLive;

                    self.previousEnvironment = $window.app.environment;
                }));
                afterEach(angular.mock.inject(function ($window) {
                    var self = this;

                    $window.app.environment = self.previousEnvironment;
                }));
                context('when window app environment is not production', function () {
                    beforeEach(angular.mock.inject(function ($window) {
                        var self = this;

                        $window.app.environment = 16;
                    }));
                    it('should set credentials to bingKeyDev', function () {
                        var self = this;

                        self.service.setBingKey();

                        expect(self.service.defaults.options.credentials).to.equal(self.bingKeyDev);
                    });
                });
                context('when window app environment is production', function () {
                    beforeEach(angular.mock.inject(function ($window) {
                        var self = this;

                        $window.app.environment = 8;
                    }));
                    it('should set credentials to bingKeyLive', function () {
                        var self = this;

                        self.service.setBingKey();

                        expect(self.service.defaults.options.credentials).to.equal(self.bingKeyLive);
                    });
                });
            });

            describe('loadLibrary method', function () {
                it('should call bingMapsLibraryUtil loadLibrary and return a promise', function () {
                    var self = this;

                    self.service.loadLibrary();

                    expect(self.loadLibraryStub.called).to.equal(true);
                });
            });

            describe('mapLoaded method', function () {
                beforeEach(angular.mock.inject(function ($timeout, $rootScope) {
                    var self = this;

                    self.scope = $rootScope.$new();

                    self.timeout = $timeout;
                }));
                context('when Microsoft object is set', function () {
                    beforeEach(angular.mock.inject(function ($window) {
                        var self = this,
                            microsoft = {
                                Maps: {
                                    Map: self.sinon.stub()
                                }
                            };

                        $window.Microsoft = microsoft;
                    }));
                    afterEach(angular.mock.inject(function ($window) {
                        delete $window.Microsoft;
                    }));
                    it('should return true', function () {
                        var self = this;

                        self.service.mapLoaded().then(function (response) {
                            expect(response).to.equal(true);
                        });

                        self.timeout.flush(100);
                    });
                });
                context('when Microsoft is not set and increment is set', function () {
                    it('should call mapLoaded twice', function () {
                        var self = this;

                        self.mapLoadedSpy = self.sinon.spy(self.service, 'mapLoaded');

                        self.service.mapLoaded(1);
                        self.timeout.flush(100);


                        expect(self.mapLoadedSpy.calledTwice).to.equal(true);
                    });
                });
                context('when Microsoft is not set and increment is not set', function () {
                    it('should throw error', function () {
                        var self = this,
                            errorFunction = function () {
                                self.service.mapLoaded();
                                self.timeout.flush(100);
                            };

                        expect(errorFunction).to.throw();
                    });
                });
            });

            describe('loadBingMaps method', function () {
                beforeEach(angular.mock.inject(function ($q, $rootScope) {
                    var self = this;

                    self.scope = $rootScope.$new();

                    self.service.setBingKey = self.sinon.stub();
                    self.service.loadLibrary = self.sinon.stub().returns($q.resolve());
                    self.service.mapLoaded = self.sinon.stub();
                }));
                it('should call setBingKey', function () {
                    var self = this;

                    self.service.loadBingMaps();

                    expect(self.service.setBingKey.called).to.equal(true);
                });
                it('should call loadLibrary', function () {
                    var self = this;

                    self.service.loadBingMaps();

                    expect(self.service.loadLibrary.called).to.equal(true);
                });
                it('should call mapLoaded', function () {
                    var self = this;

                    self.service.loadBingMaps();
                    self.scope.$digest();
                    expect(self.service.mapLoaded.called).to.equal(true);
                });
            });

            describe('setOptions method', function () {
                context('when options is an object', function () {
                    it('should merge new options into defaults', function () {
                        var self = this,
                            options = {
                                food: 'hungry'
                            };

                        self.service.setOptions(options);

                        expect(self.service.defaults.options.food).to.equal('hungry');
                        expect(self.service.defaults.options.mapTypeId).to.equal('r');
                        expect(self.service.defaults.options.zoom).to.equal(16);
                    });
                });

                context('when options is not an object', function () {
                    it('should not merge new options into defaults', function () {
                        var self = this,
                            options = 'food',
                            before = self.service.defaults.options;

                        self.service.setOptions(options);

                        expect(self.service.defaults.options).to.equal(before);
                    });
                });
            });

            describe('getOptions method', function () {
                it('should return the defaults options', function () {
                    var self = this;

                    expect(self.service.getOptions()).to.equal(self.service.defaults.options);
                });
            });

            describe('setmap method', function () {
                beforeEach(angular.mock.inject(function ($window) {
                    var self = this,
                        microsoft = {
                            Maps: {
                                Map: self.sinon.stub().returns({
                                    bing: 'maps'
                                })
                            }
                        };
                    $window.Microsoft = microsoft;
                }));
                afterEach(angular.mock.inject(function ($window) {
                    delete $window.Microsoft;
                }));
                it('should return a new map', function () {
                    var self = this;

                    expect(self.service.setMap()).to.deep.equal({
                        bing: 'maps'
                    });
                });
            });

            describe('setPins method', function () {
                beforeEach(angular.mock.inject(function ($window) {
                    var self = this,
                        microsoft = {
                            Maps: {
                                Pushpin: self.sinon.stub().returns({
                                    push: 'pin'
                                }),
                                EntityCollection: self.sinon.stub().returns([]),
                                Location: self.sinon.stub().returns('location'),
                                Events: {
                                    addHandler: self.sinon.stub().returns(),
                                    addThrottledHandler: self.sinon.stub().returns(),
                                    hasHandler: self.sinon.stub().returns(false)
                                }
                            }
                        };

                    $window.Microsoft = microsoft;
                }));
                afterEach(angular.mock.inject(function ($window) {
                    delete $window.Microsoft;
                }));
                context('location is not an array', function () {
                    it('should', function () {
                        var self = this,
                            location = {
                                lat: 36,
                                lng: -73
                            };

                        expect(self.service.setPins(location, undefined, self.sinon.stub())).to.deep.equal({
                            push: 'pin'
                        });
                    });
                });
                context('location is an array', function () {
                    it('should', function () {
                        var self = this,
                            location = [
                                {
                                    lat: 36,
                                    lng: -73
                                }, {
                                    lat: 36,
                                    lng: -73
                                }
                            ];

                        expect(self.service.setPins(location, undefined, self.sinon.stub())).to.deep.equal([
                            {
                                push: 'pin'
                            }, {
                                push: 'pin'
                            }
                        ]);
                    });
                });
            });

            describe('addHandler method', function () {
                beforeEach(angular.mock.inject(function ($window) {
                    var self = this;
                    self.microsoft = {
                        Maps: {
                            Map: self.sinon.stub().returns({
                                bing: 'maps'
                            }),
                            Events: {
                                addThrottledHandler: self.sinon.stub().returns(),
                                hasHandler: self.sinon.stub().returns(false)
                            }
                        }
                    };
                    $window.Microsoft = self.microsoft;
                }));
                afterEach(angular.mock.inject(function ($window) {
                    delete $window.Microsoft;
                }));
                context('first time handler', function () {
                    it('should be attach', function () {
                        var self = this,
                            element = self.microsoft.Maps.Map(),
                            handler = self.sinon.stub();

                        self.service.addHandler(element, 'click', handler);
                        expect(self.microsoft.Maps.Events.hasHandler.called).to.equal(true);
                        expect(self.microsoft.Maps.Events.addThrottledHandler.called).to.equal(true);
                    });
                });

                context('second time onwords handler', function () {
                    it('should not attach', function () {
                        var self = this,
                            element = self.microsoft.Maps.Map(),
                            handler = self.sinon.stub();

                        self.microsoft.Maps.Events.hasHandler.returns(true);

                        self.service.addHandler(element, 'click', handler);
                        expect(self.microsoft.Maps.Events.hasHandler.called).to.equal(true);
                        expect(self.microsoft.Maps.Events.addThrottledHandler.called).to.equal(false);
                    });
                });
            });

        });

    });
});

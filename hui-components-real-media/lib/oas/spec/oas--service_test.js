'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');


require('./../index.js');

describe('oas Module', function () {
    util.helpers.sinon(chai);
    beforeEach(function () {
        var self = this,
            mockDependency;

        mockDependency = {
            $get: function () {
                var $current = {
                    targeting: {
                        oas: {
                            sitePage: 'www.homes.com/content/listing.cfm',
                            targeting: {
                                page: '/content/unifieddetail.cfm',
                                statefix: 'ca',
                                county: 'los-angeles',
                                city: 'los-angeles',
                                state: 'ca',
                                zip: '90027',
                                officeid: '5504968',
                                status: 'for-sale',
                                listing_type: 'resale',
                                property_type: 'residential',
                                sourceid: '514',
                                price: 'm',
                                homesdma: 'los-angeles-803'
                            }
                        }
                    }
                };
                return { $current: $current };
            }
        };

        self.testModule = angular.module('test.oas', [
            'oas',
            function ($provide) {
                $provide.provider('pageProperties', mockDependency);
            }
        ]
        );

        // Get provider reference
        self.testModule.config(function (oasProvider) {
            // bind the provider to a variable
            self.serviceProvider = oasProvider;
        });

        // Get service reference
        angular.mock.module('test.oas');
        angular.mock.inject(function (oas, $window) {
            self.service = oas;
            self.$window = $window;
            self.$window.app = {
                dev: true
            };
        });

    });

    describe('oas', function () {

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
            describe('init method', function () {

                context('when oas has not been initialized', function () {

                    it('should set oas_tag.allowSizeOverride', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [200, 16]);
                        expect(self.$window.oas_tag.allowSizeOverride).to.be.equal('true');
                    });

                    it('should set oas_tag.analytics', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [200, 16]);
                        expect(self.$window.oas_tag.analytics).to.be.equal(true);
                    });

                    it('should set oas_tag.taxonomy', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [200, 16]);
                        expect(self.$window.oas_tag.taxonomy).to.be.equal('');
                    });

                    it('should set oas_tag.sizes to sizes', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [200, 16]);
                        expect(self.$window.oas_tag.sizes).to.be.exist;
                    });

                    context('when we are in dev mode', function () {

                        it('should set the callbackHandler for debugging', function () {
                            var self = this;
                            self.serviceProvider.loadCta('x01', [200, 16]);
                            expect(self.$window.oas_tag.callbackHandler).to.be.exist;
                        });

                        it('should call addHandler when callbackHandler is executed', function () {
                            var self = this;
                            self.$window.oas_tag.addHandler = function () { };
                            self.sinon.addHandler = self.sinon.spy(self.$window.oas_tag, 'addHandler');
                            self.serviceProvider.loadCta('x01', [200, 16]);
                            self.$window.oas_tag.callbackHandler();
                            expect(self.sinon.addHandler).to.be.called;
                        });
                    });
                });
            });

            describe('$debugSlot method', function () {

                beforeEach(angular.mock.inject(function ($rootScope, $q) {
                    var self = this,
                        promise = $q.defer();
                    self.serviceProvider.$promiseCache.init = undefined;
                    self.serviceProvider.$promiseCache.setQuery = undefined;
                    self.$window.app = {
                        dev: true
                    };

                    self.serviceProvider.$promiseCache.loadLibrary = promise.promise;
                    self.functionArguments = [];
                    self.functionArguments.push([{ log: 'test' }]);
                    self.functionArguments.push(0);
                    self.$window.oas_tag.addHandler = function (debug, func) {
                        func.apply(this, self.functionArguments);
                    };

                    self.serviceProvider.loadCta('x01', [300, 16]);
                    promise.resolve();
                    $rootScope.$apply();
                }));

                it('should log slot info', angular.mock.inject(function ($log) {
                    var self = this;
                    self.sinon.log = self.sinon.spy($log, 'info');
                    self.$window.oas_tag.callbackHandler();
                    expect(self.sinon.log.called).to.be.true;
                }));

            });

            describe('reloadAds method', function () {

                beforeEach(angular.mock.inject(function (_, $q) {
                    var self = this;
                    self.promise = $q.defer();
                    _.debounce = function (func) {
                        return function () {
                            func.apply(this, arguments);
                        };
                    };
                }));

                context('when reloadAds hasn\'t been already called within timeout', function () {

                    it('should not reloadAds', function () {
                        var self = this;
                        self.serviceProvider.$reloadAds(self.promise);

                        expect(self.serviceProvider.$promiseCache.reloadAds).to.be.undefined;
                    });

                    it('should reloadAds', function () {
                        var self = this;
                        self.serviceProvider.sizesCalled = true;
                        self.$window.oas_tag.reloadAds = function () { };
                        self.serviceProvider.$reloadAds(self.promise);

                        expect(self.$window.oas_tag.reloadAds).to.be.called;
                    });

                });
            });

            describe('loadLibrary', function () {

                beforeEach(angular.mock.inject(function ($rootScope, $q) {
                    var self = this,
                        promise = $q.defer();
                    self.serviceProvider.$promiseCache.init = undefined;
                    self.serviceProvider.$promiseCache.setQuery = undefined;
                    self.$window.app = undefined;
                    self.serviceProvider.$promiseCache.loadLibrary = promise.promise;
                    self.serviceProvider.loadCta('x01', [300, 16]);
                    promise.resolve();
                    self.$window.oas_tag.loadAd = function () { };
                    $rootScope.$apply();
                }));

                context('when the library isn\'t already loaded', function () {

                    it('should call the loadLibrary utility', function () {
                        var self = this;

                        expect(self.serviceProvider.$promiseCache.loadLibrary).to.be.exist;
                    });

                });
            });

            describe('setQuery', function () {

                context('when the query hasn\'t been set for the page', function () {

                    beforeEach(angular.mock.inject(function ($rootScope, $q) {
                        var self = this;
                        self.deffered = $q.defer();
                        self.serviceProvider.$promiseCache.init = undefined;
                        self.serviceProvider.$promiseCache.setQuery = undefined;
                        self.$window.app = undefined;
                        self.$rootScope = $rootScope;
                    }));

                    it('should set the site_page', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [300, 16]);
                        self.$rootScope.$apply();

                        expect(self.$window.oas_tag.site_page).to.be.equal('www.homes.com/content/listing.cfm');
                    });

                    it('should set the targeting query', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [300, 16]);
                        self.$rootScope.$apply();

                        expect(self.$window.oas_tag.query).to.be.equal('page=/content/unifieddetail.cfm&statefix=ca&county=los-angeles&city=los-angeles&state=ca&zip=90027&officeid=5504968&status=for-sale&listing_type=resale&property_type=residential&sourceid=514&price=m&homesdma=los-angeles-803');
                    });

                    it('should set site_page and targeting query', function () {
                        var self = this;
                        self.serviceProvider.$promiseCache.setQuery = self.deffered.promise;
                        self.$window.oas_tag.site_page = 'www.homes.com';
                        self.serviceProvider.loadCta('x01', [300, 16]);
                        self.$rootScope.$apply();
                        expect(self.$window.oas_tag.site_page).to.be.equal('www.homes.com/content/listing.cfm');
                        expect(self.$window.oas_tag.query).to.be.equal('page=/content/unifieddetail.cfm&statefix=ca&county=los-angeles&city=los-angeles&state=ca&zip=90027&officeid=5504968&status=for-sale&listing_type=resale&property_type=residential&sourceid=514&price=m&homesdma=los-angeles-803');
                    });
                });
            });


            describe('$definePosition method', function () {

                context('when the slot position is not already defined', function () {

                    it('should add the slot position and size to the slots array', function () {
                        var self = this;
                        self.serviceProvider.loadCta('x01', [300, 16]);
                        expect(self.serviceProvider.$currentSlots.x01.position).to.be.equal('x01');
                        expect(self.serviceProvider.$currentSlots.x01.size.length).to.be.equal(2);
                    });

                });

                context('when the slot position is already defined', function () {

                    it('should update the defined slot position', function () {
                        var self = this;
                        self.serviceProvider.$currentSlots.x01 = {};
                        self.serviceProvider.loadCta('x01', [300, 16]);
                        expect(self.serviceProvider.$currentSlots.x01.size.length).to.be.equal(2);
                    });

                });
            });

            describe('destroyPosition', function () {

                beforeEach(function () {
                    var self = this;
                    self.serviceProvider.$currentSlots.x01 = {
                        position: 'x01'
                    };
                    self.serviceProvider.$definedSlots.x01 = {
                        position: 'x01'
                    };
                });

                it('should remove the slot position from $currentSlots', function () {
                    var self = this;
                    self.serviceProvider.destroyPosition('x01');
                    expect(self.serviceProvider.$currentSlots.x01).to.be.undefined;
                });

                it('should remove the slot position from $definedSlots', function () {
                    var self = this;
                    self.serviceProvider.destroyPosition('x01');
                    expect(self.serviceProvider.$definedSlots.x01).to.be.undefined;
                });

                it('should reset page', function () {
                    var self = this;
                    self.serviceProvider.resetPage();
                    expect(self.serviceProvider.$promiseCache.setQuery).to.be.undefined;
                });

            });

            describe('sizes method', function () {

                beforeEach(function () {
                    var self = this;
                    self.serviceProvider.$currentSlots.x01 = {
                        position: 'x01'
                    };
                    self.serviceProvider.$definedSlots = {};
                    self.$window.oas_tag.definePos = function (a, b) { };
                    self.sinon.definePos = self.sinon.spy(self.$window.oas_tag, 'definePos');
                });

                it('shoud define positions for all current slots that haven\'t already been defined', function () {
                    var self = this;
                    self.serviceProvider.sizes();
                    expect(self.sinon.definePos.called).to.be.true;
                });

            });

            describe('loadCta method', function () {

                beforeEach(angular.mock.inject(function ($rootScope, $q) {
                    var self = this;
                    self.promise = $q.defer();
                    self.$rootScope = $rootScope;
                }));

                context('when there is an error loading the ad', function () {

                    it('should throw', function () {
                        var self = this;
                        self.serviceProvider.$promiseCache.init = undefined;
                        self.serviceProvider.$promiseCache.setQuery = undefined;
                        self.$window.app = undefined;
                        self.serviceProvider.$promiseCache.loadLibrary = self.promise.promise;

                        expect(function () {
                            self.serviceProvider.loadCta('x01', [300, 16]);
                            self.promise.reject();
                            self.$window.oas_tag.loadAd = function () { };
                            self.$rootScope.$apply();
                        }).to.throw();
                    });

                });

            });

            describe('setQuery with customzip in targeting', function () {
                beforeEach(angular.mock.inject(function ($rootScope, _pageProperties_) {
                    var self = this;
                    self.bindcustomZipData = function (customzip) {
                        _pageProperties_.$current.targeting.oas.targeting.customzip = customzip;
                        self.serviceProvider.$promiseCache.setQuery = undefined;
                        self.serviceProvider.loadCta('x01', [300, 16]);
                        $rootScope.$apply();
                    };
                }));

                it('should contain single customzip param in query', function () {
                    var self = this;
                    self.bindcustomZipData('verizon');
                    expect(self.$window.oas_tag.query).to.be.equal('page=/content/unifieddetail.cfm&statefix=ca&county=los-angeles&city=los-angeles&state=ca&zip=90027&officeid=5504968&status=for-sale&listing_type=resale&property_type=residential&sourceid=514&price=m&homesdma=los-angeles-803&customzip=verizon');
                });

                it('should contain two customzip params in query', function () {
                    var self = this;
                    self.bindcustomZipData([
                        'verizon',
                        'realmedia'
                    ]);
                    expect(self.$window.oas_tag.query).to.be.equal('page=/content/unifieddetail.cfm&statefix=ca&county=los-angeles&city=los-angeles&state=ca&zip=90027&officeid=5504968&status=for-sale&listing_type=resale&property_type=residential&sourceid=514&price=m&homesdma=los-angeles-803&customzip=verizon&customzip=realmedia');
                });
            });
        });
    });
});

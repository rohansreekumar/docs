'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Google DoubleClick for Publishers Module', function () {

    describe.skip('DFP Cta', function () {
        util.helpers.sinon(chai);

        beforeEach(function () {
            var self = this;
            // using this syntax to create a new module
            self.testModule = angular.module('test.huiDfp', []);

            // configure the module with the dfpCtaProvider
            self.testModule.config(function (dfpCtaProvider) {
                // set the provider to a variable
                self.serviceProvider = dfpCtaProvider;
            });

            // inject a mock service and the newly created mock module from above.
            angular.mock.module('huiDfp', 'test.huiDfp');

            // inject the dfpCta service and $q for promises
            angular.mock.inject(function (dfpCtaUtils, $window, _, dfpRendered) {
                var fakePubAds;

                self.dfpRenderedSpy = self.sinon.spy(dfpRendered, 'setRendered');

                // stub the entire google pubads service
                self.fakePubAds = {
                    enableSingleRequest: self.sinon.stub(),
                    disableInitialLoad: self.sinon.stub(),
                    enableAsyncRendering: self.sinon.stub(),
                    refresh: self.sinon.stub(),
                    setTargeting: self.sinon.stub(),
                    clearTargeting: self.sinon.stub(),
                    setLocation: self.sinon.stub(),
                    setCentering: self.sinon.stub(),
                    addEventListener: self.sinon.stub()
                };

                // make a stubbed version of  googletag.defineSlot.addService to reference below.
                self.sinon.addService = self.sinon.stub().returns(self.fakePubAds);

                // mock googletag service
                $window.googletag = self.googletag = {
                    pubads: self.sinon.addService,
                    defineSlot: self.sinon.stub().returns({
                        addService: self.sinon.addService,
                        setTargeting: self.sinon.stub(),
                        setLocation: self.sinon.stub()
                    }),
                    enableServices: self.sinon.stub(),
                    cmd: [],
                    display: self.sinon.stub(),
                    // this mocks the googletag.cmd queue. Which allows the googletag
                    // methods to be called asynchronously.
                    runCmd: function () {
                        _.forEach(self.googletag.cmd, function (task) {
                            if (typeof task === 'function') {
                                task();
                            }
                        });
                    }
                };

                // add a stubbed version of the dfpCtaUtils service method
                // loadLibrary to prevent it from actually creating a script element
                self.sinon.loadLibrary = self.sinon.stub(dfpCtaUtils, 'loadLibrary', function () {
                    // mock the promise .then() function that only is called when a promise resolves
                    return {
                        // the then function returns the googletag service. So set the resolved
                        // promise to the googletag service which is mocked above.
                        then: function (resolve) {
                            $window.googletag = self.googletag;
                            // call the successful function from the then method.
                            resolve();
                        }
                    };
                });

            });

            angular.mock.inject(function (dfpCta) {
                self.service = dfpCta;

                // use this to set the mocked service $cmd function to the
                // mocked googletag.cmd queue.
                self.service.$cmd = self.googletag.cmd;
            });
        });

        afterEach (function () {
            var self = this;
            delete self.sinon.addService;
            delete self.googletag;
            delete self.sinon.loadLibrary;
        });
        describe('Provider', function () {
            // reserved for future use
        });

        describe('Service', function () {

            describe('defineSlot method', function () {
                it('should cache the slot definition', function () {
                    var self = this,
                        slot = {
                            // set up a fake slot.
                            unit: '/65144157/Homes_Mobile/Details',
                            size: [140, 15],
                            id: '123-abc',
                            targeting: {
                                puppies: ['allowed'],
                                city: ['Munchkin Land, OZ', 'Emerald City, OZ'],
                                state: ['OZ'],
                                country: ['OZ']
                            }
                        };
                    // call the mocked up defineSlot function
                    self.service.defineSlot(slot);
                    // expec that service $slots array to equal what was passed in.
                    expect(self.service.$slots[slot.id]).to.equal(slot);
                });
                it('should cache the slot definition', function () {
                    var self = this,
                        slot = {
                            // set up a fake slot.
                            unit: '/65144157/Homes_Mobile/Details',
                            size: [140, 15],
                            id: '123-abc'
                        };
                    // call the mocked up defineSlot function
                    self.service.defineSlot(slot);
                    // expec that service $slots array to equal what was passed in.
                    expect(self.service.$slots[slot.id]).to.equal(slot);
                });
            });
            describe('disableAds method', function () {
                it('should turn off ads', function () {
                    var self = this;
                    // turn off the ads and make sure their actually turned off.
                    self.service.disableAds();
                    expect(self.service.$disabled).to.be.true;
                });
            });

            describe('enableServices method', function () {
                beforeEach(angular.mock.inject(function ($q) {
                    var self = this;

                    // mock the initialize function because we're not testing that in this
                    // block.
                    self.sinon.initialize = self.sinon.stub(self.service, 'initialize')
                        .returns({
                            // it returns a promise, so mock that .then() function
                            // and assume that it is successful.
                            then: function (resolve) {
                                resolve();
                            }
                        });
                    // mock the $q.all() function
                    self.sinon.qAll = self.sinon.stub($q, 'all')
                        .returns({
                            // which also returns a promise that we will assume
                            // is a positive one.
                            then: function (resolve) {
                                resolve();
                            }
                        });

                }));

                afterEach(function () {
                    var self = this;

                    delete self.sinon.qAll;
                });

                context('when no services have been enabled', function () {
                    it('should call loadLibrary to load googletag', function () {
                        var self = this;
                        // set enabled cache to false to ensure the enable service function runs
                        // all the way through.
                        self.service.$promiseCache.enabled = false;
                        // call it.
                        self.service.enableServices();
                        expect(self.sinon.loadLibrary.called).to.be.true;
                    });
                    it('should enable single requests for ad slots', function () {
                        var self = this;
                        // set enabled cache to false to ensure the enable service function runs
                        // all the way through.
                        self.service.$promiseCache.enabled = false;
                        // call it.
                        self.service.enableServices();
                        // call the queued up googletag commands
                        self.googletag.runCmd();
                        expect(self.fakePubAds.enableSingleRequest.called).to.be.true;

                    });
                    it('should enable ansynchronus rendering', function () {
                        var self = this;
                        // set enabled cache to false to ensure the enable service function runs
                        // all the way through.
                        self.service.$promiseCache.enabled = false;
                        // call it.
                        self.service.enableServices();
                        // call the queued up googletag commands
                        self.googletag.runCmd();
                        expect(self.fakePubAds.enableAsyncRendering.called).to.be.true;
                    });
                    it('should enable GPT services for defined ad slots', function () {
                        var self = this;
                        // set enabled cache to false to ensure the enable service function runs
                        // all the way through.
                        self.service.$promiseCache.enabled = false;
                        // call it.
                        self.service.enableServices();
                        // call the queued up googletag commands
                        self.googletag.runCmd();
                        expect(self.googletag.enableServices.called).to.be.true;
                    });

                });
                context('when services have already been enabled', function () {

                    it('should not call loadTagLibary to load googletag a second time', function () {
                        var self = this;
                        // set it to true this time to make sure that the function stops.
                        self.service.$promiseCache.enabled = true;
                        expect(self.sinon.loadLibrary.called).to.be.false;
                    });
                });

                context('when slots have been disabled', function () {

                    it('should not call loadTagLibary to load googletag at all', function () {
                        var self = this;

                        // set disabled to true.
                        self.service.$disabled = true;
                        self.service.$promiseCache.enabled = false;
                        self.service.enableServices();
                        expect(self.sinon.loadLibrary.called).to.be.false;
                    });
                });
            });

            describe('runAd method', function () {

                beforeEach(function () {
                    var self = this;

                    // mock the enable services method since that's not what we're testing
                    self.sinon.enableServices = self.sinon.stub(self.service, 'enableServices')
                        // it returns a promise
                        .returns({
                            // mock out the promise it returns which is a then function
                            then: function (resolve) {
                                // and call the success function in the response
                                resolve();
                            }
                        });

                    // mock out the service googleDefineSlot method. Assume it returns truthy/positive.
                    self.sinon.googleDefineSlot = self.sinon.stub(self.service, 'googleDefineSlot', function (slot) {
                        return true;
                    });

                    // assume the cache is enabled and that when we're calling
                    // enableServices its returning a response from the cached promise.
                    self.service.$promiseCache.enabled = {
                        then: function (next) {
                            next();
                        }
                    };

                    self.service.$definedSlots.anAd = {};
                });

                afterEach(function () {
                    var self = this;

                    delete self.sinon.googleDefineSlot;
                    delete self.sinon.enableServices;
                });
                context('when the ad has not been defined', function () {
                    it('should define the ad', function () {
                        var self = this,
                            response;
                        // call the runAd function
                        self.service.runAd('slot');
                        // run all the queued commands.
                        self.googletag.runCmd();

                        expect(self.sinon.googleDefineSlot.called).to.be.true;
                    });
                });
                it('should display the ad', function () {
                    var self = this,
                        response;
                    // call the runAd function
                    self.service.runAd('anAd');
                    // run all the queued commands.
                    self.googletag.runCmd();
                    // which will then call the display function.
                    expect(self.googletag.display.called).to.be.true;
                });

                it('should refresh the ad', function () {
                    var self = this,
                        slot = {
                            id: '123'
                        };
                    // call the runAd function
                    self.service.runAd(slot.id);
                    // call the queued commands
                    self.googletag.runCmd();
                    // of which refresh is included.
                    expect(self.fakePubAds.refresh.called).to.be.true;
                });
            });

            describe('setPageTargeting Method', function () {
                beforeEach(function () {
                    var self = this;

                });
                context('when an object of targeting values is passed', function () {
                    it('should set pageTargeting with google API', function () {
                        var self = this,
                        // fake targeting.
                            dfp = {
                                targeting: {
                                    puppies: ['allowed'],
                                    city: ['Munchkin Land, OZ', 'Emerald City, OZ'],
                                    state: ['OZ'],
                                    country: ['OZ']
                                }
                            };
                        // assuming services have been enabled, returned truthy and are
                        // now calling from the cached version.
                        self.service.$promiseCache.enabled = {
                            then: function (next) {
                                next();
                            }
                        };

                        // run the setPageTargeting function in the service
                        self.service.setPageTargeting(dfp);
                        // call queued commands
                        self.googletag.runCmd();
                        // pubads setTargeting should get called as one of the queued commands.
                        expect(self.fakePubAds.setTargeting.called).to.be.true;
                        // the call count should equal the number of targeting objects where passed in.
                        expect(self.fakePubAds.setTargeting.callCount).to.equal(Object.keys(dfp.targeting).length);
                    });
                });
                context('when given a falsy value', function () {
                    it('should clear the previously set page targeting', function () {
                        var self = this,
                        // fake targeting.
                            setTargeting = [
                                'puppies',
                                'city',
                                'state',
                                'country'
                            ];


                        // set the page targeting to the array above so that something is already set.
                        self.service.$targetingProps = setTargeting;
                        // assuming services have been enabled, returned truthy and are
                        // now calling from the cached version.
                        self.service.$promiseCache.enabled = {
                            then: function (next) {
                                next();
                            }
                        };
                        // call the setPageTargeting method with a falsy value
                        self.service.setPageTargeting(false);

                        // call the google command queue
                        self.googletag.runCmd();

                        // it won't run because it shouldn't send incorrect values to the google service
                        expect(self.fakePubAds.setTargeting.called).to.be.false;
                        // sending falsey values to setPageTargeting will cause each keys value to be cleared.
                        expect(self.fakePubAds.clearTargeting.called).to.be.true;
                        // it should be called once for every key that was passed in.
                        expect(self.fakePubAds.clearTargeting.callCount).to.equal(setTargeting.length);
                    });

                });
            });

            describe('$resetPage method', function () {
                beforeEach(angular.mock.inject(function ($rootScope) {
                    var self = this;

                    self.$rootScope = $rootScope;
                    self.service.$promiseCache.initialized = true;
                    self.sinon.setPageTargeting = self.sinon.spy(self.service, 'setPageTargeting');
                }));

                it('should clear page tageting and ad initialization', function () {
                    var self = this;

                    self.service.$resetPage();
                    self.$rootScope.$apply();

                    expect(self.service.$promiseCache.initialized).to.be.false;

                    // ToDo: Figure out why spies on the service are failing
                    // expect(self.sinon.setPageTargeting.called).to.be.true;
                });
                context('when the page has targeting set', function () {
                    it('should set page targeting', function () {
                        var self = this;

                        self.service.$resetPage({
                            targeting: {
                                result: {
                                    dfp: {
                                        puppies: ['all']
                                    }
                                }
                            }
                        });
                        self.$rootScope.$apply();

                        expect(self.service.$promiseCache.initialized).to.be.false;

                        // ToDo: Figure out why spies on the service are failing
                        // expect(self.sinon.setPageTargeting.calledTwice).to.be.true;

                    });
                    it('should set page targeting', function () {
                        var self = this;

                        self.service.$resetPage({
                            targeting: {
                                puppies: ['all']
                            }
                        });
                        self.$rootScope.$apply();

                        expect(self.service.$promiseCache.initialized).to.be.false;

                        // ToDo: Figure out why spies on the service are failing
                        // expect(self.sinon.setPageTargeting.calledTwice).to.be.true;

                    });
                });

            });
            describe('initialize', function () {
                beforeEach(function () {
                    var self = this;

                    // mock the enable services method since that's not what we're testing
                    self.sinon.enableServices = self.sinon.stub(self.service, 'enableServices')
                        // it returns a promise
                        .returns({
                            // mock out the promise it returns which is a then function
                            then: function (resolve) {
                                // and call the success function in the response
                                resolve();
                            }
                        });

                    // mock out the service googleDefineSlot method. Assume it returns truthy/positive.
                    self.sinon.googleDefineSlot = self.sinon.stub(self.service, 'googleDefineSlot', function (slot) {
                        return true;
                    });


                });

                context('when slots haven\'t already been initialized', function () {

                    it('should initialize slots', function () {
                        var self = this;
                        self.service.$promiseCache.initialized = false;
                        self.service.initialize();
                        // set up some test slots for the $slots array
                        self.service.$slots = [
                            {
                                unit: 'div-id',
                                size: [140, 15],
                                id: 123,
                                targeting: {
                                    pos: 'LeftText'
                                }
                            },
                            {
                                unit: 'div-id-1',
                                size: [140, 15],
                                id: 3213,
                                targeting: {
                                    pos: 'LeftText'
                                }
                            }
                        ];
                        // run the googletag comman queue.
                        self.googletag.runCmd();
                        // the promiseCache should be intialized on the first run through,
                        // thus returning a promise, which has a then function.
                        expect(self.service.$promiseCache.initialized.then()).to.not.be.undefined;
                        // for each slot in the $slots array the googleDefineSlot method should be called.
                        expect(self.sinon.googleDefineSlot.called).to.be.true;
                        // and it should be called once for each slot.
                        expect(self.sinon.googleDefineSlot.callCount).to.equal(self.service.$slots.length);
                    });
                });

                context('when slots have been initialize', function () {
                    it('should not reinitialize slots', function () {
                        var self = this;
                        // set the cache to true as if it has run already.
                        self.service.$promiseCache.initialized = true;
                        // call teh intialize function
                        self.service.initialize();
                        // googleDefineSlot shouldn't be called.
                        expect(self.sinon.googleDefineSlot.called).to.be.false;
                    });
                });
            });

            describe('googleDefineSlot Method', function () {
                it('should define slot targeting if defined', function () {
                    var self = this,
                    // fake slot with targeting.
                    slot = {
                        unit: 'div-id',
                        size: [140, 15],
                        id: 123,
                        targeting: {
                            pos: 'LeftText'
                        }
                    };

                    // call the googleDefineSlot service... because its what we're testing.
                    self.service.googleDefineSlot(slot);
                    // make sure something in it is being called.
                    expect(self.googletag.defineSlot().setTargeting.called).to.be.true;
                });

                it('should define slot location if defined with location', function () {
                    var self = this,
                    // fake slot with targeting.
                    slot = {
                        unit: 'div-id',
                        size: [140, 15],
                        id: 123,
                        targeting: {
                            pos: 'LeftText'
                        },
                        location: 'norfolk'
                    };

                    // call the googleDefineSlot service... because its what we're testing.
                    self.service.googleDefineSlot(slot);
                    // make sure something in it is being called.
                    expect(self.googletag.defineSlot().setLocation.called).to.be.true;
                });

                it('should construct slot with googletag service', function () {
                    var self = this,
                    // another fake slot with targeting.
                    slot = {
                        unit: 'div-id',
                        size: [140, 15],
                        id: 123
                    };

                    // call the service to test it again
                    self.service.googleDefineSlot(slot);
                    // it should construct a slot.
                    expect(self.googletag.defineSlot.called).to.be.true;
                    // and it should add the service to the slot with the 'addService' function.
                    // which is stubbed and referenced way up above in the beginning of the file.
                    expect(self.sinon.addService.called).to.be.true;
                });

                it('should construct slot with googletag service and addEventListener when callback is true', function () {
                    var self = this,
                        callback = self.sinon.stub(),
                    // another fake slot with targeting.
                    slot = {
                        unit: 'div-id',
                        size: [140, 15],
                        id: 123,
                        callback: callback
                    };

                    // call the service to test it again
                    self.service.googleDefineSlot(slot);
                    // it should construct a slot.
                    expect(self.googletag.defineSlot.called).to.be.true;
                    // and it should add the service to the slot with the 'addService' function.
                    // which is stubbed and referenced way up above in the beginning of the file.
                    expect(self.sinon.addService.called).to.be.true;
                    // Should call the addEventListener
                    expect(self.fakePubAds.addEventListener.called).to.be.true;
                });

            });

            describe('setRendered method', function () {
                it('should call dfpRendered setRendered', function () {
                    var self = this;
                    self.service.setRendered({
                        isEmpty: true
                    }, {
                        id: 'cookies'
                    });

                    expect(self.dfpRenderedSpy.called).to.be.true;
                });
            });
        });
    });
});

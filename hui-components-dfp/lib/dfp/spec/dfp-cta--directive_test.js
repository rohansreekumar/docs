'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Google DoubleClick for Publishers Module', function () {
    beforeEach(angular.mock.module('huiDfp'));

    describe('DFP Cta Directive', function () {
        util.helpers.directive(angular);
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope, dfpCta) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<dfp-cta-link ' +
                'data-dfp-listing-type="forSale" ' +
                'data-size="[140, 20]" ' +
                'data-unit="Homes_Desktop/DT" ' +
                'data-position="text1"> ' +
                '</dfp-cta-link>';

            // prevent attempt to load library
            self.sinon.stub(dfpCta, 'defineSlot');
            self.sinon.stub(dfpCta, 'runAd');
            self.sinon.stub(dfpCta, 'destroySlot');

            // run the cta.
            dfpCta.runAd(self.ctaId);
        }));

        it('should bind to an element.', function () {
            var self = this;
            expect(self.$el[0].tagName).to.contain('DIV');
        });

        it('should contain a child element with id matching the unit id of the cta', function () {
            var self = this;
            expect(self.$el.find('#div-gpt-cta-574899414907433380-1')).to.not.be.undefined;
        });
    });

    describe('DFP Ad Directive Controller', function () {
        util.helpers.sinon(chai);
        context('when required parameters are not set', function () {
            beforeEach(angular.mock.inject(function ($rootScope, $controller, dfpCta) {
                var self = this;
                self.scope = $rootScope.$new();

                self.dfpCta = {
                    defineSlot: self.sinon.stub(),
                    runAd: self.sinon.stub()
                };

                self.controller = $controller('dfpCtaController', {
                    $scope: self.scope,
                    dfpCta: self.dfpCta,
                    pageProperties: {
                        $current: {
                            property_detail: {
                                listing_status: 'for_sale'
                            }
                        }
                    }
                }, {
                    ctaId: 'div-gpt-cta-574899414907433380-1',
                    dfpListingType: 'forSale',
                    unit: 'Homes_Desktop/DT',
                    size: [140, 20],
                    position: 'right1'
                });
            }));


            it('should not define the dfp slot', function () {
                var self = this;
                expect(self.dfpCta.defineSlot.called).to.be.false;
            });

            it('should not run the ad', function () {
                var self = this;
                expect(self.dfpCta.runAd.called).to.be.false;
            });
        });

        context('when required parameters are set', function () {
            beforeEach(angular.mock.inject(function ($rootScope, $controller, dfpCta) {
                var self = this;
                self.scope = $rootScope.$new();
                self.dfpCta = {
                    defineSlot: self.sinon.stub(),
                    runAd: self.sinon.stub()
                };
                self.controller = $controller('dfpCtaController', {
                    $scope: self.scope,
                    dfpCta: self.dfpCta,
                    pageProperties: {
                        $current: {
                            search: {
                                listing_type: 'FORECLOSURE'
                            }
                        }
                    }
                }, {
                    ctaId: 'div-gpt-cta-574899414907433380-1',
                    dfpListingType: 'forSale',
                    unit: 'Homes_Desktop/DT',
                    size: [140, 20],
                    position: 'right1'
                });
                self.controller.init();
            }));

            it('should define the dfp slot', function () {
                var self = this;
                expect(self.dfpCta.defineSlot.called).to.be.true;
            });

            it('should run the ad upon instantiation of the directive', function () {
                var self = this;
                expect(self.dfpCta.runAd.called).to.be.true;
            });
        });

        context('when callback parameter is set', function () {
            beforeEach(angular.mock.inject(function ($rootScope, $controller, dfpCta) {
                var self = this;
                self.scope = $rootScope.$new();
                self.dfpCta = {
                    defineSlot: self.sinon.stub(),
                    runAd: self.sinon.stub(),
                    destroySlot: self.sinon.stub()
                };

                self.dfpRendered = {
                    onUpdate: self.sinon.stub().returns('Food'),
                    clearUpdate: self.sinon.stub()
                };

                self.callback = self.sinon.stub();
                self.controller = $controller('dfpCtaController', {
                    $scope: self.scope,
                    dfpCta: self.dfpCta,
                    dfpRendered: self.dfpRendered
                }, {
                    ctaId: 'div-gpt-cta-574899414907433380-1',
                    dfpListingType: 'offMarket',
                    unit: 'Homes_Desktop/SR',
                    size: [140, 20],
                    position: 'LeftText',
                    callback: self.callback
                });
                self.controller.init();
            }));

            it('should run dfpRendered on Updated', function () {
                var self = this;
                expect(self.dfpRendered.onUpdate.called).to.be.true;
            });

            it('should run dfpRendered clearUpdate on destroy is triggered', function () {
                var self = this;
                self.scope.$destroy();
                expect(self.dfpRendered.clearUpdate.called).to.be.true;
            });

            it('should not run dfpRendered clearUpdate if stopListening is false', function () {
                var self = this;
                self.controller.stopListening = false;
                self.scope.$destroy();
                expect(self.dfpRendered.clearUpdate.called).to.be.false;
            });
        });

        context('when setting DFP parameters are set', function () {
            beforeEach(angular.mock.inject(function ($rootScope, $controller, $window, dfpCta) {
                var self = this;

                $window.t_k = '_desktop';

                self.scope = $rootScope.$new();

                self.dfpCta = {
                    defineSlot: self.sinon.stub(),
                    runAd: self.sinon.stub()
                };
                self.setController = function (listingType) {
                    self.controller = $controller('dfpCtaController', {
                        $scope: self.scope,
                        dfpCta: self.dfpCta,
                        pageProperties: {
                            $current: {
                                search: {
                                    listing_type: 'FORECLOSURE'
                                }
                            }
                        }
                    }, {
                        ctaId: 'div-gpt-cta-574899414907433380-1',
                        dfpListingType: listingType || 'offMarket',
                        unit: 'Homes_Desktop/DT',
                        size: [140, 20],
                        position: 'right1'
                    });
                };
            }));

            afterEach(angular.mock.inject(function ($window) {
                delete $window.t_k;
            }));

            it('should the dfp type for Off Market', function () {
                var self = this;
                self.setController();
                expect(self.controller.pageType).to.equal('/SOLD');
            });

            it('should the dfp type for Rentals', function () {
                var self = this;
                self.setController('forRent');
                expect(self.controller.pageType).to.equal('/RENTAL');
            });

            it('should the dfp type for FORECLOSURE', function () {
                var self = this;
                self.setController('foreclosure');
                expect(self.controller.pageType).to.equal('/FORECLOSURE');
            });
        });
    });
});

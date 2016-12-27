'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Open Ads RealMedia', function () {
    beforeEach(function () {
        var self = this,
            mockDependency;

        mockDependency = {
            $get: function () {
                var $current = {
                    targeting: {
                        oas: {
                            site_page: 'www.test.com/index.html',
                            targeting: {
                                page: 'test.html',
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

    describe('OAS Cts directive', function () {
        util.helpers.directive(angular);
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope, oas) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<oas-cta data-pos="x05" data-size="[630,250]"></oas-cta>';

        }));

        it('should bind to an element.', function () {
            var self = this;
            expect(self.$el[0].tagName).to.contain('DIV');
        });
    });

    describe('OAS Cts Controller', function () {
        util.helpers.directive(angular);
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope, oas, $controller) {
            var self = this;
            self.scope = $rootScope.$new();

            self.oas = {
                loadCta: function () {
                },
                destroyPosition: function () {

                }
            };
            self.controller = $controller('oasCtaController', {
                $scope: self.scope,
                oas: self.oas
            });

            self.sinon.loadCta = self.sinon.spy(self.oas, 'loadCta');
        }));

        it('Should call load Cta', function () {
            var self = this;
            self.template = '<oas-cta data-pos="x05" data-size="[630,250]"></oas-cta>';
            self.controller.init();
            expect(self.sinon.loadCta).to.be.called;
        });

        it('Should not call load Cta', function () {
            var self = this;
            self.template = '<oas-cta></oas-cta>';
            self.controller.init();
            expect(self.sinon.loadCta.called).to.be.false;
        });
    });

});

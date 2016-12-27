'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('huiFrame Module', function () {

    beforeEach(function () {
        var self = this;
        self.testModule = angular.module('test.huiGreySeperator', []);
        self.testModule.directive('greySeparatorBar', function () {
            var fake = {
                priority: 100,
                terminal: true,
                restrict: 'E',
                replace: true,
                template: '<div class="grey-separator-bar">Not the real thing.Checking directive compilation on top level.</div>'
            };
            return fake;
        });
        angular.mock.module('app.frame', 'test.huiGreySeperator');
    });

    describe('greySeparatorBar', function () {
        beforeEach(angular.mock.inject(function ($rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.pageProperties = {
                $current: {
                    meta: {
                        result: {
                            h1: 'Homes in Norfolk-VA'
                        }
                    },
                    property_detail: {
                        price: {
                            currency: 'USD',
                            value: 89000
                        }
                    }
                }
            };
        }));

        describe('Grey Seperator Directive', function () {
            beforeEach(function () {
                var self = this;
                self.template = '<grey-separator-bar></grey-separator-bar>';
            });

            util.helpers.directive(angular);

            it('should bind to an element', function () {
                var self = this;
                expect(self.$el.hasClass('grey-separator-bar')).to.be.true;
            });
        });

        describe('onFocus Directive', function () {
            beforeEach(function () {
                var self = this;
                self.template = '<div class="frame-content-column" on-focus><button>Test</button><div class="search-form--wrapper"><input type="text" placeholder="search"/></div></div>';
            });

            util.helpers.directive(angular);

            it('should change placeholder text on focus', function () {
                var self = this,
                    el;
                el = angular.element(self.$el).find('input:text')[0];
                angular.element(el).trigger('focus');
                expect(angular.element(el).attr('placeholder')).to.be.equal('City,St or Zip or Address');
            });

            it('should change placeholder text on focusout', function () {
                var self = this,
                    el;
                el = angular.element(self.$el).find('input:text')[0];
                angular.element(el).trigger('focusout');
                expect(angular.element(el).attr('placeholder')).to.be.equal('Search');
            });
        });

        describe('Controller', function () {
            beforeEach(angular.mock.inject(function ($controller) {
                var self = this;
                self.controller = $controller('greySeparatorBarController', {
                    pageProperties: self.pageProperties
                });
            }));

            it('should get header text from rootScope', function () {
                var self = this;

                expect(self.controller.headerText).to.be.equal('Homes in Norfolk-VA');
                expect(self.controller.propertyCost).to.be.equal('$89,000');
            });
        });
        describe('toggleView Directive', function () {
            beforeEach(function () {
                var self = this;
                self.template = '<button toggle-view class="grey-separator-bar--maplist">View on Map</button>';
            });
            util.helpers.directive(angular);

            it('should change text from View on Map to View List on click', function () {
                var self = this;
                self.$el.trigger('click');
                expect(self.$el.text()).to.be.equal('View List');
            });
        });
    });
});

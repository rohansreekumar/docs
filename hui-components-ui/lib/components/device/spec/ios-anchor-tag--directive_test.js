'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('iOS anchor tag Module', function () {
    beforeEach(angular.mock.module('huiDevice'));
    describe('iOS anchor tag Directive', function() {
        util.helpers.directive(angular);
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope, $location) {
            var self = this;
            self.scope = $rootScope.$new();

            self.locationUrl = self.sinon.stub($location, 'url');

        }));

        describe('anchor tag with href', function () {
            beforeEach(angular.mock.inject(function (userDevice) {
                var self = this;

                self.devicePlatform = self.sinon.stub(userDevice, 'get', function () {
                    return {
                        platform: 'ios'
                    };
                });

                self.template = '<a ng-href="/"></a>';
            }));
            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('ng-scope')).to.be.true;
            });

            it('should call location url when a touch occurs without dragging', function () {
                var self = this;

                self.$el.triggerHandler('touchstart');
                self.$el.triggerHandler('touchend');

                expect(self.locationUrl.called).to.equal(true);
            });

            it('should not call location url when a touch occurs with dragging', function () {
                var self = this;

                self.$el.triggerHandler('touchstart');
                self.$el.triggerHandler('touchmove');
                self.$el.triggerHandler('touchend');

                expect(self.locationUrl.called).to.equal(false);
            });
        });

        describe('anchor tag without href', function () {
            beforeEach(angular.mock.inject(function (userDevice) {
                var self = this;

                self.devicePlatform = self.sinon.stub(userDevice, 'get', function () {
                    return {
                        platform: 'ios'
                    };
                });

                self.template = '<a></a>';
            }));
            it('should call location url when a touch occurs without dragging', function () {
                var self = this;

                self.$el.triggerHandler('touchstart');
                self.$el.triggerHandler('touchend');

                expect(self.locationUrl.called).to.equal(false);
            });
        });

        describe('should not add event listener if not ios', function () {
            beforeEach(angular.mock.inject(function (userDevice) {
                var self = this;

                self.devicePlatform = self.sinon.stub(userDevice, 'get', function () {
                    return {
                        platform: 'android'
                    };
                });

                self.template = '<a ng-href="/"></a>';
            }));

            it('should not call locationUrl when touchend is triggered', function () {
                var self = this;

                self.$el.triggerHandler('touchend');

                expect(self.locationUrl.called).to.equal(false);
            });

        });

    });
});

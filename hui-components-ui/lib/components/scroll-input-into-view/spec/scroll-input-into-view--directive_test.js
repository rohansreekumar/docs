'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('huiInputFocusScroll Module', function () {

    beforeEach(angular.mock.module('huiInputFocusScroll'));

    util.helpers.sinon(chai);

    describe('scrollInputIntoView Module', function() {
        describe('Directive', function() {
            util.helpers.directive(angular);
            beforeEach(angular.mock.inject(function (scrollInputIntoView, $rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.scrollStub = self.sinon.stub(scrollInputIntoView, 'scroll');
                self.template = '<div scroll-input-into-view class="scroll-input-into-view"></div>';
            }));
            context('when device is set to ios', function () {
                beforeEach(angular.mock.inject(function (userDevice) {
                    var self = this;

                    self.userDeviceStub = self.sinon.stub(userDevice, 'get', function () {
                        return {
                            platform: 'ios'
                        };
                    });
                }));
                it('should bind to an element', function () {
                    var self = this;

                    expect(self.$el.hasClass('scroll-input-into-view')).to.equal(true);
                });
                it('should called addEventListener', function () {
                    var self = this;

                    self.$el.triggerHandler('focusin');

                    expect(self.scrollStub.called).to.equal(true);
                });
            });
            context('when device is set to android', function () {
                beforeEach(angular.mock.inject(function (userDevice) {
                    var self = this;

                    self.userDeviceStub = self.sinon.stub(userDevice, 'get', function () {
                        return {
                            platform: 'android'
                        };
                    });
                }));
                it('should called addEventListener', function () {
                    var self = this;

                    self.$el.triggerHandler('resize');

                    expect(self.scrollStub.called).to.equal(true);
                });
            });
            context('when device is set to neither ios nor android', function () {
                beforeEach(angular.mock.inject(function (userDevice) {
                    var self = this;

                    self.userDeviceStub = self.sinon.stub(userDevice, 'get', function () {
                        return {
                            platform: 'windows'
                        };
                    });
                }));
                it('should called addEventListener', function () {
                    var self = this;

                    self.$el.triggerHandler('focus');
                    self.$el.triggerHandler('resize');

                    expect(self.scrollStub.called).to.equal(false);
                });
            });
        });
    });
});

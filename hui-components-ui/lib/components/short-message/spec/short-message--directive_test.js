'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');
describe('Short Message Module', function () {

    beforeEach(angular.mock.module('huiShortMessage'));
    describe('Open Short Message Directive', function () {
        var rootScope;
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function (ngDialog, ShortMessage, $rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<button data-open-short-message></button>';
            self.openSpy = self.sinon.spy(ShortMessage, 'open');
        }));

        it('should call the more Menu open method', function () {
            var self = this;
            self.$el.click();

            expect(self.openSpy).to.have.been.called;
        });

    });

    describe('Short Message Directive', function () {
        var rootScope;
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function (ShortMessage, $rootScope) {
            var self = this;
            rootScope = $rootScope;
            self.scope = $rootScope.$new();
            self.template = '<short-message></short-message>';
        }));

        it('should bind to an element', function () {
            var self = this;
            expect(self.$el.hasClass('short-message')).to.be.true;
        });
    });

    describe('Short Message Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope, ngDialog, ShortMessage, $timeout) {
            var self = this;
            self.rootScope = $rootScope;
            self.timeout = $timeout;
            self.scope = $rootScope.$new();
            self.template = '<short-message></short-message>';
            self.shortMessage = ShortMessage;
            self.ngDialog = self.sinon.spy(ngDialog, 'open');
        }));

        afterEach(angular.mock.inject(function () {
            var self = this;
            if (self.shortMessage.dialog) {
                angular.element('#' + self.shortMessage.dialog.id).remove();
                self.shortMessage.dialog = null;
            }
        }));

        describe('when the shortMessage dialog is not open', function () {
            it('should open a modal when open() is called.', function () {
                var self = this;

                expect(self.shortMessage.dialog).to.equal(null);
                self.shortMessage.open();
                expect(self.ngDialog).to.be.called;
                expect(self.shortMessage.dialog).not.equal(null);
            });
        });

        describe('when the shortMessage dialog is already open', function () {

            it('should not open a modal when open() is called.', function () {
                var self = this;

                self.shortMessage.dialog = 'trees';
                self.shortMessage.open();
                expect(self.ngDialog).to.not.be.called;
            });
        });


        it('should clear dialog on close', function () {
            var self = this;

            self.messageObject = {
                title: 'Inactive Listing',
                message: 'We\'re sorry, but the listing you are lookin for is no longer active or has been removed from our system'
            };

            expect(self.shortMessage.dialog).to.equal(null);
            self.shortMessage.open(self.messageObject);
            self.rootScope.$apply();
            self.timeout.flush();
            expect(self.shortMessage.dialog).to.not.equal(null);
            self.shortMessage.dialog.close();
            self.rootScope.$apply();
            expect(self.shortMessage.dialog).to.equal(null);
        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

// Load Local Ads module.
require('./../index.js');

describe('Details Module', function() {

    beforeEach(angular.mock.module('huiBingMaps'));

    describe('Full screen bing maps', function () {

        util.helpers.sinon(chai);
        describe('Directive', function() {
            util.helpers.directive(angular);
            beforeEach(angular.mock.inject(function ($rootScope, fullScreenBingMaps) {
                var self = this;
                self.scope = $rootScope.$new();

                self.scope.propertyAddress = {
                    lat: 32,
                    lng: -72
                };

                self.fullScreenBingMaps = self.sinon.stub(fullScreenBingMaps, 'open');

                self.template = '<div data-open-full-screen-bing-maps="propertyAddress" class="full-screen"></div>';
            }));

            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('full-screen')).to.be.true;
            });

            it('should call open on fullScreenBingMaps service', function () {
                var self = this;

                self.$el.triggerHandler('click');

                expect(self.fullScreenBingMaps.called).to.equal(true);
            });
        });

        describe('Service', function () {
            beforeEach(angular.mock.inject(function ($rootScope, $q, fullScreenBingMaps, ngDialog) {
                var self = this;

                self.scope = $rootScope.$new();
                self.service = fullScreenBingMaps;

                self.ngDialogOpen = self.sinon.stub(ngDialog, 'open', function () {
                    return {
                        test: 'Im open',
                        closePromise: $q.resolve()
                    };
                });
                self.ngDialogClose = self.sinon.stub(ngDialog, 'close', function () {
                    return $q.resolve();
                });
            }));

            describe('open method', function () {
                context('when dialog is not already open', function () {
                    it('should call ngDialog open and set service dialog with the response', function () {
                        var self = this;

                        self.service.open();

                        expect(self.ngDialogOpen.called).to.equal(true);
                        expect(self.service.dialog.test).to.equal('Im open');
                    });

                    it('should set dialog to null when closePromise is resolved', function () {
                        var self = this;

                        self.service.open();
                        self.scope.$digest();

                        expect(self.service.dialog).to.equal(null);
                    });
                });

                context('when dialog is already open', function () {
                    it('should not call ngDialog again', function () {
                        var self = this;

                        self.service.open();
                        self.service.open();

                        expect(self.ngDialogOpen.calledOnce).to.equal(true);
                    });
                });
            });
        });
    });
});

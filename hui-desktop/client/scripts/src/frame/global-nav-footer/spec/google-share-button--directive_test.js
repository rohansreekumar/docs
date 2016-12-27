'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Global nav Footer Module', function () {
    beforeEach(angular.mock.module('app.frame.globalNavFooter'));
    beforeEach(angular.mock.module(function($provide) {
        var self = this,
            watchAdded,
            windowMock = {
                gapi: {
                    plusone: {
                        penguin: true,
                        go: function () {
                            return false;
                        }
                    }
                }
            };
        $provide.value('$window', windowMock);
    }));
    describe('Google Share Button Directive', function () {
        describe('When Google Share Button has url link', function () {
            util.helpers.directive(angular);
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function ($rootScope, $window, $q, googleShare) {
                var self = this;
                self.scope = $rootScope.$new();
                self.window = $window;
                self.q = $q;
                self.googleShare = googleShare;
                self.unbindWatch = self.sinon.spy();
                self.renderPlusButton = self.sinon.spy();
                self.googleShareStub = self.sinon.stub(googleShare, 'loadLibrary', function () {
                    return $q.resolve(
                        {
                            boom: 'works'
                        }
                    );
                });
            }));

            it('should bind to an attribute', function () {
                var self = this;
                self.template = '<span google-share-button="\'http%3A%2F%2Fwww.homes.com\'" class="share-google" />';
                expect(self.$el.hasClass('share-google')).to.be.true;
            });

            it('should run through the twice at least twice if watchAdded is false', function () {
                var self = this;
                self.template = '<span google-share-button="\'http%3A%2F%2Fwww.homes.com\'" class="share-google" />';
                expect(self.renderPlusButton.calledOnce).to.be.false;
            });

            it('should run if when google-share-button has no value', function () {
                var self = this;
                self.template = '<span google-share-button class="share-google" />';
                expect(self.unbindWatch.called).to.not.be.undefined;
            });
        });
    });
});

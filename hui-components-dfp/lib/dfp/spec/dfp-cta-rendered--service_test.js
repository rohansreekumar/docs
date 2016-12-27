'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

// Load cta module.
require('./../index.js');

describe('Dfp Module', function() {

    beforeEach(angular.mock.module('huiDfp'));

    describe('Cta Rendered Service', function() {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function (dfpRendered) {
            var self = this;

            self.service = dfpRendered;
        }));

        describe('get method', function () {
            it('should return the valuse of $current', function () {
                var self = this;

                expect(self.service.get()).to.equal(self.service.$current);
            });
        });

        describe('setRendered method', function () {
            it('should add the ad to adRendered if isEmpty is false', function () {
                var self = this,
                    event = {
                        isEmpty: false,
                        creativeId: '123'
                    },
                    slot = {id: 'Cookies'};

                self.service.setRendered(event, slot);

                expect(self.service.$current.adRendered[0]).to.equal('Cookies');
            });

            it('should not add the ad more than once in adRendered', function () {
                var self = this,
                    event = {
                        isEmpty: false,
                        creativeId: '123'
                    },
                    slot = {id: 'Cookies'};

                self.service.setRendered(event, slot);
                self.service.setRendered(event, slot);

                expect(self.service.$current.adRendered[1]).to.be.undefined;
            });

            it('should add the ad to noAd if isEmpty is true', function () {
                var self = this,
                    event = {
                        isEmpty: true,
                        creativeId: '123'
                    },
                    slot = {id: 'Cookies'};

                self.service.setRendered(event, slot);

                expect(self.service.$current.noAd[0]).to.equal('Cookies');
            });

            it('should not add the ad more than once in noAd', function () {
                var self = this,
                    event = {
                        isEmpty: true,
                        creativeId: '123'
                    },
                    slot = {id: 'Cookies'};

                self.service.setRendered(event, slot);
                self.service.setRendered(event, slot);

                expect(self.service.$current.noAd[1]).to.be.undefined;
            });
        });


        describe('onUpdate', function () {
            beforeEach(function () {
                var self = this;

                self.callback1 = self.sinon.stub();
                self.callback2 = self.sinon.stub();
                self.callback3 = self.sinon.stub();

                self.callbackTarget = {
                    ctaId: '1234'
                };
            });

            it('should add a callback', function () {
                var self = this,
                    callback1Id, blankId;
                callback1Id = self.service.onUpdate(self.callbackTarget, self.callback1);
                blankId = self.service.onUpdate(self.callbackTarget, {}); // doesn't add a callback

                expect(self.service.$listeners[callback1Id]).to.not.be.undefined;
                expect(blankId).to.be.undefined;
            });

            it('should fire all callbacks', function () {
                var self = this;

                self.service.$listeners.a = [self, self.callback1];
                self.service.$listeners.b = [self, self.callback2];
                self.service.$listeners.c = [self, self.callback3];

                self.service.onUpdate();

                expect(self.callback1.called).to.be.true;
                expect(self.callback2.called).to.be.true;
                expect(self.callback3.called).to.be.true;
            });

            it('should fire the callback for the specific ad', function () {
                var self = this;

                self.service.$current = {adRendered: ['1234']};
                self.service.$listeners.a = [self.callbackTarget, self.callback1];

                self.service.onUpdate();

                expect(self.callback1.called).to.be.true;
            });
        });

        describe('clearUpdate', function () {
            beforeEach(function () {
                var self = this;

                self.callback1 = self.sinon.stub();
                self.callback2 = self.sinon.stub();
                self.callback3 = self.sinon.stub();

            });

            it('should clear a registered callback', function () {
                var self = this;

                self.service.$listeners.a = [self, self.callback1];
                self.service.$listeners.b = [self, self.callback2];
                self.service.$listeners.c = [self, self.callback3];

                self.service.clearUpdate('b');
                self.service.onUpdate();

                expect(self.callback1.called).to.be.true;
                expect(self.callback2.called).to.be.false;
                expect(self.callback3.called).to.be.true;
            });

            it('should not error if a non-registered callback is cleared', function () {
                var self = this;

                expect(self.service.clearUpdate('d')).to.not.throw;
            });
        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('huiTrackScroll Module', function () {

    util.helpers.sinon(chai);

    describe('trackScroll', function () {
        beforeEach(function () {
            var self = this;

            self.module = angular.module('huiTrackScroll');

            self.module.config(function (trackScrollProvider) {
                self.serviceProvider = trackScrollProvider;
            });

            angular.mock.module('huiTrackScroll');

            angular.mock.inject(function (trackScroll) {
                self.service = trackScroll;
            });
        });

        describe('Provider', function () {
            describe('setDefaults method', function () {
                it('should update the defaults', function () {
                    var self = this;

                    self.serviceProvider.setDefaults({
                        default: 'option'
                    });

                    expect(self.serviceProvider.defaults).to.have.property('default', 'option');
                });
            });
        });

        describe('Service', function () {
            describe('$getScrollTop method', function () {
                it('should return window scroll top', function () {
                    var self = this,
                        scrollTop = self.service.$getScrollTop();

                    expect(scrollTop).to.equal(0);
                });
            });
            describe('$getScrollTop method', function () {
                it('should return window scroll top', function () {
                    var self = this,
                        scrollTop = self.service.$getPageYOffset();

                    expect(scrollTop).to.equal(0);
                });
            });
            describe('$checkDirectionSwitch method', function () {
                context('currentDirection doesn\'t equal scrollDirection', function () {
                    it('should return true', function () {
                        var self = this;

                        self.service.scrollDirection = 'up';

                        expect(self.service.$checkDirectionSwitch('down')).to.equal(true);
                    });
                });
                context('currentDirection equals scrollDirection', function () {
                    it('should return false', function () {
                        var self = this;

                        self.service.scrollDirection = 'up';

                        expect(self.service.$checkDirectionSwitch('up')).to.equal(false);
                    });
                });
            });
            describe('setBaseline method', function () {
                it('should return baseline', function () {
                    var self = this;

                    expect(self.service.setBaseline()).to.equal(0);
                });
            });
            describe('returnSetScroll method', function () {
                context('scrollDelta is greater than 0 and totalDelta is less than or equal to value', function () {
                    it('should call checkDirectionSwitch with "up" and return true', function () {
                        var self = this;

                        self.service.$getScrollTop = self.sinon.stub().returns(10);
                        self.service.$checkDirectionSwitch = self.sinon.stub();

                        expect(self.service.returnSetScroll(15)).to.equal(true);
                        expect(self.service.$checkDirectionSwitch.calledWith('up')).to.equal(true);
                    });
                });
                context('scrollDelta is less than 0 and totalDelta is not less than or equal to value', function () {
                    it('should call checkDirectionSwitch with "down" should return false', function () {
                        var self = this;

                        self.service.$getScrollTop = self.sinon.stub().returns(-10);
                        self.service.$checkDirectionSwitch = self.sinon.stub();

                        expect(self.service.returnSetScroll(-30)).to.equal(false);
                        expect(self.service.$checkDirectionSwitch.calledWith('down')).to.equal(true);
                    });
                });
                context('scrollDelta is 0', function () {
                    it('should not call $checkDirectionSwitch', function () {
                        var self = this;

                        self.service.$getScrollTop = self.sinon.stub().returns(0);
                        self.service.$checkDirectionSwitch = self.sinon.stub();

                        self.service.returnSetScroll(0);

                        expect(self.service.$checkDirectionSwitch.called).to.equal(false);
                    });
                });
            });
        });
    });
});

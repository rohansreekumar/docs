'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Mortgage Module', function () {

    util.helpers.sinon(chai);

    describe('Mortgage Lead Form Service', function () {
        beforeEach(angular.mock.module('huiDevice'));
        beforeEach(angular.mock.inject(function (isMobileCookie, moment) {
            var self = this;

            self.service = isMobileCookie;

            self.clock = self.sinon.stub(moment(), 'add');
        }));

        describe('set method', function () {

            beforeEach(angular.mock.inject(function ($cookies) {
                var self = this;

                self.cookiesPutStub = self.sinon.stub($cookies, 'put');
                self.cookiesGetStub = self.sinon.stub($cookies, 'get');
            }));

            it('should call put when no cookie set', function (done) {
                var self = this;

                self.service.set(false);

                expect(self.cookiesPutStub.called).to.equal(true);
                done();
            });

            it('should not call put when cookie set', function (done) {
                var self = this;

                self.cookiesGetStub.returns('test');

                self.service.set(false);

                expect(self.cookiesPutStub.called).to.equal(false);
                done();
            });

            it('should call put when cookie set but is forced', function (done) {
                var self = this;

                self.cookiesGetStub.returns('test');

                self.service.set(false, {
                    force: true
                });

                expect(self.cookiesPutStub.called).to.equal(true);
                done();
            });


        });

    });
});

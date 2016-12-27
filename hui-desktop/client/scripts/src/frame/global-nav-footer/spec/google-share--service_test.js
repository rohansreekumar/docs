'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('globalNavFooter Module', function () {

    util.helpers.sinon(chai);
    describe('Google Share', function () {
        beforeEach(function () {
            var self = this;
            self.testModule = angular.module('test.app.frame.globalNavFooter', []);
            self.testModule.config(function (googleShareProvider) {
                self.serviceProvider = googleShareProvider;
            });
            angular.mock.module('app.frame.globalNavFooter', 'test.app.frame.globalNavFooter');
            angular.mock.inject(function (googleShare) {
                var self = this;
                self.service = googleShare;
            });
        });

        describe('Google Share Provider', function () {
            it('should update the default param values', function (done) {
                var self = this;
                self.serviceProvider.setDefaults({
                    context: 'results'
                });
                expect(self.serviceProvider.defaults.context).to.equal('results');
                done();
            });
        });

        describe('Google Share Service', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function (googleShareUtil, $q, $rootScope) {
                var self = this;

                self.q = $q;
                self.scope = $rootScope;

                self.utilStub = self.sinon.stub(googleShareUtil, 'loadLibrary', function () {
                    return $q.resolve({boom: 'works'});
                });
            }));
            describe('loadLibrary method', function () {
                it('should return library', function (done) {
                    var self = this;
                    self.service.loadLibrary()
                        .then(function (response) {
                            expect(response).to.deep.equal({boom: 'works'});
                            done();
                        });
                    self.scope.$digest();
                });
                it('should return cache', function (done) {
                    var self = this;
                    self.service.$promiseCache.loadLibrary = self.q.resolve({cache: true});
                    self.service.loadLibrary()
                        .then(function (response) {
                            expect(response).to.deep.equal({cache: true});
                            done();
                        });
                    self.scope.$digest();
                });
            });
        });
    });
});

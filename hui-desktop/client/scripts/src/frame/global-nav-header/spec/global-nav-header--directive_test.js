'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('global nav header Module', function () {

    beforeEach(angular.mock.module('app.frame.globalNav'));

    describe('globalNavHeader', function () {
        util.helpers.sinon(chai);

        describe('Directive', function () {
            util.helpers.directive(angular);

            beforeEach(angular.mock.inject(function ($rootScope, globalNavService, $q) {
                var self = this;

                self.sinon.globalNavServiceStub = self.sinon.stub(globalNavService, 'globalNav', function () {
                    return $q.resolve();
                });

                self.scope = $rootScope.$new();
                self.template = '<global-nav-header></global-nav-header>';

            }));

            it('should bind to an element', function (done) {
                var self = this;

                expect(self.$el.hasClass('global-nav-header')).to.be.true;
                done();
            });
        });

        describe('Controller', function () {

            beforeEach(angular.mock.inject(function ($controller, $q, $rootScope) {
                var self = this;

                self.scope = $rootScope;

                self.pagePropsRouter = {
                    goToLegacy: self.sinon.stub()
                };
                self.globalNavService = {
                    globalNav: self.sinon.stub().returns($q.resolve({
                        navLinks: 'ahsuh'
                    }))
                };

                self.controller = $controller('globalNavController', {
                    pagePropsRouter: self.pagePropsRouter,
                    globalNavService: self.globalNavService
                });
            }));

            it('should call globalNavService', function (done) {
                var self = this;

                self.scope.$digest();

                expect(self.globalNavService.globalNav.called).to.equal(true);
                expect(self.controller.navLinks).to.equal('ahsuh');
                done();
            });

            it('should call goToLegacy', function (done) {
                var self = this;

                self.controller.goToLegacy('hello');

                expect(self.pagePropsRouter.goToLegacy.called).to.equal(true);
                done();
            });

        });
    });
});

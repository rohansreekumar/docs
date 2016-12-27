'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Lightbox Module', function () {
    // Load huiLightbox module
    beforeEach(angular.mock.module('huiLightbox'));
    beforeEach(function () {
        var self = this;

        self.testModule = angular.module('test.huiLightbox', ['huiLightbox']);
        self.testModule.config(function (_lightboxProvider_) {
            self.lightboxProvider = _lightboxProvider_;
        });
        angular.mock.module('test.huiLightbox');
        angular.mock.inject();
    });

    describe('Lightbox Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(
            function (lightbox, ngDialog) {
                var self = this;

                self.service = lightbox;
                self.service.defaults.options.closePromise = function () { return true; };
                self.closePromiseSpy = self.sinon.spy(self.service.defaults.options, 'closePromise');
                self.ngDialog = {
                    open: self.sinon.stub(ngDialog, 'open', function () {
                        return {
                            closePromise: {
                                then: function (resolve, reject) { }
                            }
                        };
                    }),
                    close: self.sinon.stub(ngDialog, 'close')
                };
            }
        ));

        describe('$$dialog test', function () {
            it('should not open dialog if $$dialog is already defined', function () {
                var self = this;
                self.service.$$dialog = 'lightbox';
                self.service.openLightbox();
                expect(self.ngDialog.open).to.not.have.been.called;
            });
        });

        describe('Lightbox $$closeCallback', function () {
            it('should clear the dalog', function () {
                var self = this;
                self.service.$$dialog = 'lightbox';
                self.service.$$closeCallback();
                expect(self.service.$$dialog).to.not.equal('lightbox');
                expect(self.service.$$dialog).to.be.undefined;
            });
            it('should execute closePromise function on $$closeCallback', function () {
                var self = this;
                self.service.$$dialog = 'lightbox';
                self.service.$$closeCallback();
                expect(self.service.$$dialog).to.not.equal('lightbox');
                expect(self.service.$$dialog).to.be.undefined;
                expect(self.closePromiseSpy).to.have.been.called;
            });
        });
    });

    describe('Lightbox Provider', function () {
        it('should update the defaults.', function () {
            var self = this;
            self.lightboxProvider.setDefaults({
                thisIs: 'Sparta'
            });
            expect(self.lightboxProvider.defaults).to.have.property('thisIs', 'Sparta');
        });
    });

    describe('Open Lightbox Directive', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function (ngDialog, lightbox, $rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<a data-open-lightbox>Disclaimer</a>';
            self.openSpy = self.sinon.spy(ngDialog, 'open');
        }));

        it('should call the open lightbox method', function () {
            var self = this;
            self.$el.click();
            expect(self.openSpy).to.have.been.called;
        });
    });
});

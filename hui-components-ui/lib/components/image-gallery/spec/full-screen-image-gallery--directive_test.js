'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');

describe('Image Gallery Module', function () {
    //include module holding component to be tested
    beforeEach(angular.mock.module('huiImageGallery'));
    describe('Full Screen Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope,
                                                 ngDialog,
                                                 FullScreenGallery,
                                                 $timeout,
                                                 imageGallery) {
            var self = this;

            self.scope = $rootScope.$new();
            self.FullScreen = FullScreenGallery;
            self.imageGallery = imageGallery;
            self.ngDialog = self.sinon.spy(ngDialog, 'open');
            self.ngDialogClose = self.sinon.stub(ngDialog, 'close');
        }));
        afterEach(angular.mock.inject(function () {
            var self = this;
            if (self.FullScreen.dialog) {
                angular.element('#' + self.FullScreen.dialog.id).remove();
                self.FullScreen.dialog = null;
            }
        }));

        it('should open a modal when open() is called.', function () {
            var self = this;

            expect(self.FullScreen.dialog).to.equal(null);
            self.FullScreen.open(self.scope);
            expect(self.ngDialog).to.be.called;
            expect(self.FullScreen.dialog).not.equal(null);
        });


        it('should clear dialog on close', function () {
            var self = this;
            self.FullScreen.open(self.scope);
            self.scope.$apply();
            self.FullScreen.dialog.close(self.FullScreen.dialog.id);
            self.scope.$apply();
            expect(self.FullScreen.dialog).to.equal(null);
        });

        it('should only a gallery if one is not already open', function () {
            var self = this;

            expect(self.FullScreen.dialog).to.equal(null);
            self.FullScreen.open(self.scope);
            self.FullScreen.open(self.scope);
            expect(self.ngDialog.calledOnce).to.be.true;
            expect(self.FullScreen.dialog).to.not.equal(null);
        });
    });

    describe('Open Full Screen Directive', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope,
                                                 ngDialog,
                                                 FullScreenGallery,
                                                 $timeout,
                                                 imageGallery,
                                                 $window) {
            var self = this;
            self.scope = $rootScope.$new();
            self.window = $window;
            self.window.t_k = '_desktop';
            self.FullScreen = FullScreenGallery;
            self.ngDialogOpen = self.sinon.spy(ngDialog, 'open');
            self.scope.images = util.mock.pageProps('/property/id-2099276').property_detail.images;
        }));
        afterEach(angular.mock.inject(function () {
            var self = this;
            if (self.FullScreen.dialog) {
                angular.element('#' + self.FullScreen.dialog.id).remove();
                self.FullScreen.dialog = null;
            }
            self.window.t_k = null;
        }));
        it('should bind to an element', function () {
            var self = this; self.template = '<image-gallery ' +
                'data-show-counter="true"' +
                'data-name="udp-main-section-gallery" ' +
                'data-open-full-screen-gallery="images" ' +
                'data-images="images"></image-gallery>';
            self.sinon.openFull = self.sinon.stub(self.FullScreen, 'open');
            angular.element(self.$el).triggerHandler('click');
            expect(self.sinon.openFull.called).to.equal(true);
        });
        context('when openFullGalleryStart attribute is set', function () {
            it('should set the imageIndex on scope equal to the valued passed in', function () {
                var self = this;
                self.template = '<image-gallery ' +
                    'data-show-counter="true"' +
                    'data-name="udp-main-section-gallery" ' +
                    'data-open-full-screen-gallery-start="2"' +
                    'data-open-full-screen-gallery="images" ' +
                    'data-images="images"></image-gallery>';
                self.sinon.openFull = self.sinon.stub(self.FullScreen, 'open');
                angular.element(self.$el).triggerHandler('click');
                expect(self.scope.imageIndex).to.equal(2);
            });
        });
        context('when there is an imgGalleryCtrl set on the element', function () {
            it('should set the imageIndex on scope equal to the valued of imgGalleryCtrl.imageIndex', function () {
                var self = this;
                self.template = '<image-gallery ' +
                    'data-show-counter="true"' +
                    'data-name="udp-main-section-gallery" ' +
                    'data-open-full-screen-gallery="images" ' +
                    'data-images="images"></image-gallery>';
                self.sinon.openFull = self.sinon.stub(self.FullScreen, 'open');
                angular.element(self.$el).triggerHandler('click');
                expect(self.scope.imageIndex).to.equal(self.$el.controller('imageGallery').imageIndex);
            });
        });
        context('conditionally append dialog to dom', function () {
            beforeEach(function () {
                var self = this;
                self.template = '<image-gallery ' +
                    'data-show-counter="true"' +
                    'data-name="udp-main-section-gallery" ' +
                    'data-open-full-screen-gallery="images" ' +
                    'data-images="images"></image-gallery>';
            });
            it('should bind dialog to body tag if desktop', function () {
                var self = this;
                angular.element(self.$el).triggerHandler('click');
                expect(self.ngDialogOpen.args[0][0].appendTo).be.equal('body');
            });
            it('should bind dialog to div._centerContent if mobile', function () {
                var self = this;
                self.window.t_k = '_mobile';
                angular.element(self.$el).triggerHandler('click');
                expect(self.ngDialogOpen.args[0][0].appendTo).be.equal('._centerContent');
            });
        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');

describe('Image Gallery Module', function () {
    util.helpers.sinon(chai);
    beforeEach(angular.mock.module('huiImageGallery'));

    describe('Thumbnail Slider Directive', function () {
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope, thumbnailSlider) {
            var self = this;
            self.scope = $rootScope.$new();
            self.sinon.thumbnailSlider = {
                setMainSlider: self.sinon.stub(thumbnailSlider, 'setMainSlider'),
                moveSliderByIndex: self.sinon.stub(thumbnailSlider, 'moveSliderByIndex'),
                moveThumbSliderActiveIndex: self.sinon.stub(thumbnailSlider, 'moveThumbSliderActiveIndex')
            };

            self.scope.images = [
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                }
            ];
            self.scope.imageGalleryStart = 3;
            self.template = '<image-gallery data-name="test-gallery" ' +
                'data-images="images" ' +
                'data-is-desktop="true"' +
                'data-image-gallery-start="imageGalleryStart"' +
                'data-show-counter="true" data-image-gallery-start="startIndex">' +
                '<image-gallery>';

        }));

        it('should bind to an element', function () {
            var self = this;
            expect(self.$el.find('._holder').length).to.be.above(0);
        });
    });

    describe('Thumbnail Slider Controller', function () {
        beforeEach(angular.mock.inject(function ($rootScope, thumbnailSlider, $controller) {
            var self = this;
            self.scope = $rootScope.$new();
            self.sinon.thumbnailSlider = {
                setMainSlider: self.sinon.stub(thumbnailSlider, 'setMainSlider'),
                moveSliderByIndex: self.sinon.stub(thumbnailSlider, 'moveSliderByIndex'),
                moveThumbSliderActiveIndex: self.sinon.stub(thumbnailSlider, 'moveThumbSliderActiveIndex')
            };

            self.scope.images = [
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text'
                }
            ];
            self.thumbSliderSync = {};
            self.controller = $controller('thumbnailSliderController', {
                $scope: self.scope,
                $attrs: {}
            });

            self.controller.images = self.images;
            self.controller.thumbSliderSync = self.thumbSliderSync;
            self.controller.init();
        }));

        it('should call setMainslider service method on activeSlide', function () {
            var self = this;
            self.controller.activeSlide(2);
            expect(self.sinon.thumbnailSlider.setMainSlider.called).to.be.true;
        });

        it('should call moveThumbSliderActiveIndex in thumbSliderSync method on controller method call', function () {
            var self = this;
            self.thumbSliderSync.moveThumbSliderActiveIndex(2, true);
            expect(self.sinon.thumbnailSlider.moveThumbSliderActiveIndex.called).to.be.true;
        });

        it('should call  moveSliderByIndex on thumbnail slider next move', function () {
            var self = this;
            self.controller.moveThumbSlider (true);
            expect(self.sinon.thumbnailSlider.moveSliderByIndex.called).to.be.true;
        });

        it('should call  moveSliderByIndex on thumbnail slider previous move', function () {
            var self = this;
            self.controller.thumbsSliderState.imageIndex = 2;
            self.controller.moveThumbSlider (false);
            expect(self.sinon.thumbnailSlider.moveSliderByIndex.called).to.be.true;
        });
    });
});

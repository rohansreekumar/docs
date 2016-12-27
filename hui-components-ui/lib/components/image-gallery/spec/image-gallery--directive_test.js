'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');


describe('Image Gallery Module', function () {
    //include module holding component to be tested
    beforeEach(angular.mock.module('huiImageGallery'));
    describe('Image Gallery Controller', function () {
        before(function () {
            var self = this;
            self.testGalleryImages = function (gallery) {
                var imageArray = _.filter(gallery, function (image) {
                    return (!image.category && !image.src);
                });
                if (imageArray.length > 0) {
                    return false;
                } else {
                    return true;
                }
            };
        });

        beforeEach(angular.mock.inject(function ($rootScope, $controller, $location) {
            var self = this;
            self.location = $location;
            self.scope = $rootScope.$new();
            self.images = [
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

            self.categorized_images = {
                category: 'random',
                label: 'randomWords',
                images: [
                    {
                        src: 'http://cdn.homes.com/cgi-bin/readimage/2528320302',
                        alt: 'Alt Text'
                    },
                    {
                        src: 'http://cdn.homes.com/cgi-bin/readimage/2528320306',
                        alt: 'Alt Text'
                    },
                    {
                        src: 'http://cdn.homes.com/cgi-bin/readimage/2528320309',
                        alt: 'Alt Text'
                    }
                ]
            };

            self.controller = $controller('imageGalleryController',
                {
                    $scope: self.scope,
                    $attrs: {}
                });
        }));

        it('should expose the number of images', function () {
            var self = this;
            self.controller.images = self.images;
            self.controller.init();

            expect(self.controller.$count).to.eql(self.images.length);
        });

        it('should default to the first image', function () {
            var self = this;
            self.controller.images = self.images;
            self.controller.init();

            expect(self.controller.imageIndex).to.eql(0);
            expect(self.controller.imageIndex).to.not.be.undefined;
        });

        it('should use the URL image Id parameter for image gallery start if available', function () {
            var self = this;
            self.controller.images = self.images;
            self.location.search('imageId', '4');
            self.controller.urlImageId = self.location.search().imageId;
            self.controller.init();

            expect(self.controller.imageGalleryStart).to.eql(3);
        });

        it('should hide the counter', function () {
            var self = this;
            self.controller.images = self.images;
            self.controller.showCounter = false;
            self.controller.init();

            expect(self.controller.showCounter).to.not.be.undefined;
        });

        it('should set the $currentCategory to that of the first image', function () {
            var self = this;
            self.controller.images = self.categorized_images;
            self.controller.init();

            expect(self.controller.$currentCategory).to.eql('randomWords');
            expect(self.controller.$currentCategory).to.not.be.undefined;
        });

        it('should filter images of photos category', function () {
            var self = this;
            self.controller.images = [
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text',
                    category: 'photos'
                },
                {
                    src: 'http://placehold.it/350x150',
                    alt: 'Alt Text',
                    category: 'test'
                }
            ];
            self.controller.init();

            expect(self.controller.images.length).to.equal(1);
        });

        it('should not set the $currentCategory if the gallery image count is less than 0', function () {
            var self = this;
            self.controller.images = [];
            self.controller.init();

            expect(self.controller.$currentCategory).to.be.undefined;
        });

        describe('Update', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function (imageGallery) {
                var self = this;
                self.sinon.applyScope = self.sinon.spy(self.scope, '$apply');
                self.sinon.setWidth = self.sinon.spy(imageGallery, 'setWidth');
                self.goToSlide = self.sinon.stub(imageGallery, 'goToSlide');
                self.controller.images = self.images;
                self.controller.init();
                self.controller.thumbSliderSync.moveThumbSliderActiveIndex = self.sinon.spy();
            }));

            it('should set the width with the number images ', function () {
                var self = this;
                self.controller.setWidth();
                expect(self.sinon.setWidth.called).to.be.true;
            });

            it('should update the counts and category on the scope', function () {
                var self = this;
                self.controller.updateCount();
                expect(self.sinon.applyScope.called).to.be.true;
            });

            it('should call goToSlide on with true for next slide', function () {
                var self = this;
                self.controller.moveSlider(true);
                expect(self.goToSlide.called).to.be.true;
            });

            it('should call goToSlide on with true for next slide', function () {
                var self = this;
                self.controller.moveSlider();
                expect(self.goToSlide.called).to.be.true;
            });

            it('should call moveThumbSliderActiveIndex on next slide function call', function () {
                var self = this;
                self.controller.moveSlider();
                expect(self.controller.thumbSliderSync.moveThumbSliderActiveIndex.called).to.be.true;
            });
        });

        describe('When given uncategorized images', function () {

            it('should format images object for the gallery', function () {
                var self = this;
                self.controller.images = self.images;
                self.controller.init();
                expect(self.controller.images).to.satisfy(self.testGalleryImages);
            });
        });

        describe('When given no images', function () {

            it('should set images to an empty array', function () {
                var self = this;
                self.controller.init();
                expect(self.controller.images).to.be.empty;
            });
        });

        describe('When given categorized images', function () {
            it('should format images object for the gallery', function () {
                var self = this;
                self.controller.images = self.categorized_images;
                self.controller.init();
                expect(self.controller.images).to.satisfy(self.testGalleryImages);
            });
        });

        describe('When given a mix of categorized and uncategorized images', function () {
            it('should format images object for the gallery', function () {
                var self = this;
                self.images.push(self.categorized_images);
                self.controller.images = self.images;
                self.controller.init();
                expect(self.controller.images).to.satisfy(self.testGalleryImages);
            });
        });


        describe('When imageGalleryStart is set', function () {

            beforeEach(function () {
                var self = this;
                self.images.push(self.categorized_images);
                self.controller.images = self.images;
            });

            it('should updage the image index given a number', function () {
                var self = this;
                self.controller.imageGalleryStart = 3;
                self.controller.init();
                expect(self.controller.imageIndex).to.eql(3);
            });

            it('should update the image index given a category', function () {
                var self = this;
                self.controller.imageGalleryStart = 'random';
                self.controller.init();
                expect(self.controller.imageIndex).to.eql(5);
            });

            it('should start at 0 given a non existent category', function () {
                var self = this;
                self.controller.imageGalleryStart = 'puppies';
                self.controller.init();
                expect(self.controller.imageIndex).to.eql(0);
            });

            it('should start at the end if the index given is greater than array length', function () {
                var self = this;
                self.controller.imageGalleryStart = 2324;
                self.controller.init();
                expect(self.controller.imageIndex).to.eql(7);
            });

        });

    });

    describe('Image Gallery Directive', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope,
                                                 imageGallery) {
            var self = this;
            self.scope = $rootScope.$new();
            self.imageGalleryService = imageGallery;
            self.sinon.imageGallery = {
                start: self.sinon.stub(imageGallery, 'start'),
                move: self.sinon.stub(imageGallery, 'move'),
                end: self.sinon.stub(imageGallery, 'end'),
                goToSlide: self.sinon.spy(imageGallery, 'goToSlide'),
                icons: self.sinon.stub(imageGallery, 'icons')
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
            self.template = '<image-gallery data-name="test-gallery" ' +
                'data-images="images" ' +
                'data-show-counter="true" data-image-gallery-start="startIndex">' +
                '<image-gallery>';

        }));


        describe('Default behavior', function () {
            it('should bind to an element', function () {
                var self = this;
                expect(self.$el.find('._holder').length).to.be.above(0);
            });

            it('should display images', function () {
                var self = this;
                expect(self.$el.find('._slide').length).to.be.above(0);
            });

            it('should start on a particular image based on an argument which is the index of the image number', function () {
                var self = this, rendered;
                self.scope.startIndex = 4;
                rendered = self.$el.html();
                expect(self.sinon.imageGallery.goToSlide.called).to.be.true;
            });
        });

        describe('Touch behavior', function () {
            it('should start on touchstart', function () {
                var self = this;
                self.$el.find('._holder').trigger('touchstart');
                expect(self.sinon.imageGallery.start.called).to.be.true;
            });

            it('should move on touchmove', function () {
                var self = this;
                self.$el.find('._holder').trigger('touchmove');
                expect(self.sinon.imageGallery.move.called).to.be.true;
                expect(self.sinon.imageGallery.icons.called).to.be.true;
            });

            it('should end on touchend', function () {
                var self = this;
                self.$el.find('._holder').trigger('touchend');
                expect(self.sinon.imageGallery.end.called).to.be.true;
                expect(self.sinon.imageGallery.icons.called).to.be.true;
            });
        });
    });
});

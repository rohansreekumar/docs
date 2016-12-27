'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');


describe('Image Gallery Module', function () {
    beforeEach(angular.mock.module('huiImageGallery'));

    describe('Photo Counter Directive', function () {

        util.helpers.directive(angular);

        beforeEach(angular.mock.inject(function ($rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.scope.images = [
                {
                    src: 'http://cdn.homes.com/cgi-bin/readimage/2528320289',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://cdn.homes.com/cgi-bin/readimage/2528320291',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://cdn.homes.com/cgi-bin/readimage/2528320293',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://cdn.homes.com/cgi-bin/readimage/2528320296',
                    alt: 'Alt Text'
                },
                {
                    src: 'http://cdn.homes.com/cgi-bin/readimage/2528320297',
                    alt: 'Alt Text'
                }
            ];
            self.template = '<image-gallery data-images="images" data-show-counter="true"/>';

        }));

        it('should bind to an element', function () {
            var self = this, rendered = self.$el.html();
            expect(rendered).to.not.be.undefined;
        });

        describe('Photo Counter Image Index Display', function () {
            it('should display the number of photos in an associated gallery', function () {
                var self = this, totalImages, rendered = self.$el.html();
                totalImages = self.$el.find('.photo-counter--total-images').text();
                expect(totalImages).to.equal(String(self.scope.images.length));
            });

            it('should display the number of the current photo being shown in an associated gallery', function () {
                var self = this, currentImageIndex, rendered = self.$el.html();
                currentImageIndex = self.$el.find('.photo-counter--current-image').text();
                expect(currentImageIndex).to.equal(String(1));
            });
        });
    });
    describe('Photo Counter Current Category Display', function () {

        util.helpers.directive(angular);

        beforeEach(angular.mock.inject(function ($rootScope,
                                                 imageGallery,
                                                 $controller) {

            var self = this;
            self.scope = $rootScope.$new();
            self.scope.categorized_images = {
                category: 'community',
                label: 'community',
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
            self.template = '<image-gallery data-images="categorized_images" data-show-counter="true"/>';

        }));

        it('should show the current Category', function () {
            var self = this, currentCategory;

            currentCategory = self.$el.find('.photo-counter--current-category').text();

            expect(currentCategory).to.contain('community');
        });

    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    util = require('hui-components-mock/lib/test');

describe('Image Gallery Module', function () {
    beforeEach(angular.mock.module('huiImageGallery'));

    util.helpers.directive(angular);
    beforeEach(angular.mock.inject(function ($rootScope) {
        var self = this;
        self.scope = $rootScope.$new();
        self.scope.images = util.mock.pageProps('/property/id-2099276').property_detail.images;
        self.template = '<image-gallery data-image-gallery-sync="\'udp-main-section-gallery\'" data-images="images" data-name="fake-gallery" data-show-counter="true" data-image-gallery-start="startIndex"/>';
    }));

    describe('Image Gallery Utility Controller', function () {

        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($controller,
                                                 $window,
                                                 ngDialog,
                                                 $rootScope,
                                                 FullScreenGallery,
                                                 imageGallery) {
            var self = this, element;
            self.window = $window;
            self.fullScreenGalleryService = FullScreenGallery;
            self.imageGalleryService = imageGallery;
            self.sinon.goToSlide = self.sinon.stub(imageGallery, 'goToSlide');
            self.sinon.broadcast = self.sinon.stub(self.scope, '$broadcast');
            self.ngDialog = {
                open: self.sinon.stub(ngDialog, 'open', function () {
                    return {
                        closePromise: {
                            then: function (resolve, reject) {
                                //resolve();
                            }

                        }
                    };
                }),
                close: self.sinon.stub(ngDialog, 'close')
            };

            self.controller = $controller('imageGalleryUtilityController', {
                $scope: self.scope,
                $attrs: {
                    $$element: [
                        {
                            style: {
                                width: ''
                            }
                        }
                    ]
                }
            });
            self.controller.setGallery(self.$el.controller('imageGallery'));
        }));
        describe('setGallery Method', function () {
            it('should have a reference to the image gallery object', function () {
                var self = this;
                expect(self.controller.gallery).to.not.be.undefined;
            });
        });

        describe('getSlider Method', function () {
            it('should have a reference to the image gallery object', function () {
                var self = this;
                expect(self.controller.getSlider()).to.not.be.undefined;
            });
        });

        describe('getCount Method', function () {
            it('should have a reference to the number of images in the gallery object', function () {
                var self = this;
                expect(self.controller.getCount()).to.equal(self.$el.controller('imageGallery').$count);
            });
        });

        describe('getSliderWidth Method', function () {
            it('should return the width of the current gallery', function () {
                var self = this;
                expect(self.controller.getSliderWidth()).to.equal(angular.element(self.window).width());
            });
        });

        describe('calcWidth Method', function () {
            it('should return the width of the current gallery', function () {
                var self = this;
                expect(self.controller.calcWidth(20, 375)).to.equal(7500 + 'px');
            });
        });

        describe('updateWidth Method', function () {
            it('should set the holder width to the newly calculated width', function () {
                var self = this, newWidth;
                newWidth = self.controller.calcWidth(self.controller.getCount(), self.controller.getSliderWidth());
                self.controller.updateWidth();
                expect(self.controller.getSlider().el.holder[0].style.width).to.equal(newWidth);
            });
        });


        describe('syncGallery Method', function () {
            context('when the gallery requested is not in the queue', function () {
                it('should fail gracefully', function () {
                    var self = this;
                    self.tempSlider = {
                        controller: {
                            name: 'missing-gallery'
                        },
                        queue: true
                    };
                    self.controller.syncGallery('no-name-gallery', 3);
                    expect(self.imageGalleryService.get('no-name-gallery')).to.have.property('queue');
                });
            });

            context('when the gallery requested is in queue', function () {
                it('should adjust to to the correct slide on the current gallery', function () {
                    var self = this;
                    self.tempSlider = {
                        controller: {},
                        queue: false
                    };
                    self.imageGalleryService.update('fake-gallery', self.controller.gallery);
                    self.controller.syncGallery('fake-gallery', 3);
                    expect(self.sinon.goToSlide.called).to.be.true;
                });
            });
        });
    });

    describe('Image Gallery utility Controller with isDesktop attribute', function() {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($controller, imageGallery) {
            var self = this;
            self.template = '<image-gallery data-is-desktop="true" data-image-gallery-sync="\'udp-main-section-gallery\'" data-images="images" data-name="fake-gallery" data-show-counter="true" data-image-gallery-start="startIndex"/>';
            self.imageGalleryService = imageGallery;
            self.sinon.goToSlide = self.sinon.stub(imageGallery, 'goToSlide');
            self.controller = $controller('imageGalleryUtilityController', {
                $scope: self.scope,
                $attrs: {
                    $$element: [
                        {
                            style: {
                                width: ''
                            }
                        }
                    ]
                }
            });
            self.controller.setGallery(self.$el.controller('imageGallery'));
            self.sinon.moveThumbSliderActiveIndex = self.sinon.stub(self.controller.gallery.thumbSliderSync, 'moveThumbSliderActiveIndex');
        }));

        it('syncGallery Method', function () {
            var self = this;
            self.imageGalleryService.update('fake-gallery', self.controller.gallery);
            self.controller.syncGallery('fake-gallery', 3);
            expect(self.sinon.goToSlide.called).to.be.true;
            expect(self.sinon.moveThumbSliderActiveIndex.called).to.be.true;
        });
    });

    describe('Slider Utility Directives', function () {
        util.helpers.sinon(chai);
        describe('Binding', function () {
            it('should bind to an attribute', function () {
                var self = this,
                    directiveController = self.$el.find('._holder').controller('imageGalleryUtility');
                expect(directiveController).to.not.be.undefined;
            });
            context('when imageGallerySync has been set on the directive', function () {
                it('should call updateWidth function on ngDialog.close broadcast', function () {
                    var self = this,
                        directiveController = self.$el.find('._holder').controller('imageGalleryUtility'),
                        $dialog = {
                            data: {}
                        };
                    self.sinon.sync = self.sinon.stub(directiveController, 'syncGallery');
                    self.$el.scope().$parent.$broadcast('ngDialog.closing');
                    expect(self.sinon.sync.called).to.be.true;
                });
            });
            context('no image gallery or fullscreen gallery controller available', function () {
                beforeEach(angular.mock.inject(function () {
                    var self = this;
                    self.template = '<div data-image-gallery-utility></div>';
                }));
                it('should fail gracefully', function () {
                    var self = this,
                        el = self.$el[0]; // needs to be instatiated to show as covered.
                    expect(self.gallery).to.be.undefined;
                });
            });

        });
    });
});

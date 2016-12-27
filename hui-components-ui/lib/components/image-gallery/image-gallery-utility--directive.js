'use strict';

module.exports = function (ngModule) {


    /*
     * @ngdoc directive
     * @name imageGalleryUtility
     * @module huiImageGallery
     * @restrict A
     *
     * @example
     * <div data-image-gallery-utility></div>
     *
     * @require $window
     *
     * @description
     * Loads the initial width of the window onto the gallery images
     * to ensure they match the width of the gallery.
     *
     */
    ngModule.directive('imageGalleryUtility', [
        '$window',
        function ($window) {
            return {
                restrict: 'A',
                require: [
                    'imageGalleryUtility',
                    '?imageGallery',
                    '?fullScreenImageGallery'
                ],
                controller: 'imageGalleryUtilityController',
                controllerAs: 'imgGalUtilCtrl',
                bindToController: true,
                link: function (scope, element, attribute, ctrls) {
                    var utilCtrl = ctrls[0],
                        gallery,
                        slideIndex;


                    gallery = ctrls[1] || ctrls[2];

                    if (gallery) {
                        utilCtrl.setGallery(gallery);
                        slideIndex = gallery.imageIndex;
                    } else {
                        // fail silently
                        return;
                    }
                    if (gallery.imageGallerySync) {
                        scope.$on('ngDialog.closing', function () {
                            utilCtrl.syncGallery(gallery.imageGallerySync, gallery.imageIndex, attribute.isDesktop);
                            if (!attribute.isDesktop) {
                                utilCtrl.updateWidth();
                            }
                        });
                    }

                    if (!attribute.isDesktop) {
                        $window.addEventListener('resize', function () {
                            utilCtrl.updateWidth();
                            utilCtrl.adjustSlide();
                            scope.$broadcast('widthChange');
                        });
                    }
                }
            };
        }
    ]);

    /*
     * @ngdoc controller
     * @name imageGalleryUtilityController
     * @module huiImageGallery
     *
     * @requires _
     * @requires imageGallery
     *
     * @description
     * Performs operations on the image gallery directive.
     */
    ngModule.controller('imageGalleryUtilityController', [
        'imageGallery',
        function (imageGallery) {
            var self = this;

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#setGallery
             * @module huiImageGallery
             *
             * @description
             * Keeps a reference to the current gallery through its controller
             *
             * @param {Object} galleryCtrl The controller of the current gallery in the view
             *
             */
            self.setGallery = function (galleryCtrl) {
                self.gallery = galleryCtrl;
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#getSlider
             * @module huiImageGallery
             *
             * @description
             * Returns a reference to a gallery by name
             *
             * @returns {Object} - the image gallery that matches the name passed in.
             */
            self.getSlider = function () {
                return imageGallery.get(self.gallery.name);
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#getCount
             * @module huiImageGallery
             *
             * @description
             * Returns the number of images in the current gallery.
             *
             * @returns {Number} Number - Total number of images in the current gallery.
             *
             */
            self.getCount = function () {
                return self.gallery.$count;
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#getSliderWidth
             * @module huiImageGallery
             *
             * @description
             * Keeps a reference to width of the current gallery slider
             *
             * @returns {Number} - A reference to the width of the image gallery.
             */
            self.getSliderWidth = function () {
                return $(window).width();
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#calcWidth
             * @module huiImageGallery
             *
             * @param {number} count determines total number of images in gallery.
             * @param {number} width of the container to display single image.
             *
             * @description
             * Multiplies the number of images by the width of one slide.
             *
             * @returns {String} - The total width of the holder with `px` added to it.
             */

            self.calcWidth = function (count, width) {
                return count * width + 'px';
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#syncGallery
             * @module huiImageGallery
             *
             * @description
             * Takes the imageGallerySync parameter and uses it as a reference to the hidden gallery
             * when a fullscreen is open and a reference to the fullscreen gallery index and passes them
             * to the service for calculations.
             *
             * @param {String} Slave - a reference to the hidden gallery by name.
             * @param {Number} masterIndex - a reference to the index of the slide in the fullscreen gallery
             * @param {bool} isDesktop - is Syncing from desktop flag used while moving main gallery images
             *
             */
            self.syncGallery = function (slave, masterIndex, isDesktop) {
                // this will set the gallery returned from the service to a variable.
                var _slave = imageGallery.get(slave);
                if (_slave.queue) {
                    // bad id, entire imageGallery queue was returned
                    return;
                } else {
                    // use the returned gallery as the ref, no animation, and the fullscreen gallery index
                    // to make the hidden gallery show the same image when the fullscreen gallery is removed
                    // from the screen to imitate a `one gallery` experience.
                    imageGallery.goToSlide(_slave, false, masterIndex, isDesktop);

                    // Syncing main gallery thumbnail slider along with main gallery
                    // thumbnail will slide with active image has to visible displayed section with no animation
                    if (_slave.controller.thumbSliderSync && _slave.controller.thumbSliderSync.moveThumbSliderActiveIndex) {
                        _slave.controller.thumbSliderSync.moveThumbSliderActiveIndex(masterIndex, false);
                    }
                }
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#updateWidth
             * @module huiImageGallery
             *
             * @description
             * update the width of the gallery.
             */
            self.updateWidth = function () {
                // set a reference to the current slider/gallery to a variable
                var slider = self.getSlider();
                // set the holder to the newly calculated width.
                slider.el.holder[0].style.width = self.calcWidth(self.getCount(), self.getSliderWidth());
            };

            /**
             * @ngdoc method
             * @name imageGalleryUtilityController#adjustSlide
             * @module huiImageGallery
             *
             * @description
             * An auxilary function that calls the goToSlide method on the service. Mostly used when
             * the resize event is called.
             *
             */
            self.adjustSlide = function () {
                imageGallery.goToSlide(self.getSlider(), false, self.getSlider().controller.imageIndex);
            };
        }
    ]);
};

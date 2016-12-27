'use strict';

module.exports = function (ngModule) {

    /*
    * @ngdoc directive
    * @name thumbnailSlider
    * @module huiImageGallery
    * @restrict E
    *
    * @example
    * <image-gallery
    *      data-images="viewCtrl.pageProps.property_details.images.images"
    *      data-image-gallery-start="startIndex">
    *      <thumbnail-slider data-image-gallery-start="imgGalleryCtrl.imageGalleryStart"
    *                        data-thumb-slider-sync="imgGalleryCtrl.thumbSliderSync"
    *                        data-is-desktop="imgGalleryCtrl.isDesktop"
    *                        data-images="imgGalleryCtrl.images"
    *                        data-image-index="imgGalleryCtrl.imageIndex"
    *                        data-main-slider="imgGalleryCtrl.slider"></thumbnail-slider>
    *
    * </image-gallery>
    * @description
    * Displays the thumbnail slider within the main gallery frame
    *
    * @requires thumbnailSlider
    *
    * @param {array} images  determines array of the images to Displays
    * @param {number} imageIndex determines value of the current index
    * @param {object} mainSlider determines main gallery of thumbnail slider
    * @param {bool} isDesktop determines that is using by desktop or mx
    * @param {object} thumbSliderSync determines main gallery thumbnail slider to make sync with fullscreen
    * @param {number} imageGalleryStart determines image index to start thumbnail slider
    */
    ngModule.directive('thumbnailSlider', [
        'thumbnailSlider',
        function (thumbnailSlider) {
            return {
                restrict: 'E',
                replace: true,
                require: '^imageGallery',
                bindToController: true,
                controller: 'thumbnailSliderController',
                controllerAs: 'thumbnailSliderCtrl',
                templateUrl: '/ui/templates/thumbnail-slider.html',
                scope: {
                    images: '=',
                    imageIndex: '=',
                    mainSlider: '=',
                    isDesktop: '=',
                    thumbSliderSync: '=',
                    imageGalleryStart: '='
                },
                link: function (scope, element) {
                    var thumbSlider = {
                        el: element,
                        holder: $('.thumb-holder', element),
                        thumbsliderImageClass: '.thumbnail-slider-image',
                        mainSlider: scope.thumbnailSliderCtrl.mainSlider,
                        thumbnailsliderCtrl: scope.thumbnailSliderCtrl
                    };
                    scope.thumbnailSliderCtrl.thumbSlider = thumbSlider;

                    if (scope.thumbnailSliderCtrl.imageGalleryStart) {
                        thumbnailSlider.moveThumbSliderActiveIndex(scope.thumbnailSliderCtrl.imageGalleryStart, false, thumbSlider);
                    }

                }
            };
        }
    ]);


    /*
    * @ngdoc controller
    * @name thumbnailSliderController
    * @module huiImageGallery
    *
    * @description
    * controller for thumbnail slider gallery
    *
    * @requires thumbnailSlider
    */
    ngModule.controller('thumbnailSliderController', [
        'thumbnailSlider',
        function (thumbnailSlider) {
            var self = this,
                elementsToMove;

            /**
             * @ngdoc method
             * @name thumbnailSliderCtrl#getWidth
             * @module huiImageGallery
             *
             * @description
             *  Gets the object with width property
             *
             * @param {int} count determines number of images to calculate width
             *
             * @returns
             *  object with width property for style purpose
             */
            self.getWidth = function (count) {
                return { width: (65 * count) + 'px' };
            };


            /**
             * @ngdoc method
             * @name thumbnailSliderCtrl#activeSlide
             * @module huiImageGallery
             *
             * @description
             *  set selected image as active for main gallery slider
             *
             * @param {int} imageIndex determines selected image index to sync with main gallery
             */
            self.activeSlide = function (imageIndex) {
                self.imageIndex = imageIndex;
                thumbnailSlider.setMainSlider(self.thumbSlider, imageIndex);
            };


            /**
            * @ngdoc method
            * @name thumbnailSliderCtrl#moveThumbSlider
            * @module huiImageGallery
            *
            * @description
            *  Moves slider right and left with navigation operations
            *
            * @param {bool} isNext determines direction of the slider movement
            */
            self.moveThumbSlider = function (isNext) {
                elementsToMove = self.thumbsToShow;
                if (isNext) {
                    if ((self.thumbsSliderState.imageIndex + self.thumbsToShow) + self.thumbsToShow > self.images.length) {
                        elementsToMove = self.thumbsToShow - (((self.thumbsSliderState.imageIndex + self.thumbsToShow) + self.thumbsToShow) - self.images.length);
                    }
                    self.thumbsSliderState.imageIndex = self.thumbsSliderState.imageIndex + elementsToMove;
                } else {
                    if (self.thumbsSliderState.imageIndex - elementsToMove < 0) {
                        elementsToMove = elementsToMove - (elementsToMove - self.thumbsSliderState.imageIndex);
                    }
                    self.thumbsSliderState.imageIndex = self.thumbsSliderState.imageIndex - elementsToMove;
                }

                thumbnailSlider.moveSliderByIndex(self.thumbsSliderState.imageIndex, true, self.thumbSlider);

            };


            /**
            * @ngdoc method
            * @name thumbnailSliderCtrl#init
            * @module huiImageGallery
            *
            * @description
            * Initiates thumbnail gallery slider image processing functions.
            */
            self.init = function () {
                self.thumbsToShow = 5;
                self.images = self.images || [];
                self.thumbsSliderState = {
                    imageIndex: 0,
                    sliderCount: Math.floor(self.images.length / self.thumbsToShow)
                };

                //checking for Syc details with image gallery
                if (self.thumbSliderSync) {
                    self.thumbSliderSync.moveThumbSliderActiveIndex = function (imageIndex, isAnimate) {
                        thumbnailSlider.moveThumbSliderActiveIndex(imageIndex, isAnimate, self.thumbSlider);
                    };
                }
            };

            self.init();
        }
    ]);
};

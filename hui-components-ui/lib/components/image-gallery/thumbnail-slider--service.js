'use strict';

/**
 * @ngdoc service
 * @name thumbnailSlider
 * @module huiImageGallery
 *
 * @description
 * Image Thumbnail slider common methods
 *
 * @requires imageGallery
 */
module.exports = function (ngModule) {
    ngModule.service('thumbnailSlider', [
        'imageGallery',
        function (imageGallery) {
            var service = this;

            /**
             * @ngdoc method
             * @name thumbnailSlider#getActiveImageStartIndex
             * @module huiImageGallery
             *
             * @description
             * Loop images as batch of five(thumbsToShow) files and comparing with indexes,
             * to find out proper starting index for slider and returns start index of five(thumbsToShow) images
             *
             * @param images {Array} array of images to check active image
             * @param imageIndex {int} active image index
             * @param thumbsToShow {int} number of images has to show in slide
             *
             * @return int
             *  Index of the image that slider has to starts with active image in it.
             */
            service.getActiveImageStartIndex = function (images, imageIndex, thumbsToShow) {
                for (var i = 0; i < images.length; i = i + thumbsToShow) {
                    if (i <= imageIndex && imageIndex < i + thumbsToShow) {
                        if (i + thumbsToShow >= images.length) {
                            return i - (thumbsToShow - (images.length - i));
                        } else {
                            return i;
                        }
                    }
                }
            };

            /**
             * @ngdoc method
             * @name thumbnailSlider#getThumbnailWidth
             * @module huiImageGallery
             *
             * @description
             *  Calculates the width of the image element in the thumbnail slider
             *
             * @param thumbSlider {Object} contains details of thumbnail slider
             *
             * @return int
             *  width of the thumbnail image in slider
             *
             */
            service.getThumbnailWidth = function (thumbSlider) {
                return ($(thumbSlider.thumbsliderImageClass, thumbSlider.el).first().outerWidth() || 60) + 5;
            };

            /**
             * @ngdoc method
             * @name thumbnailSlider#moveSliderByIndex
             * @module huiImageGallery
             *
             * @description
             *  move slider by image index with animate option using translate3d
             *
             * @param  imageIndex {int} image index to set slider position
             * @param  isAnimate {bool} option for skip animation effect
             * @param  thumbSlider {Object} has properties for thumbnail slider
             */
            service.moveSliderByIndex = function (imageIndex, isAnimate, thumbSlider) {
                if (isAnimate) {
                    thumbSlider.holder.addClass('is-animate').css({ transform: 'translate3d(-' + (imageIndex * service.getThumbnailWidth(thumbSlider)) + 'px,0,0)' });
                } else {
                    thumbSlider.holder.removeClass('is-animate').css({ transform: 'translate3d(-' + (imageIndex * service.getThumbnailWidth(thumbSlider)) + 'px,0,0)' });
                }
            };

            /**
             * @ngdoc mthod
             * @name thumbnailSlider#setMainSlider
             * @module huiImageGallery
             *
             * @description
             *  Sets navigation for main image gallery using thubnail slider image clicks
             *
             * @param thumbSlider {Object} contains properties for thumbnail slider
             * @param imageIndex {int} image index to show in main gallery
             *
             */
            service.setMainSlider = function (thumbSlider, imageIndex) {
                imageGallery.goToSlide(thumbSlider.mainSlider, true, imageIndex, true);
            };


            /**
            * @ngdoc method
            * @name thumbnailSlider#moveThumbSliderActiveIndex
            * @module huiImageGallery
            *
            * @description
            * Sync method from main slider to thumbnail slider, checks for active image is visible in thumbnail slider
            * and move slider to respective slide section with active image as visible in slider
            *
            * @param imageIndex {int} image index to check which section of slider has it
            * @param isAnimate {bool} option for skip animation effect
            * @param thumbSlider {Object} contains properties for thumbnail slider
            *
            */
            service.moveThumbSliderActiveIndex = function (imageIndex, isAnimate, thumbSlider) {
                if (!(thumbSlider.thumbnailsliderCtrl.thumbsSliderState.imageIndex <= imageIndex && imageIndex < thumbSlider.thumbnailsliderCtrl.thumbsSliderState.imageIndex + thumbSlider.thumbnailsliderCtrl.thumbsToShow)) {
                    thumbSlider.thumbnailsliderCtrl.thumbsSliderState.imageIndex = service.getActiveImageStartIndex(thumbSlider.thumbnailsliderCtrl.images, imageIndex, thumbSlider.thumbnailsliderCtrl.thumbsToShow);
                    service.moveSliderByIndex(thumbSlider.thumbnailsliderCtrl.thumbsSliderState.imageIndex, isAnimate, thumbSlider);
                }
            };

        }
    ]);
};

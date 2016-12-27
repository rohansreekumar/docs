'use strict';

/**
 * @ngdoc service
 * @name imageGallery
 * @module huiImageGallery
 *
 * @description
 * Image Gallery Service common functions
 *
 * @requires $timeout
 */

module.exports = function (ngModule) {
    ngModule.service('imageGallery', [
        '$timeout',
        function ($timeout) {
            var service = this;

            /**
             * @ngdoc object
             * @name imageGallery#$queue
             * @description
             * The saved galleries.
             *
             * @type {Object}
             */
            service.$queue = {
                queue: true
            };

            /**
             * @ngdoc method
             * @name imageGallery#update
             * @module huiImageGallery
             *
             * @description
             * update the queue object of the passed in galleryId with the gallery object configurations
             *
             * @param {string} galleryId Identifier for this gallery in the imageGallery.$queue. Usually equal to the
             *                          configurations of the corresponding gallery.
             * @param {object} configs The configurations for the gallery
             *
             */
            service.update = function (galleryId, configs) {
                // set the search queue object to the most recent search
                if (service.$queue[galleryId]) {
                    angular.extend(service.$queue[galleryId], configs);
                } else {
                    service.$queue[galleryId] = configs;
                }
            };

            /**
             * @ngdoc method
             * @name imageGallery#get
             * @module huiImageGallery
             *
             * @description
             * Get an image gallery object for the provided galleryId from imageGallery.$queue. If unset, return false.
             *
             * @param {string} galleryId Identifier for this gallery in the imageGallery.$queue. Usually equal to the
             *                          context of the gallery
             *
             * @returns
             *  gallery configuration object with respective to galleryId
             */
            service.get = function (galleryId) {
                // if the queue object is undefined return false
                if (service.$queue[galleryId] === undefined) {
                    return service.$queue;
                } else {

                    return service.$queue[galleryId];
                }

            };

            /**
             * @ngdoc method
             * @name imageGallery#setIndex
             *
             * @param {object} ref reference of the image gallery object
             * @param {number=} index the desired index to start the image gallery at.
             *
             * @description
             * If called, sets the index of the current image gallery to the one passed as the second argument
             *
             * @return {object} The service for chaining.
             */
            service.setIndex = function (ref, index) {
                // if index is not undefined set the current image gallery imageIndex to that value.
                if (index !== undefined) {
                    ref.controller.imageIndex = index;
                } else {
                    // otherwise, call the update count function on the controller
                    ref.controller.updateCount();
                }
                // set the current category to the label of the current images index.
                ref.controller.$currentCategory = ref.controller.images[ref.controller.imageIndex].label;

                // return the reference object.
                return this;
            };

            /**
             * @ngdoc method
             * @name imageGallery#start
             *
             * @param {object} ref reference of the image gallery object
             * @param {object} event jQuery object that contains properties of the touch event.
             *
             * @description
             * Captures the start of the touch event and determines if its a swipe or just a long touch.
             */
            service.start = function (ref, event) {
                // Get the original touch position.
                service.touchstartx = event.originalEvent.touches[0].pageX;
                // reset the distance movement calculation to correct touch events causing animation.
                service.movex = 0;
                // The movement gets all janky if there's a transition on the elements.
                $('.is-animate', ref.el.slider).removeClass('is-animate');
            };

            /**
             * @ngdoc method
             * @name imageGallery#move
             *
             * @param {object} ref reference of the image gallery object
             * @param {object} event jQuery object that contains properties of the touch event.
             *
             * @description
             * Calculates the distance moved during the touch event.
             */
            service.move = function (ref, event) {
                // Continuously return touch position.
                var touchmovex = event.originalEvent.touches[0].pageX;
                // Calculate distance to translate holder.
                service.movex = ref.controller.imageIndex * ref.el.slider.width() + (service.touchstartx - touchmovex);
                // Defines the speed the images should move at.
                angular.element(ref.el.holder).css({
                    transform: 'translate3d(-' + service.movex + 'px,0,0)',
                    '-webkit-transform': 'translate3d(-' + service.movex + 'px,0,0)'
                });
            };

            /**
             * @ngdoc method
             * @name imageGallery#end
             *
             * @param {object} ref reference of the image gallery object
             *
             * @description
             * Determines the end of the touch event and increments or decrements the index based on movement calculations.
             */
            service.end = function (ref) {
                // Calculate the distance swiped.
                var absMove = (service.movex) ? Math.abs(ref.controller.imageIndex * ref.el.slider.width() - service.movex) : 0;

                // NOTE Use this calcuation to modify the scroll distance needed to initiate the swipe animation.
                // Calculate the index. All other calculations are based on the index.
                if (absMove > ref.el.slider.width() / 5) {
                    // if the movment is greather than the index multiplied by the width of the slider & index is less than the total amount of images
                    // - 1 (to account for 0 based array counts), then increment the slider index.
                    if (service.movex > ref.controller.imageIndex * ref.el.slider.width() && ref.controller.imageIndex < ref.controller.$count - 1) {
                        ref.controller.imageIndex++;
                        // otherwise, if the movement is less than the index of the current gallery multiplied by the width of the current gallery
                        // and the index is greater than 0, decrement the slider index.
                    } else if (service.movex < ref.controller.imageIndex * ref.el.slider.width() && ref.controller.imageIndex > 0) {
                        ref.controller.imageIndex--;
                    }
                }

                // call the go to slide function, pass in the corresponding slider and set animate to true
                service.goToSlide(ref, true);
            };

            /**
             * @ngdoc method
             * @name imageGallery#goToSlide
             *
             * @param {object} ref reference of the image gallery object
             * @param {bool=} animate true if a smooth animation transition is desired. False to start the gallery
             * at the index without a scrolling transition.
             * @param {number=} slideIndex the desired index to start the image gallery at.
             * @param {bool=} animate only holder if it is loaded in desktop
             *
             * @description
             * Animate the slide transition with css.
             */
            service.goToSlide = function (ref, animate, slideIndex, isDesktop) {
                if (isDesktop) {
                    if (animate) {
                        ref.el.holder.addClass('is-animate').css({
                            transform: 'translate3d(-' + slideIndex * ref.el.slider.width() + 'px,0,0)',
                            '-webkit-transform': 'translate3d(-' + slideIndex * ref.el.slider.width() + 'px,0,0)'
                        });
                    } else {
                        ref.el.holder.removeClass('is-animate').css({
                            transform: 'translate3d(-' + slideIndex * ref.el.slider.width() + 'px,0,0)',
                            '-webkit-transform': 'translate3d(-' + slideIndex * ref.el.slider.width() + 'px,0,0)'
                        });
                    }
                } else if (animate) {
                    // Move and animate the elements.
                    ref.el.holder.addClass('is-animate').css({
                        transform: 'translate3d(-' + ref.controller.imageIndex * ref.el.slider.width() + 'px,0,0)',
                        '-webkit-transform': 'translate3d(-' + ref.controller.imageIndex * ref.el.slider.width() + 'px,0,0)'
                    });
                    ref.el.imgSlide.addClass('is-animate').css({
                        transform: 'translate3d(-' + 100 - ref.controller.imageIndex * 50 + 'px,0,0)',
                        '-webkit-transform': 'translate3d(-' + 100 - ref.controller.imageIndex * 50 + 'px,0,0)'
                    });
                } else {
                    ref.el.holder.removeClass('is-animate').css({
                        transform: 'translate3d(-' + slideIndex * $(window).width() + 'px,0,0)',
                        '-webkit-transform': 'translate3d(-' + slideIndex * $(window).width() + 'px,0,0)'
                    });
                    ref.el.imgSlide.removeClass('is-animate').css({
                        transform: 'translate3d(-' + 100 - slideIndex * 50 + 'px,0,0)',
                        '-webkit-transform': 'translate3d(-' + 100 - slideIndex * 50 + 'px,0,0)'
                    });
                }

                // set the slide index of the current gallery to the index passed in to the function.
                service.setIndex(ref, slideIndex);
            };

            /**
             * @ngdoc method
             * @name imageGallery#setWidth
             *
             * @param {number} count The number of images in the gallery.
             *
             * @description
             * Used to determine the width of the image gallery container.
             *
             * @return
             * CSS property: value pair
             */
            service.setWidth = function (count) {
                var dynamicSlideWidth = 100 / count;

                return { width: dynamicSlideWidth + '%' };
            };

            /**
             * @ngdoc method
             * @name imageGallery#icons
             *
             * @param {object} ref reference of the image gallery object
             * @param {bool=} active determines image slider is in sliding or not
             * is not sliding
             *
             * @description
             * Hide icons when swiping through gallery, then show icons after 3 seconds of not swiping.
             */
            service.icons = function (ref, active) {
                service.iconsContainer = ref.el.icons.children('.main-section-icons');

                if (active) {
                    service.iconsContainer.addClass('is-hide');

                    if (service.showHideTimer) {
                        $timeout.cancel(service.showHideTimer);
                        service.showHideTimer = null;
                    }
                } else {
                    service.showHideTimer = $timeout(function () {
                        service.iconsContainer.removeClass('is-hide');
                    }, 3000);
                }
            };
        }
    ]
    );
};

'use strict';

module.exports = function (ngModule) {

    /*
     * @ngdoc controller
     * @name huiImageGallery.controller:imageGalleryController
     *
     * @requires $scope
     * @requires $location
     * @requires imageGallery
     * @requires $parse
     * @requires $attrs
     * @requires _
     *
     * @description
     * Performs operations on the image gallery directive.
     */
    ngModule.controller('imageGalleryController', [
        '$scope',
        '$location',
        'imageGallery',
        '$parse',
        '$attrs',
        '_',
        function (
            $scope,
            $location,
            imageGallery,
            $parse,
            $attrs,
            _
            ) {
            var _this = this;

            _this.urlImageId = $location.search().imageID;

            /**
             * @ngdoc method
             * @name init
             * @methodOf huiImageGallery.controller:imageGalleryController
             *
             * @description
             * Initiates image gallery image processing functions.
             */
            _this.init = function () {
                var photos, showCounter;
                // check to see if there are actually images being passed in to the gallery first.
                if (!_this.images) {
                    return;
                }

                // if a URL is passed in by pinterest or other location, take the imageId param and use that for image gallery start.
                if (_this.urlImageId) {
                    _this.imageGalleryStart = _this.urlImageId - 1;
                }

                if (!_.isArray(_this.images)) {
                    _this.images = [_this.images];
                }

                if ($attrs.showCounter) {
                    _this.showCounter = $parse($attrs.showCounter)($scope);
                }

                // format images into a single dim array of images
                // this will be used to set up the images that don't have a category to the default of 'photos'.
                photos = {
                    category: 'photos',
                    images: []
                };

                // loop through _this.images and return only the objects either having category as 'photos' or dont have category property
                photos.images = _.filter(_this.images, function (image) {
                    return !image.category || (image.category && image.category === 'photos');
                });

                // if (photos.images.length > 0) {
                _this.images = _(_this.images)
                    .filter(function (imageOrCategory) {
                        if (imageOrCategory.category) {
                            return imageOrCategory;
                        }
                    })
                    .thru(function (images) {
                        images.unshift(photos);
                        return images;
                    })
                    .map(function (category) {
                        return _.map(category.images, function (image) {
                            image.category = category.category;

                            if (category.label) {
                                image.label = category.label;
                            }
                            return image;
                        });
                    })
                    // flatten the array
                    .flatten().value();
                // }


                // set the $count variable on the controller to length of the images array
                _this.$count = _this.images.length;

                _this.imageIndex = 0;
                _this.thumbSliderSync = {};

                /**
                 * @ngdoc method
                 * @name moveSlider
                 * @methodOf huiImageGallery.controller:imageGalleryController
                 *
                 * @param {bool} isNext determines direction of the slider to move
                 *
                 * @description
                 * Calls the goToSlide function on the imageGallery service with slider, imageIndex and isDesktop attribute
                 *
                 */
                _this.moveSlider = function (isNext) {
                    if (isNext) {
                        _this.imageIndex = _this.imageIndex + 1;
                    } else {
                        _this.imageIndex = _this.imageIndex - 1;
                    }
                    if (_this.thumbSliderSync.moveThumbSliderActiveIndex && _.isFunction(_this.thumbSliderSync.moveThumbSliderActiveIndex)) {
                        _this.thumbSliderSync.moveThumbSliderActiveIndex(_this.imageIndex, true);
                    }
                    imageGallery.goToSlide(_this.slider, true, _this.imageIndex, _this.isDesktop);
                };

                // if there is an image gallery start passed in from the details controller start this block
                if (_this.imageGalleryStart) {
                    if (isNaN(_this.imageGalleryStart)) {
                        _this.imageIndex = _.findIndex(_this.images, function (image) {
                            return image.category === _this.imageGalleryStart;
                        });

                    } else {
                        _this.imageIndex = _this.imageGalleryStart;
                    }

                    if (_this.imageIndex === -1) {
                        _this.imageIndex = 0;
                    } else if (_this.imageIndex > _this.images.length - 1) {

                        _this.imageIndex = _this.images.length - 1;
                    }
                }
                if (_this.$count > 0) {
                    _this.$currentCategory = _this.images[_this.imageIndex].label;
                }
            };


            /**
             * @ngdoc method
             * @name setWidth
             * @methodOf huiImageGallery.controller:imageGalleryController
             *
             * @description
             * Calls the setWidth function on the imageGallery service and passes in the total number of images
             * in the gallery.
             *
             * @returns {object} contains width data
             */
            _this.setWidth = function () {
                return imageGallery.setWidth(_this.$count);
            };

            /**
             * @ngdoc method
             * @name updateCount
             * @methodOf huiImageGallery.controller:imageGalleryController
             *
             * @description
             * Keeps the $currentCategory variable updated with the label of the current image.
             */
            _this.updateCount = function () {
                _this.$currentCategory = _this.images[_this.imageIndex].label;

                // TODO: MA supoosed angular anti-patter to avoid $digest already in progress
                // error. Will continue to research a better way.
                if (!$scope.$root.$$phase) {
                    $scope.$apply();
                }
            };

            _this.init();
        }
    ]);

    var imageGalleryDirective = function (templateUrl) {
        return function ($, _, imageGallery) {
            return {
                restrict: 'E',
                replace: true,
                bindToController: {
                    images: '=',
                    imageGalleryStart: '=',
                    name: '@',
                    imageGallerySync: '=',
                    isDesktop: '@',
                    fullscreenLeftpanelPlaceholder: '@'
                },
                controller: 'imageGalleryController',
                controllerAs: 'imgGalleryCtrl',
                templateUrl: templateUrl,
                scope: {},
                link: function (scope, element) {

                    /**
                     * @ngdoc object
                     * @name huiImageGallery.imageGalleryController:slider
                     *
                     * @description
                     *  set slider object 'el' equal to elements on the dom with some extras
                     */
                    var slider = {
                        el: {
                            slider: element,
                            holder: $('._holder', element),
                            imgSlide: $('._slide', element),
                            icons: element.parent()
                        },
                        slideWidth: element.width(),
                        controller: scope.imgGalleryCtrl
                    };

                    /**
                     * @ngdoc method
                     * @name bindUIEvents
                     * @methodOf huiImageGallery.imageGalleryController:slider
                     *
                     * @description
                     * This method binds touch events captured by the directive to handlers in the imageGallery service.
                     */
                    slider.bindUIEvents = function () {
                        slider.el.holder.on('touchstart', function (event) {
                            imageGallery.start(slider, event);
                        });

                        slider.el.holder.on('touchmove', function (event) {
                            event.preventDefault();
                            imageGallery.move(slider, event);
                            imageGallery.icons(slider, true);
                        });

                        slider.el.holder.on('touchend', function (event) {
                            imageGallery.end(slider, event);
                            imageGallery.icons(slider, false);
                        });

                    };



                    /**
                     * @ngdoc function
                     * @name initImageGallery
                     *
                     * @description
                     * This function sets the slider holder element's width, sets up event bindings and advances slider to the imageGalleryStart value
                     */
                    function initImageGallery () {
                        var dynamicWidth;

                        dynamicWidth = slider.slideWidth * slider.controller.$count;
                        slider.el.holder.width(dynamicWidth + 'px');

                        scope.imgGalleryCtrl.slider = slider;

                        imageGallery.update(slider.controller.name, slider);

                        slider.bindUIEvents();

                        if (slider.controller.imageIndex !== 0) {
                            imageGallery.goToSlide(slider, false, slider.controller.imageIndex, slider.controller.isDesktop);
                        }
                    }

                    initImageGallery();
                }
            };
        };
    };

    /*
     * @ngdoc directive
     * @name huiImageGallery.directive:imageGallery
     *
     * @restrict E
     *
     * @param {object|array} images An image, set of images within an array or an image gallery object.
     * @param {string|number=} imageGalleryStart A number or category which can be used to set the index of the image
     * gallery to a specific image.
     * @param {string} name determines name of the gallery which can be used to find out specific gallery in service.
     * @param {object} imageGallerySync determines object to sync with thumbnail and full screen gallery objects.
     * @param {bool} isDesktop determines gallery is loading desktop or mx site.
     * @param {string} fullscreenLeftpanelPlaceholder determines template url for showing html on media full screen left side panel
     *
     *
     * @description
     * The image gallery directive which sets up an image gallery and binds touch events to it.
     * It also sets the width of the gallery and if an index is given, causes the gallery to
     * transition to the slide requested.
     *
     * @requires $
     * @requires _
     * @requires imageGallery
     *
     * @returns {object} An instance of the image gallery directive.
     */

    ngModule.directive('imageGallery', [
        '$',
        '_',
        'imageGallery',
        imageGalleryDirective('/ui/templates/image-gallery.html')
    ]);

    ngModule.directive('fullScreenImageGallery', [
        '$',
        '_',
        'imageGallery',
        imageGalleryDirective('/ui/templates/full-screen-image-gallery.html')
    ]);
};

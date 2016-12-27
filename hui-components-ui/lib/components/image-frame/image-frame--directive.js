'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name imageFrame
     * @module huiImageFrame
     * @restrict A
     *
     * @description
     * Exposes api to size and position an image inside of a frame.
     *
     * @param imageFramePortraitSize {expression=fit} How to size portrait images inside the frame Either 'cover' or 'fit'
     * @param imageFrameLandscapeSize {expression=cover} How to size landscape or square images inside the frame Either 'cover' or 'fit'
     *
     * @example
     *
     * <div image-frame image-frame-portrait-size="'cover'" image-frame-landscape-size="'cover'">
     *       <img ng-src="'/images/blank.png'"/>
     * </div>
     *
     */
    ngModule
        .directive('imageFrame', function ($window) {
            return {
                restrict: 'A',
                require: 'imageFrame',
                controllerAs: 'imageFrameCtrl',
                controller: 'imageFrameController',
                link: function (scope, element, attrs, ctrl) {
                    var imageFrame = ctrl,
                        image = element.find('img')[0],
                        container = element[0];

                    imageFrame.init(container, image);

                    /**
                     * When image loads, set the size of the image and change
                     * opacity back to 1
                     */
                    image.onload = function () {
                        // image loads successfully

                        imageFrame.setSize();
                    };
                }
            };
        })

    /**
     * @ngdoc controller
     * @name imageFrameController
     * @module huiImageFrame
     * @requires $scope
     * @requires $attrs
     * @requires $parse
     * @requires $window
     *
     * @description
     *
     *  resizes images, treats square images as landscape
     *  defaults to portrait fit, landscape cover
     */
        .controller('imageFrameController', [
            '$scope',
            '$attrs',
            '$parse',
            '$window',
            function (
                $scope,
                $attrs,
                $parse,
                $window
            ) {

                var self = this, init, orientation;

                self.image = {};
                self.container = {};

                /**
                 * @ngdoc method
                 * @name imageFrameController#testInit
                 * @description
                 * Displays warning in console if image frame is not initialized prior to image sizing during debug
                 * @returns {imageFrame} self for chaining
                 */
                self.testInit = function () {
                    if (!init) {
                        if ($window.debug) {
                            console.warn('Image frame not initialized.', self); // jshint ignore: line
                        }
                    }
                    return self;
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#getOrientation
                 * @description
                 * Determine's image's orientation, long side and short side
                 *
                 * @returns {imageFrame} self for chaining
                 */
                self.getOrientation = function () {
                    self.testInit();

                    if (!orientation) {
                        self.image.aspectRatio = self.imageEl.width / self.imageEl.height;

                        if (self.image.aspectRatio < 1) {
                            self.image.shortSide = 'width';
                            self.image.longSide = 'height';
                            self.container.clientShortSide = 'clientWidth';
                            self.container.clientLongSide = 'clientHeight';
                            self.image.orientation = 'portrait';
                        } else {
                            // (treat square images as landscape)
                            self.image.shortSide = 'height';
                            self.image.longSide = 'width';
                            self.container.clientShortSide = 'clientHeight';
                            self.container.clientLongSide = 'clientWidth';
                            self.image.orientation = 'landscape';
                        }

                        orientation = true;
                    }

                    return self;
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#getScaledDimensions
                 * @description
                 * Calculates dimensions of image if scaled to cover container.
                 * @returns {imageFrame} self for chaining
                 */
                self.getScaledDimensions = function () {
                    self.testInit();

                    self.image.scaled = {
                        width: self.image.aspectRatio * self.containerEl.clientHeight,
                        height: $(window).width() / self.image.aspectRatio
                    };
                    return self;
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#setSize
                 * @description
                 * Checks settings for the correct size for the image orientation and resizes image
                 *
                 * @returns {imageFrame} self for chaining
                 */

                self.setSize = function () {
                    // make sure orientation is set
                    self.getOrientation();

                    if (self.settings.fit[self.image.orientation]) {

                        return self.fitSize();
                    }

                    if (self.settings.cover[self.image.orientation]) {

                        return self.coverSize();
                    }
                    // if there is no setting for this orientation, then just show the image ;
                    /* istanbul ignore next: there was probably an error in orientation detection or initialization, this might happen if the image was invalid */
                    return self.showSizedImage();
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#clearSize
                 * @description
                 * Clears set image sizes for refreshing image size
                 *
                 * @returns {imageFrame} self for chaining
                 */
                self.clearSize = function () {
                    self.testInit();

                    self.imageEl.style.width = 'initial';
                    self.imageEl.style.height = 'initial';

                    return self;
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#coverSize
                 * @description
                 * Resizes an image to cover a container element by setting the appropriate style property.
                 *
                 * @returns {imageFrame} self for chaining
                 */
                self.coverSize = function () {
                    var scaled = self.getOrientation()
                        .clearSize()
                        .getScaledDimensions()
                        .image
                        .scaled;

                    if (scaled[self.image.longSide] <= self.containerEl[self.container.clientLongSide]) {
                        // the long won't be long enough
                        self.imageEl.style[self.image.longSide] = self.containerEl[self.container.clientLongSide] + 'px';
                    } else if (scaled[self.image.shortSide] <= self.containerEl[self.container.clientShortSide]) {
                        self.imageEl.style[self.image.shortSide] = self.containerEl[self.container.clientShortSide] + 'px';
                    }

                    return self.showSizedImage();
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#fitSize
                 * @description
                 * Resizes an image to fit inside a container element by setting the appropriate style propery to 100%
                 *
                 * @returns {imageFrame} self for chaining
                 */
                self.fitSize = function () {
                    var scaled = self.getOrientation()
                        .clearSize()
                        .getScaledDimensions()
                        .image
                        .scaled;

                    if (scaled[self.image.longSide] <= self.containerEl[self.container.clientLongSide]) {
                        // fit with the shortest side
                        self.imageEl.style[self.image.shortSide] = '100%';
                    } else if (scaled[self.image.shortSide] <= self.containerEl[self.container.clientShortSide]) {
                        self.imageEl.style[self.image.longSide] = '100%';
                    }

                    return self.showSizedImage();
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#positionImage
                 * @description
                 * Sets the base styles for an image frame and contained image
                 *
                 * @returns {imageFrame} self for chaining
                 */
                self.positionImage = function () {
                    self.testInit();


                    if (self.containerEl.style.position !== 'relative' && self.containerEl.style.position !== 'absolute') {
                        self.containerEl.style.position = 'relative';
                    }
                    self.containerEl.style.overflow = 'hidden';

                    /**
                     * Determine if image is being provided by Prerender and
                     * runs imageFrame.setSize() because images do not trigger
                     * onload events when provided by Prerender
                     */
                    if (!$window._phantom) {
                        self.imageEl.style.opacity = 0; // hiding image until it is done being resized.
                        self.imageEl.style.position = 'absolute';
                        self.imageEl.style.top = '50%';
                        self.imageEl.style.left = '50%';
                        self.imageEl.style.transform = 'translate(-50%, -50%)'; // no x-browser needed: http://caniuse.com/#feat=transforms2d
                        self.imageEl.style.webkitTransform = 'translate(-50%, -50%)';
                    }


                    return self;
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#showSizedImage
                 *
                 * @description
                 * For use after resizing is complete. Makes image visible.
                 *
                 * @returns {imageFrame} self for chaining
                 */
                self.showSizedImage = function () {
                    self.testInit();

                    self.imageEl.style.opacity = 1;

                    return self;
                };

                /**
                 * @ngdoc method
                 * @name imageFrameController#init
                 *
                 * @descripton
                 * Set the image container and image elements for all subsequent activities. Also reads the settings for image size.
                 * @param container {HTMLElement} Image container
                 * @param image {HTMLElement} Image
                 * @returns {imageFrame}
                 */
                self.init = function (container, image) {
                    var portraitSize, // setting for sizing portrait images
                        landscapeSize; // setting for sizing landscape images

                    if (!container || !image) {
                        return;
                    }
                    if (!init) {
                        self.imageEl = image;
                        self.containerEl = container;

                        // reading directive params, didn't want to create scope for an attribute directive
                        landscapeSize = $parse($attrs.imageFrameLandscapeSize)($scope);
                        portraitSize = $parse($attrs.imageFramePortraitSize)($scope);

                        // Settings for how to fit image in frame. Default is for portrait images to fit and landscape images to cover.
                        self.settings = {
                            fit: {},
                            cover: {}
                        };

                        // imageFramePortraitSize and imageFrameLandscape size have two possible values, 'fit' and 'cover'.
                        if (portraitSize) {
                            self.settings[portraitSize].portrait = true;
                        } else {
                            // default
                            self.settings.fit.portrait = true;
                        }
                        if (landscapeSize) {
                            self.settings[landscapeSize].landscape = true;
                        } else {
                            // default
                            self.settings.cover.landscape = true;
                        }

                        // no need to init twice
                        init = true;

                        // style container and image for position and hide until re-sized
                        return self.positionImage();
                    } else {
                        return self;
                    }
                };
            }
        ]);

};

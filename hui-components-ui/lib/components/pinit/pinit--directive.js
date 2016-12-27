'use strict';

module.exports = function (ngModule) {

    ngModule

        /**
         * @ngdoc directive
         * @name pinit
         * @module huiPinit
         * @restrict E
         * @description
         * Directive for displaying the Pinit Button on a gallery slide.
         *
         * @param {String} pinitId - slide image index
         * @param {String} pinitSrc - slide image source
         * @param {String} pinitAlt - slide image alt tag
         * @param {bool} isDesktop -  rendering in desktop flag
         *
         * @requires $window
         * @requires _
         *
         * @example
         * <pinit ng-if="gallerySlideImageCtrl.slideShowPinit" pinit-id="gallerySlideImageCtrl.slideImageIndex" pinit-src="gallerySlideImageCtrl.slideImgSrc" pinit-alt="gallerySlideImageCtrl.slideImgAlt"></pinit>
         */
        .directive('pinit', [
            '$window',
            '_',
            function (
                $window,
                _) {
                return {
                    restrict: 'E',
                    replace: true,
                    require: [
                        'pinit',
                        '^imageFrame'
                    ],
                    controller: 'pinitController',
                    controllerAs: 'pinitCtrl',
                    bindToController: true,
                    templateUrl: '/ui/templates/pinit-button.html',
                    scope: {
                        pinitId: '=',
                        pinitSrc: '=',
                        pinitAlt: '=',
                        isDesktop: '='
                    },
                    link: function (scope, element, attr, ctrls) {
                        var pinitCtrl = ctrls[0],
                            imageFrameCtrl = ctrls[1],
                            resizeListener,
                            resizeListenerOpacity;

                        /* istanbul ignore next: pinitCtrl.position(imageFrameCtrl) already being tested in controller tests */
                        resizeListener = _.debounce(function () {
                            pinitCtrl.position(imageFrameCtrl);
                        }, 100, true);

                        /* istanbul ignore next: pinitCtrl.opacity(imageFrameCtrl) already being tested in controller tests */
                        resizeListenerOpacity = _.debounce(function () {
                            pinitCtrl.opacity(element);
                        }, 100, true);


                        if (!pinitCtrl.isDesktop) {
                            $window.addEventListener('resize', resizeListenerOpacity);
                            $window.addEventListener('resize', resizeListener);
                        }

                        pinitCtrl.position(imageFrameCtrl);

                        /* istanbul ignore next: beign taken care of in afterEach cleanups in the angular helpers when merged */
                        scope.$on('$destroy', function () {
                            $window.removeEventListener('resize', resizeListenerOpacity);
                            $window.removeEventListener('resize', resizeListener);
                        });
                    }
                };
            }
        ])

        /**
         * @ngdoc controller
         * @name pinitController
         * @module huipinit
         * @description
         * Controller for the Pinit button.
         * Calculates image width & height offsets for pinit button after a slight delay to allow the imageFrameCtrl to be populated.
         * Constructs the Pinit button href url using the pinitID, pinitSrc & pinitAlt.
         *
         * @requires $location
         * @requries $timeout
         */
        .controller('pinitController', [
            '$location',
            '$timeout',
            function ($location, $timeout) {
                var self = this,
                    setPinitUrl = function (hostUrl) {
                        self.href = '//www.pinterest.com/pin/create/button/?url=' + hostUrl +
                                self.pageUrl +
                                '?imageID=' +
                                (self.pinitId + 1) +
                                '&amp;media=' +
                                self.pinitSrc +
                                '&amp;description=' +
                                self.pinitAlt;
                    };
                self.pageUrl = $location.path();

                /**
                 * @ngdoc method
                 * @name pinitCtrl#position
                 *
                 * @param {object} imageFrameCtrl determines the reference to image gallery controller which contains pinit.
                 *
                 * @description
                 *  Sets the position or url of pinit and position of pinit based on isDesktop flag
                 */
                self.position = function (imageFrameCtrl) {
                    if (!self.isDesktop) {
                        $timeout(function () {
                            self.pinitTranslateX = imageFrameCtrl.imageEl.width / 2;
                            self.pinitTranslateY = imageFrameCtrl.imageEl.height / 2;
                            setPinitUrl('http://m.homes.com');
                        }, 200);
                    } else {
                        setPinitUrl('http://homes.com');
                    }
                };

                /**
                 * @ngdoc method
                 * @name pinitCtrl#opacity
                 *
                 * @param {object} element determines the pinit DOM element to set opacity.
                 *
                 * @description
                 *  Sets the opacity to pinit element passed to it.
                 */
                self.opacity = function (element) {
                    element.css('opacity', '0');
                };
            }
        ]);
};

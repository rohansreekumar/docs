'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name gallerySlideImage
     * @module huiImageGallery
     * @restrict E
     *
     * @description
     * A gallery slide optimized for a single image
     *
     * @param slideImgAlt {expression} Evaluates to string that is the alt of the image for the slide
     * @param slideImgSrc {expression} Evaluates to string that is the src of the image for the slide
     * @param slidePortraitSize {expression} Evaluates to string that determines fit or cover on slider
     * @param slideLandscapeSize {expression} Evaluates to string that determines fit or cover on slider
     * @param slideImageIndex {expression} Evaluates to number that is the $index number of the image in the gallery
     * @param slideShowPinit {expression} Evaluates as boolean that determines whether or not to show a pinit button for the image
     * @param isDesktop {expression} Evaluates as boolean that determines it is used in desktop or mx sites
     *
     * @example
     * <gallery-slide-image slide-img-src="viewCtrl.pageProps.property_detail.primary_image.src"></gallery-slide-image>
     */
    ngModule
        .directive('gallerySlideImage', function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: '/ui/templates/gallery-slide-image.html',
                require: ['imageFrame'],
                bindToController: {
                    slideImgSrc: '=',
                    slideImgAlt: '=',
                    slidePortraitSize: '=',
                    slideLandscapeSize: '=',
                    slideImageIndex: '=',
                    slideShowPinit: '=',
                    isDesktop: '='
                },
                controllerAs: 'gallerySlideImageCtrl',
                controller: 'gallerySlideImageController',
                link: function (scope, element, attrs, ctrls) {
                    var imageFrame = ctrls[0];

                    scope.$on('widthChange', function () {
                        imageFrame.setSize();
                    });
                }
            };
        })

    /**
     * @ngdoc controller
     * @name gallerySlideImageController
     * @module huiImageGallery
     * @requires $scope
     *
     * @description
     * Performs functions on the gallery slide image directive.
     *
     */
        .controller('gallerySlideImageController', [
            '$scope',
            function ($scope) {

                var self = this;
            }
        ]);
};

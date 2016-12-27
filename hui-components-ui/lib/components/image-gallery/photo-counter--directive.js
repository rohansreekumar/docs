'use strict';

module.exports = function (ngModule) {

    /*
     * @ngdoc controller
     * @name photoCounterController
     * @module details
     * @description
     * Performs operations on the photo counter directive.
     */
    ngModule.controller('photoCounterController',
        function () {}
    );

    /*
     * @ngdoc directive
     * @name photoCounter
     * @module details
     * @restrict E
     *
     * @example
     * <image-gallery
     *      data-images="viewCtrl.pageProps.property_details.images.images"
     *      data-image-gallery-start="startIndex">
     *      <photo-counter class="image-gallery--counter _counter"
     *              data-ng-if="imgGalleryCtrl.showCounter"></photo-counter>
     * </image-gallery>
     * @description
     * Displays the current image index related to the total number of images.
     *
     * @requires imageGallery
     */

    ngModule.directive('photoCounter',
        function () {
            return {
                restrict: 'E',
                replace: true,
                require: '^imageGallery',
                bindToController: true,
                controller: 'photoCounterController',
                controllerAs: 'photoCtrl',
                templateUrl: '/ui/templates/photo-counter.html',
                scope: true
            };
        });

};

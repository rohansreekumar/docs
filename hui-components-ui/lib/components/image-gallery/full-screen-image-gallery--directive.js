'use strict';


module.exports = function (ngModule) {


    /**
     * @ngdoc service
     * @name FullScreenGallery
     * @module huiDetails
     * @description
     * Keeps track of the full screen dialog
     *
     * @requires ngDialog
     * @requires modalThemeClass
     * @requires $window
     */

    ngModule.service('FullScreenGallery', [
        'ngDialog',
        'modalThemeClass',
        '$window',
        function (
            ngDialog,
            modalThemeClass,
            $window
        ) {

            var service = {
                dialog: null
            };

            /**
             * @ngdoc method
             * @name FullScreenGallery#open
             *
             * @param {object} fullScreenScope determines the controller scope contains images and imageIndex to start
             *
             * @description
             * Open the full screen dialog (provided it's not already open).
             */
            service.open = function (fullScreenScope) {
                if (!service.dialog) {
                    service.dialog = ngDialog.open({
                        name: 'fullScreen',
                        className: modalThemeClass + ' modal--full full-screen-gallery',
                        template: '<full-screen-image-gallery data-image-gallery-sync="\'udp-main-section-gallery\'" data-images="images" data-name="full-page-gallery" data-image-gallery-start="imageIndex"></full-screen-image-gallery>',
                        appendTo: $window.t_k === '_desktop' ? 'body' : '._centerContent',
                        scope: fullScreenScope,
                        plain: true,
                        showClose: true,
                        closeByDocument: false
                    });

                    service.dialog.closePromise.then(function () {
                        service.dialog = null;
                    });
                }
            };

            return service;
        }
    ]);

    /**
     * @ngdoc directive
     * @name openFullScreenGallery
     * @module huiImageGallery
     * @restrict A
     * @description
     * Open Full Screen Gallery when clicked.
     *
     * @requires $parse
     * @requires FullScreenGallery
     *
     * <div data-open-full-screen-gallery></div>
     */
    ngModule.directive('openFullScreenGallery', [
        '$parse',
        'FullScreenGallery',
        function ($parse, FullScreenGallery) {
            return {
                restrict: 'A',
                require: '?imageGallery',
                link: function (scope,
                                element,
                                attr,
                                imgGalleryCtrl) {

                    scope.images = $parse(attr.openFullScreenGallery)(scope);
                    element.on('click', function () {
                        if (attr.openFullScreenGalleryStart) {
                            scope.imageIndex = $parse(attr.openFullScreenGalleryStart)(scope);
                        } else if (imgGalleryCtrl) {
                            scope.imageIndex = imgGalleryCtrl.imageIndex;
                        }
                        FullScreenGallery.open(scope);
                    });
                }
            };
        }
    ]);
};

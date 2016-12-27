'use strict';


module.exports = function (ngModule) {


    /**
     * @ngdoc service
     * @name fullScreenBingMaps
     * @module huiBingMaps
     *
     * @description
     * Keeps track of the full screen dialog
     *
     * @requires ngDialog
     */

    ngModule.service('fullScreenBingMaps', [
        'ngDialog',
        'modalThemeClass',
        function (
            ngDialog,
            modalThemeClass
        ) {

            var service = {
                dialog: null
            };

            /**
             * @ngdoc method
             * @name fullScreenBingMaps#open
             *
             * @description
             * Open the full screen dialog (provided it's not already open).
             *
             * @param  {object} fullScreenScope scope to be passed to modal
             */
            service.open = function (fullScreenScope) {
                if (!service.dialog) {
                    service.dialog = ngDialog.open({
                        name: 'fullScreen',
                        className: modalThemeClass + ' modal--full full-screen-gallery',
                        template: '<detail-bing-map class="bing-maps--full-screen" data-address="address"></detail-bing-map>',
                        appendTo: '._centerContent',
                        scope: fullScreenScope,
                        plain: true,
                        showClose: true
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
     * @name openFullScreenBingMaps
     * @module huiBingMaps
     * @restrict A
     *
     * @description
     * Open Full Screen Bing Map when clicked.
     *
     * @requires $parse
     * @requires fullScreenBingMaps
     *
     * <div data-open-full-screen-bing-map></div>
     */
    ngModule.directive('openFullScreenBingMaps', [
        '$parse',
        'fullScreenBingMaps',
        function ($parse, fullScreenBingMaps) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {

                    scope.address = $parse(attr.openFullScreenBingMaps)(scope);

                    element.on('click', function () {

                        fullScreenBingMaps.open(scope);
                    });
                }
            };
        }
    ]);
};

'use strict';

/**
 * @ngdoc provider
 * @name lightboxProvider
 * @module huiLightbox
 *
 * @description
 * lightbox service provider
 *
 */

/**
 * @ngdoc service
 * @name lightbox
 * @module huiLightbox
 *
 * @requires _
 * @requires $rootScope
 * @requires ngDialog
 *
 * @description
 * Opens a lightbox dialog box with the provided title and description
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('lightbox',
        function () {
            var _this = this;

            /**
             * @ngdoc object
             * @name lightboxProvider#defaults
             *
             * @description
             * defaults for lightbox.
             *
             **/
            _this.defaults = {
                options: {
                    className: 'modal-close--small',
                    closeByDocument: true,
                    closeByNavigation: false,
                    controller: '',
                    controllerAs: '',
                    showClose: true,
                    templateUrl: '/ui/templates/hui-lightbox.html',
                    closePromise: function () { return true; }
                }
            };
            /**
             * @ngdoc method
             * @name lightboxProvider#setDefaults
             * @description
             * Set defaults for lightbox
             *
             * @param {object} newDefaults New defaults to extend the existing
             *
             **/
            _this.setDefaults = function (newDefaults) {
                _this.defaults = angular.extend(_this.defaults, newDefaults);
            };

            /**
             * @ngdoc method
             * @name lightboxProvider#$get
             * @description
             * provider for lightbox
             *
             * @requires $rootScope
             * @requires _
             * @requires ngDialog
             * @requires modalThemeClass
             *
             **/
            _this.$get = [
                '$rootScope',
                '_',
                'ngDialog',
                'modalThemeClass',
                function (
                    $rootScope,
                    _,
                    ngDialog,
                    modalThemeClass
                ) {

                    var self = this,
                        privateMethods = {},
                        publicMethods = {};

                    /**
                     * @name lightbox#$$closeCallback
                     * @description
                     * Clears self.$$dialog on close
                     *
                     * @private
                     */
                    privateMethods.$$closeCallback = function () {
                        self.$$dialog = undefined;
                        if (_.isFunction(self.defaults.options.closePromise)) {
                            self.defaults.options.closePromise();
                        }
                    };

                    /**
                     * @ngdialog method
                     * @name lightbox#openLightbox
                     * @description
                     * Method that opens the lightbox if it isn`t already open and calls the $$closeCallback privateMethod upon close to clear out $$dialog.
                     *
                     * @param {object} scope object containing the lightbox title and description
                     */
                    publicMethods.openLightbox = function (scope) {
                        // open the dialog if it isn't already there
                        if (!self.$$dialog) {
                            self.$$dialog = ngDialog.open({
                                className: modalThemeClass + ' ' + self.defaults.options.templateUrl,
                                showClose: self.defaults.options.showClose,
                                scope: scope,
                                templateUrl: self.defaults.options.templateUrl,
                                controller: self.defaults.options.controller,
                                controllerAs: self.defaults.options.controllerAs,
                                closeByDocument: self.defaults.options.closeByDocument,
                                closeByNavigation: self.defaults.options.closeByNavigation
                            });

                            // clear the dialog on close
                            self.$$dialog.closePromise.then(privateMethods.$$closeCallback);
                        }
                    };

                    return _.extend(self, publicMethods, privateMethods);
                }
            ];
        }
    )

        /**
         * @ngdoc directive
         * @name openLightbox
         * @description
         * Handles the click on the attribute or element containing open-lightbox.
         * Calls the lightbox service to launch a dialog with the provided title and description.
         * Sets the scope title and description for use in the lightbox template used in the service.
         *
         * @param {string} title        - The title for the lightbox. This will appear in the light bar across the to of the lightbox dialog. is not restricted to 1 line
         * @param {string} description  - The description for the lightbox. This can include html code such as p, ul, li, div, strong, em, etc.
         *
         * @requires lightbox
         *
         * @example
         * *As attribute*
         * <a data-open-lightbox data-title="Disclaimer" data-description="This is the disclaimer lightbox text and shall display text associated with helping to explain the disclaimer">Disclaimer</a>
         * *As element*
         * <open-lightbox data-title="Random lightbox Title" data-description="<p>I am paragraph 1 of the lightbox description text</p><p>I am paragraph 2 of the lightbox description text</p>"></open-lightbox>
         */
        .directive('openLightbox', [
            'lightbox',
            function (lightbox) {
                var directive = {
                    restrict: 'AE',
                    scope: {
                        title: '@',
                        description: '@'
                    },
                    link: function (scope, element) {
                        element.on('click touchend', function () {
                            lightbox.openLightbox(scope);
                        });
                    }
                };
                return directive;
            }
        ]);
};

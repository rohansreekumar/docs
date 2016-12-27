'use strict';

/**
 * @ngdoc provider
 * @name tooltipProvider
 * @module huiTooltip
 *
 * @description
 * tooltip service provider
 *
 */

/**
 * @ngdoc service
 * @name tooltip
 * @module huiTooltip
 *
 * @requires _
 * @requires $rootScope
 * @requires ngDialog
 *
 * @description
 * Opens a tooltip dialog box with the provided title and description
 *
 */

module.exports = function (ngModule) {

    ngModule
        .provider('tooltip',
        function () {
            var _this = this,
                defaults = {};

            /**
             * @ngdoc method
             * @name tooltipProvider#setDefaults
             * @description
             * Set defaults for tooltip
             *
             * @param {object} newDefaults New defaults to extend the existing
             *
             **/
            _this.setDefaults = function (newDefaults) {
                _this.defaults = angular.extend(defaults, newDefaults);
            };

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
                     * @name tooltip#$$closeCallback
                     * @description
                     * Clears self.$$dialog on close
                     *
                     * @private
                     */
                    privateMethods.$$closeCallback = function () {
                        self.$$dialog = undefined;
                    };

                    /**
                     * @ngdialog method
                     * @name tooltip#openTooltip
                     * @description
                     * Method that opens the tooltip dialog if it isn`t already open and calls the $$closeCallback privateMethod upon close to clear out $$dialog.
                     *
                     * @param {object} scope object containing the tooltip title and description
                     */
                    publicMethods.openTooltip = function (scope) {
                        // open the dialog if it isn't already there
                        if (!self.$$dialog) {
                            self.$$dialog = ngDialog.open({
                                className: modalThemeClass + ' modal--right tooltip',
                                showClose: false,
                                scope: scope,
                                templateUrl: '/ui/templates/hui-tooltip.html'
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
     * @name openTooltip
     * @description
     * Handles the click on the attribute or element containing open-tooltip.
     * Calls the tooltip service to launch a dialog with the provided title and description.
     * Sets the scope title and description for use in the tooltip template used in the service.
     *
     * @param {string} title        - The title for the tooltip. This will appear in the light bar across the to of the tooltip dialog. is not restricted to 1 line
     * @param {string} description  - The description for the tooltip. This can include html code such as p, ul, li, div, strong, em, etc.
     *
     * @requires tooltip
     *
     * @example
     * *As attribute*
     * <a data-open-tooltip data-title="Disclaimer" data-description="This is the disclaimer tooltip text and shall display text associated with helping to explain the disclaimer">Disclaimer</a>
     * *As element*
     * <open-tooltip data-title="Random Tooltip Title" data-description="<p>I am paragraph 1 of the tooltip description text</p><p>I am paragraph 2 of the tooltip description text</p>" class="icon-hui icon-hui--tooltip-full"></open-tooltip>
     */
        .directive('openTooltip', [
            'tooltip',
            function (tooltip) {
                var directive = {
                    restrict: 'AE',
                    scope: {
                        title: '@',
                        description: '@'
                    },
                    link: function (scope,
                                    element) {
                        element.on('click touchend', function () {
                            tooltip.openTooltip(scope);
                        });
                    }
                };
                return directive;
            }
        ]);
};

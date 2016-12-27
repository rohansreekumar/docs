'use strict';

/**
 * @ngdoc provider
 * @name modalWatcherProvider
 * @module huiModals
 *
 * @description
 * modalWatcher service provider
 *
 */

/**
 * @ngdoc service
 * @name modalWatcher
 * @module huiModals
 *
 * @description
 * Watchers for ngDialog
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('modalWatcher', function () {

        var _this = this;

        _this.defaults = {};

        /**
         * @ngdoc method
         * @name modalWatcherProvider#setDefaults
         * @description
         *
         * Set defaults for modalWatcher
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/

        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            '$rootScope',
            'openModals',
            'modalOpenClass',
            '_',
            function (
                $rootScope,
                openModals,
                modalOpenClass,
                _
            ) {
                var self = this,
                    publicMethods = {};

                self.$$clear = []; // de-register Watchers

                self.options = {
                    isDesktop: false
                };

                /**
                 * Opened dialog event callback
                 * @private
                 * @param  {event} e       broadcast event
                 * @param  {object} $dialog the dialog
                 */
                self.$openedDialog = function (e, $dialog) {

                    var dialog = {};

                    if ($dialog.name) {
                        dialog.name = $dialog.name;
                    }

                    // ngDialog adds id in a different place depending on whether the dialog was named during creation
                    dialog.id = ($dialog.dialog) ? $dialog.dialog[0].id : $dialog[0].id;

                    openModals.add(dialog); // update open modals
                    modalOpenClass.update(); // update classes for elements that care

                    $rootScope.modalsActive = openModals.getActive();
                };

                /**
                 * Closing dialog callback
                 * @private
                 * @param  {event} e       broadcast event
                 * @param  {object} $dialog the dialog
                 */
                self.$closingDialog = function (e, $dialog) {
                    var $dialogElem = ($dialog.dialog) ? $dialog.dialog[0] : $dialog;
                    // we can't use the name for removing/ adding because ngDialog never passes it back on close.
                    openModals.remove($dialogElem[0] ? $dialogElem[0].id : $dialogElem.id);
                    if (self.options.isDesktop) {
                        $dialogElem.animate({ opacity: 0 }, 500, function () {
                            $dialogElem.remove();
                            $rootScope.$broadcast('ngDialog.closed', $dialogElem);
                        });
                    }
                    $rootScope.modalsActive = openModals.getActive();
                };

                /**
                 * Closed dialog callback
                 * @private
                 * @param  {event} e       broadcast event
                 * @param  {object} $dialog the dialog
                 */
                self.$closedDialog = function (e, $dialog) {
                    modalOpenClass.update(); // update body class
                };

                /**
                 * @name modalWatcher#setWatchers
                 * @ngdoc method
                 * @description
                 * Set up watchers for ngDialog events
                 *
                 */
                publicMethods.setWatchers = function (options) {
                    _.extend(self.options, options);
                    self.$$clear.push($rootScope.$on('ngDialog.opened', self.$openedDialog));

                    self.$$clear.push($rootScope.$on('ngDialog.closing', self.$closingDialog));

                    self.$$clear.push($rootScope.$on('ngDialog.closed', self.$closedDialog));

                    return publicMethods.disableWatchers;
                };

                /**
                 * @name modalWatcher#disableWatchers
                 * @ngdoc method
                 *
                 * @return {[type]} [description]
                 */
                publicMethods.disableWatchers = function () {
                    _.forEach(self.$$clear, function (deregister) {
                        if (_.isFunction(deregister)) {
                            deregister();
                        }
                    });
                };

                return angular.extend(self, publicMethods);
            }
        ];

    });

};

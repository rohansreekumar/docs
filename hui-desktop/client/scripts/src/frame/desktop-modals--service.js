'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc service
     * @name DesktopModals
     * @module frame
     *
     * @descripton
     * Desktop devices need extra animation handling to work.
     *
     * @requires LockScroll
     * @requires openModals
     */

    ngModule.service('DesktopModals', [
        'LockScroll',
        'openModals',
        function (
            LockScroll,
            openModals
        ) {

            /**
             * @ngdoc method
             * @name DesktopModals#opened
             * @description
             *
             * Changes when a modal opens, like locking scroll
             */
            this.open = function () {
                LockScroll.lock();
            };

            /**
             * @ngdoc method
             * @name DesktopModals#closed
             * @description
             *
             * Changes when modals close, like unlocking scroll
             */
            this.close = function () {
                if (!openModals.getActive()) {
                    LockScroll.unlock();
                }
            };

            return this;
        }
    ]);


    ngModule.run([
        '$rootScope',
        'DesktopModals',
        function (
            $rootScope,
            DesktopModals
        ) {

            $rootScope.$on('ngDialog.opened', function () {
                DesktopModals.open();
            });

            $rootScope.$on('ngDialog.closed', function () {
                DesktopModals.close();
            });

            return this;
        }
    ]);
};

'use strict';

/**
 * @ngdoc service
 * @name openModals
 * @module huiModals
 *
 * @reqiures _
 *
 * @description
 * Tracks what modals are open
 *
 */

module.exports = function (ngModule) {

    ngModule.service('openModals', [
        '_',
        function (_) {

            var service = this;

            service.$current = [];

            /**
             * @ngdoc method
             * @name openModals#getActive
             * @description
             *
             * Check if modals are open
             *
             * @returns {boolean} whether a modal is open
             */
            service.getActive = function () {
                return !!service.$current.length;
            };

            /**
             * @ngdoc method
             * @name openModals#add
             * @description
             *
             * set that modal is open
             *
             * @param {string} modal Id and name of modal returned by ngDialog
             */
            service.add = function (modal) {
                service.$current.push(modal);

            };

            /**
             * @ngdoc method
             * @name openModals#remove
             * @description
             *
             * set that modal is no longer open
             *
             * @param {string} id Id of modal returned by ngDialog
             */
            service.remove = function (id) {
                _.remove(service.$current, {id: id});
            };
        }
    ]);

};

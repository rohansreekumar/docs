'use strict';

/**
 * @ngdoc service
 * @name dfpRendered
 * @module huiDfp
 * @require _
 * @require $rootScope
 *
 * @description
 * Determine if the dfp has rendered or not.
 *
 */
module.exports = function (ngModule) {

    ngModule.service('dfpRendered', [
        '_',
        '$rootScope',
        function (_, $rootScope) {
            var self = this;

            /**
             * The Current page's info
             * @type {Object}
             */
            self.$current = {
                adRendered: [],
                noAd: []
            };

            /**
             * Callbacks for page properties update
             * @type {Object}
             */
            self.$listeners = {};

            /**
             * @ngdoc method
             * @name dfpRendered#get
             *
             * @description
             * Returns whether the dfp has Rendered or not
             *
             * @return {string} whether the dfp has rendered or not
             */
            self.get = function() {
                return self.$current;
            };

            /**
             * @ngdoc method
             * @name dfpRendered#setRendered
             *
             * @description
             * Adds the ad whether it is rendered or empty for dfpRendered
             *
             * @param {object} even object returned from triggered event
             * @param {slot} slot dfp ad slot
             *
             **/
            self.setRendered = function (event, slot) {
                if (event.isEmpty && !_.contains(self.$current.noAd, slot.id)) {
                    // didn't render
                    self.$current.noAd.push(slot.id);
                // If ad already rendered, do not add to array again.
                } else if (!_.contains(self.$current.adRendered, slot.id)) {
                    // rendered
                    self.$current.adRendered.push(slot.id);
                }

                self.onUpdate();
                $rootScope.$broadcast('dfpRenderedUpdated', {slot: slot, isEmpty: event.isEmpty, creativeId: event.creativeId});
            };

            /**
             * @ngdoc method
             * @name dfpRendered#onUpdate
             *
             * @description
             * Add a function to be called when the dfpRendered Update
             *
             * @param thisArg {object=}'this' in the callback
             * @param callback {function=} callback function. If this is unset will call all of the registered $listeners;
             * @returns {string} Id of the callback function for removing
             */
            self.onUpdate = function (thisArg, callback) {
                if (arguments.length) {
                    if (_.isFunction(callback)) {
                        var callbackId = _.uniqueId('dfpCta_');
                        self.$listeners[callbackId] = [thisArg, callback];
                        return callbackId;
                    }
                } else {
                    _.each(self.$listeners, function (callback) {
                        if (callback[0].ctaId) {
                            // id is set, pass in if id is rendered
                            callback[1].call(callback[0], _.includes(self.$current.adRendered, callback[0].ctaId));
                        } else {
                            // id is not set, pass in all current
                            callback[1].call(callback[0], self.$current);
                        }
                    });
                }
            };

            /**
             * @ngdoc method
             * @name dfpRendered#clearUpdate
             *
             * @description
             * Remove a function from page props $listeners.
             * @param id {string} id of the function
             *
             * @return {*} self for chaining
             */
            self.clearUpdate = function (id) {
                if (id && self.$listeners[id]) {
                    delete self.$listeners[id];
                }

                return self;
            };
        }
    ]);

};

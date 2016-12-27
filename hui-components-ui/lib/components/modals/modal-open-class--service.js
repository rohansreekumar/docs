'use strict';


module.exports = function (ngModule) {

    ngModule
    /**
     * @ngdoc provider
     * @name modalOpenClassProvider
     * @module huiModals
     *
     * @description
     * modalOpenClass service provider
     *
     */

    /**
     * @ngdoc service
     * @name modalOpenClass
     * @module huiModals
     *
     * @requires openModals
     * @requires $document
     * @requires _
     *
     * @description
     * Creates classes identifying which modal is open and places them on body element.
     *
     */
        .provider('modalOpenClass', function () {

            var _this = this;

            _this.defaults = {
                prefix: 'body-modal-',
                suffix: '-open'
            };

            /**
             * @ngdoc method
             * @name modalOpenClassProvider#setDefaults
             * @description
             *
             * Set defaults for modalOpenClass
             *
             * @param {object} newDefaults New defaults to extend the existing
             *
             **/

            _this.setDefaults = function (newDefaults) {
                _this.defaults = angular.merge(_this.defaults, newDefaults);
            };

            _this.$get = [
                'openModals',
                '$document',
                '_',
                function (openModals,
                          $document,
                          _) {
                    var self = this,
                        el = $document.find('body'),
                        bodyClass = _this.defaults.prefix + _this.defaults.suffix,
                        publicMethods = {};

                    self.$current = '';
                    self.$last = '';

                    /**
                     * @ngdoc method
                     * @private
                     * @name modalOpenClass#$$applyToBody
                     * @description
                     * Applies the current class to body. Also applies/ removes the body class to/ from body.
                     */
                    self.$$applyToBody = function () {

                        el.removeClass(self.$last).addClass(self.$current);

                        if (openModals.$current.length > 0) {
                            el.removeClass(bodyClass).addClass(bodyClass);
                        } else {
                            el.removeClass(bodyClass);
                        }
                    };

                    /**
                     * @ngdoc method
                     * @name modalOpenClass#get
                     *
                     * @description
                     * getter for current classes
                     *
                     * @returns {string} the current modal classes
                     */
                    publicMethods.get = function () {
                        return self.$current;
                    };


                    /**
                     * @ngdoc method
                     * @name modalOpenClass#update
                     *
                     * @descripton
                     * Updates the current modal classes. To be called in response to modals opening or closing.
                     *
                     * @returns {string} the current modal classes
                     */
                    publicMethods.update = function () {
                        var modalNames = _(openModals.$current)
                            .pluck('name')
                            .reject(_.isUndefined)
                            .value();

                        self.$last = self.$current;

                        if (modalNames.length > 0) {

                            // add prefix to each name and suffix to each name and set $current
                            self.$current = _.map(modalNames, function (name) {
                                return _this.defaults.prefix + '-' + _.kebabCase(name) + _this.defaults.suffix;
                            })
                                .join(' ');

                        } else {
                            self.$current = '';
                        }

                        self.$$applyToBody();
                        return self.$current;
                    };

                    return _.extend(self, publicMethods);
                }
            ];

        });

};

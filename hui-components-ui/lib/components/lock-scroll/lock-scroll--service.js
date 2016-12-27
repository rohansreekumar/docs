'use strict';

module.exports = function (ngModule) {
    /**
     * @ngdoc service
     * @name LockScroll
     * @module huiLockScroll
     *
     * @descripton
     * Truly Locking the scroll on mobile devices and desktops requires using position:fixed. This causes the document to scroll to
     * the top of the page. This service preserves the user's location on the page. It requrires the ._lock--scroll css
     * to be present. see _effects.scss and _Effects.scss.
     *
     * Theoretically, you could use this if elements other than the body element are giving you issues. However this
     * service has only been tested with the body element.
     */

    /**
     * @ngdoc provider
     * @name LockScrollProvider
     * @description
     * Use the `LockScrollProvider` to configure default lock scroll settings
     */
    ngModule.provider('LockScroll', function () {

        var _this = this,
            defaults = _this.defaults = {
                lockEl: 'body'
            };

        /**
         * @ngdoc method
         * @name LockScrollProvider#setDefaults
         * @description
         * Set the lock scroll defaults for the app
         *
         * ```
         * this.defaults = {
         *   lockEl: 'body', // This is the element that will be prevented from scrolling by default
         * };
         * ```
         *
         * @param {object} newDefaults defaults will be extended with these
         */
        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.extend(defaults, newDefaults);
        };

        _this.$get = [
            '$document',
            '$',
            '$rootScope',
            function (
                $document,
                $,
                $rootScope
            ) {

                var privateMethods,
                    publicMethods,
                    originalScrollTop,
                    originalElStyle,
                    $el;

                $el = $document.find(defaults.lockEl);

                $rootScope.$on('$locationChangeStart', function() {
                    publicMethods.lock();
                });

                $rootScope.$on('$stateChangeSuccess', function() {
                    publicMethods.unlockAndScrollToTopPosition('body', 0);
                });

                privateMethods = {
                    lockCss: function (
                        restore,
                        el,
                        callback
                    ) {
                        if ($el.length < 1) {
                            $el = $document.find(defaults.lockEl);
                        }
                        var styleAttr;

                        $el = $(el || $el);

                        if (!restore) {

                            originalElStyle = {};
                            styleAttr = $el.attr('style');
                            if (styleAttr) {
                                if (styleAttr.indexOf('top')) {
                                    originalElStyle.top = $el.css('top');
                                }
                                if (styleAttr.indexOf('position')) {
                                    originalElStyle.position = $el.css('position');
                                }
                            }

                            if (!$el.hasClass('_lock--scroll')) {
                                originalScrollTop = $document.scrollTop();
                                $el.addClass('_lock--scroll').css('top', -1 * originalScrollTop);
                            }

                            (callback || angular.noop)(restore);

                        } else {
                            $el.removeClass('_lock--scroll');

                            if (styleAttr) {
                                $el.css(originalElStyle);
                            } else {
                                $el.removeAttr('style');
                            }
                            $document.scrollTop(originalScrollTop);

                            (callback || angular.noop)(restore);
                        }
                    }
                };

                publicMethods = {
                    /**
                     * @ngdoc method
                     * @name LockScroll#lock
                     * @description
                     * Lock the scroll for the specified element
                     *
                     * @param {jQuery=} el Element to be locked
                     * @param {function=} callback is a Callback function, executed after scroll has been locked.
                     */
                    lock: function (
                        el,
                        callback
                    ) {
                        privateMethods.lockCss(false, el, callback);
                    },
                    /**
                     * @ngdoc method
                     * @name LockScroll#unlock
                     * @description
                     * Unlock the scroll for the specified element
                     *
                     * @param {jQuery=} el Element to be unlocked
                     * @param {function=} callback is a Callback function, executed after scroll has been unlocked.
                     */
                    unlock: function (
                        el,
                        callback
                    ) {
                        privateMethods.lockCss(true, el, callback);
                    },

                    /**
                     * @ngdoc method
                     * @name LockScroll#unlockAndScrollToTopPosition
                     * @description
                     * Unlock the scroll for the specified element and scrolls it to designated position
                     *
                     * @param {jQuery=} el Element to be unlocked
                     * @param {function=} position Position to which element should be scrolled
                     */
                    unlockAndScrollToTopPosition: function (el,
                                                            position) {
                        privateMethods.lockCss(true, el, function() {
                            $document.find(el).scrollTop(position);
                        });
                    }
                };

                return publicMethods;
            }
        ];
    });

};

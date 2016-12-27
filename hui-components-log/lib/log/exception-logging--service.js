'use strict';

/**
 * @ngdoc provider
 * @name exceptionLoggingProvider
 * @module huiLog
 *
 * @description
 * exceptionLogging service provider
 *
 */

/**
 * @ngdoc service
 * @name exceptionLogging
 * @module huiLog
 *
 * @description
 * Used by the $exceptionHandler. Preserves default behavior (logging to the console)
 * but also posts to the server side error log with a generated stack trace.
 *
 * Sources: https://github.com/angular/angular.js/blob/master/src/ng/exceptionHandler.js#L3
 * http://engineering.talis.com/articles/client-side-error-logging/
 *
 */

module.exports = function (ngModule, Logger) {

    ngModule.provider('exceptionLogging', function () {

        var _this = this;

        _this.defaults = {
            apiPath: '/v1/log/squanch',
            interval: 60000 // how often to send errors
        };

        /**
         * @ngdoc method
         * @name exceptionLoggingProvider#setDefaults
         * @description
         *
         * Set defaults for exceptionLogging
         *
         * @param {object} newDefaults New defaults to extend the existing
         *
         **/

        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.merge(_this.defaults, newDefaults);
        };

        _this.$get = [
            '$log',
            '$window',
            function (
                $log,
                $window
            ) {
                var self = this,
                    publicMethods = {};

                self.$init = function () {
                    if (!self.$initialized) {
                        if (!$window.logger) {
                            $window.logger = new Logger({
                                apiPath: _this.defaults.apiPath,
                                standardQueryParams: _this.defaults.standard_query,
                                interval: _this.defaults.interval
                            });
                        }
                        self.$logger = $window.logger;

                        self.$initialized = true;
                    }
                };
                self.$queueError = function () {
                    self.$init();

                    self.$logger.error.apply(this, arguments);
                };
                publicMethods.error = function (exception) {

                    // preserve the default behaviour which will log the error
                    // to the console, and allow the application to continue running.
                    $log.error.apply($log, arguments);

                    self.$queueError.apply(this, arguments);
                };

                return angular.extend(self, publicMethods);
            }
        ];

    });

};

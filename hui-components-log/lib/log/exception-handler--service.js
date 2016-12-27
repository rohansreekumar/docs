'use strict';

/**
 * @ngdoc provider
 * @name $exceptionHandlerProvider
 * @module huiLog
 *
 * @description
 * $exceptionHandler service provider
 *
 */

/**
 * @ngdoc service
 * @name $exceptionHandler
 * @module huiLog
 *
 * @description
 * Replaces default Angular exception handler
 *
 */

module.exports = function (ngModule) {

    ngModule.provider('$exceptionHandler', function () {

        var _this = this;

        _this.$get = [
            'exceptionLogging',
            function (exceptionLogging) {

                return exceptionLogging.error;
            }
        ];

    });

};

'use strict';

/**
 * @ngdoc module
 * @name huiMockDelay
 * @module huiMockDelay
 *
 * @description
 * The `huiMockDelay` configures $httpBackend to respond with a delay for more realistic backend-less development
 *
 * <div doc-module-components="huiMockDelay"></div>
 *
 */


// Module dependencies

module.exports = function (delay) {
    // Create Module
    var ngModule = angular.module('huiMockDelay', [
        'ngMockE2E'
    ]);

    delay = delay || 500; //time to delay responses in ms

    ngModule.config([
        '$provide',
        function ($provide) {

            // delay responses
            //https://endlessindirection.wordpress.com/2013/05/18/angularjs-delay-response-from-httpbackend/
            // jscs:disable requireMultipleVarDecl
            $provide.decorator('$httpBackend', [
                '$delegate',
                function ($delegate) {
                    var proxy = function (method,
                                          url,
                                          data,
                                          callback,
                                          headers) {
                        var interceptor = function () {
                            var _this = this,
                                _arguments = arguments;
                            setTimeout(function () {
                                callback.apply(_this, _arguments);
                            }, delay);
                        };
                        return $delegate.call(this, method, url, data, interceptor, headers);
                    };
                    for (var key in $delegate) {
                        proxy[key] = $delegate[key];
                    }
                    return proxy;
                }
            ]);
            //jscs:enable requireMultipleVarDecl
        }
    ]);
};


'use strict';
var parseUrl = require('./parsing');

module.exports = function (mockModule) {

    mockModule.run([
        '$httpBackend',
        '$log',
        function (
            $httpBackend,
            $log
        ) {

            // tests using url parser E2E
            $httpBackend.whenGET(/\/\/heliosapi-local\.homes\.com\/v1\/atlas\/experience.*/)
                .respond(function (method, url) {
                    return parseUrl(url);
                });

            // page routes supported by url parer (atlas)
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/atlas\/experience?.*virginia-cities.+/)
                .respond(function (method, url) {
                    return parseUrl(url);
                });
            // page routes supported by url parer (atlas)
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/atlas\/experience?.*((rentals)|(for-sale)|(property)|(home-prices)|c)(?:\/|(?:%2F)).+/)
                .passThrough();

            // page routes not yet supported by url parer (atlas)
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/atlas\/experience.*/)
                .respond(function (method, url) {
                    $log.log('mock route: ', url); //jshint ignore: line
                    return parseUrl(url);
                });

        }
    ]);

};

'use strict';

module.exports = function (ngModule, loadLibrary) {
    var bingMapsLibraryUtil = new loadLibrary.Library();

    /**
     * @ngdoc constant
     * @name dtmDevUrl
     * @module huiDetails
     *
     * @description
     * Bing maps script url.
     */
    ngModule.constant('bingScriptUrl', 'http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0');

    /**
     * @ngdoc provider
     * @name bingMapsUrlProvider
     * @module huiDetails
     *
     * @required bingScriptUrl
     *
     * @description
     * bingMapsUrl service provider
     */
    ngModule.provider('bingMapsUrl', [
        'bingScriptUrl',
        function (bingScriptUrl) {
        var _this = this;

        _this.defaults = {
            url: bingScriptUrl
        };

        _this.setDefaults = function (newDefaults) {
            _this.defaults = angular.extend(_this.defaults, newDefaults);
        };

        /**
         * @ngdoc service
         * @name bingMapsUrl
         * @module huiDetails
         *
         * @require $window
         * @required bingScriptUrl
         *
         * @description
         * correct uri for bing maps.
         */
        _this.$get = [
            '$window',
            'bingScriptUrl',
            function (
                $window,
                bingScriptUrl
            ) {
                var self = this;

                return self.defaults.url;
            }
        ];
    }
]);

    ngModule.service('bingMapsLibraryUtil', [
        '$q',
        '$document',
        'bingMapsUrl',
        bingMapsLibraryUtil
    ]);
};

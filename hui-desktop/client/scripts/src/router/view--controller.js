'use strict';

module.exports = function (ngModule) {

    ngModule.controller('ViewController', [
        '$window',
        '$rootScope',
        function (
            $window,
            $rootScope
        ) {

            var _this = this;

            _this.pageProps = $rootScope.pageProps.$current;

        }
    ]);
};

'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function (
            $templateCache
        ) {
            $templateCache.put(
                '/templates/frame/global-nav--header.html',
                require('./header.tpl.html')
            );
            $templateCache.put(
                'templates/frame/global-nav--header/nav-items.html',
                require('./nav-items.tpl.html')
            );
        }
    ]);

};

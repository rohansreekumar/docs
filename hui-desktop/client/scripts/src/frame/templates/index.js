'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function (
            $templateCache
        ) {
            $templateCache.put(
                '/templates/frame/grey-separator-bar--directive.html',
                require('./grey-separator-bar--directive.tpl.html')
            );

            $templateCache.put(
                '/templates/frame/share-email.html',
                require('./share-email.tpl.html')
            );
        }
    ]);
};

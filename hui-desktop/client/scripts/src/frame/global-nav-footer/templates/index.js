'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function (
            $templateCache
        ) {
            $templateCache.put(
                '/templates/globalNavFooter/global-nav-footer--directive.html',
                require('./global-nav-footer--directive.tpl.html')
            );

            $templateCache.put(
                '/templates/globalNavFooter/footer-bar-cell--directive.html',
                require('./footer-bar-cell--directive.tpl.html')
            );
        }
    ]);
};

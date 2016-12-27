'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/templates/tab-display.html',
                require('./tab-display.tpl.html'));
        }
    ]);
};

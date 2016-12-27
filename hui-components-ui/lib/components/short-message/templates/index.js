'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/ui/templates/short-message.html',
                require('./short-message.tpl.html'));
        }
    ]);
};

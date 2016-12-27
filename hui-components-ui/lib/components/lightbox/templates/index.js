'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/ui/templates/hui-lightbox.html',
                require('./hui-lightbox.tpl.html'));
        }
    ]);
};

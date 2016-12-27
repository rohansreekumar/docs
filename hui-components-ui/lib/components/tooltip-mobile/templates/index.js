'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/ui/templates/hui-tooltip.html',
                require('./hui-tooltip.tpl.html'));
        }
    ]);
};

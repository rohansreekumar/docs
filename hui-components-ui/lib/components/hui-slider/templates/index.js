'use strict';

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/templates/hui-slider.html',
                require('./hui-slider.tpl.html'));
        }
    ]);
};

'use strict';

// oas module templates
module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function (
            $templateCache
        ) {
            $templateCache.put('/templates/oas/oas-cta--directive.html', require('./oas-cta--directive.tpl.html'));
        }
    ]);
};

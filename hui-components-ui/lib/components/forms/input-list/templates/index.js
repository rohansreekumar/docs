'use strict';

// Form module templates

module.exports = function (ngModule) {
    ngModule.run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('/templates/forms/form-input--check-list.html',
                require('./form-input--check-list.tpl.html'));
            $templateCache.put('/templates/forms/form-input--radio-list.html',
                require('./form-input--radio-list.tpl.html'));
            $templateCache.put('/templates/forms/form-input--select-list.html',
                require('./form-input--select-list.tpl.html'));
            $templateCache.put('/templates/forms/form-input--radio-split-list.html',
                require('./form-input--radio-split-list.tpl.html'));
            $templateCache.put('/templates/forms/form-input--button-multi-select-list.html',
                require('./form-input--button-multi-select-list.tpl.html'));
            $templateCache.put('/templates/forms/form-input--button-single-select-list.html',
                require('./form-input--button-single-select-list.tpl.html'));
        }
    ]);
};

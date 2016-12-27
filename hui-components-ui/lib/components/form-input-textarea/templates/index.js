'use strict';

/**
 * @ngdoc module
 * @name huiFormInputTextarea
 * @module formInputTextareaTemplates
 *
 * @description
 * The `formInputTextareaTemplates` module
 *
 * <div doc-module-components="formInputTextareaTemplates"></div>
 *
 */

// Module dependencies


// Create Module
var ngModule = angular.module('formInputTextareaTemplates', []);
ngModule.run([
    '$templateCache',
    function ($templateCache) {
        // form input text area
        $templateCache.put('/ui/templates/form-input-textarea.html',
            require('./form-input-textarea.tpl.html'));
    }
]);

'use strict';

/**
 * @ngdoc module
 * @name huiFloatLabelTemplates
 * @module huiFloatLabelTemplates
 *
 * @description
 * The `huiFloatLabelTemplates` module
 *
 * <div doc-module-components="huiFloatLabelTemplates"></div>
 *
 */

// Module dependencies


// Create Module
var ngModule = angular.module('huiFloatLabelTemplates', []);


ngModule.run([
    '$templateCache',
    function ($templateCache) {

        // floatLabel
        $templateCache.put('/ui/templates/float-label.html',
            require('./float-label.tpl.html'));
    }
]);

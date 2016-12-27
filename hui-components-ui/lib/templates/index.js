'use strict';

/**
 * @ngdoc module
 *
 * @name hui.templates
 * @module hui
 *
 * @description
 *
 * The `hui.templates` is the hui template module. Included with hdc.ui.
 *
 */


var ngModule = angular.module('hdc.ui.templates', []);

ngModule.run([
    '$templateCache',
    function ($templateCache) {

        // postal address
        $templateCache.put('/ui/templates/postal-address.html',
            require('./postal-address.tpl.html'));

        // action
        $templateCache.put('/ui/templates/action.html',
            require('./action.tpl.html'));


        // close
        $templateCache.put('/ui/templates/close.html',
            require('./close.tpl.html'));

        // tooltip-trigger
        $templateCache.put('/ui/templates/tooltip-trigger.html',
            require('./close.tpl.html'));

        // breadcrumb
        $templateCache.put('/ui/templates/breadcrumb.html',
            require('./breadcrumb.tpl.html'));
    }
]);


module.exports = ngModule;

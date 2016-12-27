'use strict';

/**
 * @ngdoc module
 * @name huiPinitTemplates
 * @module huiPinitTemplates
 *
 * @description
 * The `huiPinitTemplates` module
 *
 * <div doc-module-components="huiPinitTemplates"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiPinitTemplates', []);

ngModule.run([
    '$templateCache',
     function ($templateCache) {

         // Pinit Button
         $templateCache.put('/ui/templates/pinit-button.html',
             require('./pinit-button.tpl.html'));
     }
 ]);

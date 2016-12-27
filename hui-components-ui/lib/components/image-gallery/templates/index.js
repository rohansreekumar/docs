'use strict';

/**
 * @ngdoc module
 * @name huiImageGalleryTemplates
 * @module huiImageGalleryTemplates
 *
 * @description
 * The `huiImageGalleryTemplates` module
 *
 * <div doc-module-components="huiImageGalleryTemplates"></div>
 *
 */

// Module dependencies


// Create Module
var ngModule = angular.module('huiImageGalleryTemplates', []);


ngModule.run([
    '$templateCache',
    '$window',
    function ($templateCache, $window) {

        // image gallery
        $templateCache.put('/ui/templates/image-gallery.html',
            require('./image-gallery.tpl.html'));

        // full screen image gallery
        $templateCache.put('/ui/templates/full-screen-image-gallery.html',
            require('./full-screen-image-gallery' + ($window.t_k || '_mobile') + '.tpl.html'));

        // photo counter
        $templateCache.put('/ui/templates/photo-counter.html',
            require('./photo-counter.tpl.html'));

        // gallery image slide
        $templateCache.put('/ui/templates/gallery-slide-image.html',
            require('./gallery-slide-image.tpl.html'));

        // gallery thumbnail slider
        $templateCache.put('/ui/templates/thumbnail-slider.html',
            require('./thumbnail-slider.tpl.html'));
    }
]);

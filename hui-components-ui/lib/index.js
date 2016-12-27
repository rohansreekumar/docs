'use strict';

/**
 * @ngdoc module
 *
 *
 * @name hui
 * @module hui
 *
 * @description
 *
 * The `hui` module contains ui/ux components. Includes templates.
 *
 * <div doc-module-components="hdc"></div>
 *
 */

var ngModule = angular.module('hdc.ui', [
    'hdc.ui.templates',
    'huiFloatLabel',
    'huiPreviewAccordion',
    'huiFormInputTextarea',
    'huiImageGallery',
    'huiTooltip',
    'huiPinit',
    'huiwaypoint',
    'huiD3',
    'huiVisualization',
    'huiSlider',
    'huiDevice',
    'huiLightbox',
    'huiRedraw',
    'huiTab',
    'huiContentCarousel'
]);

require('./components/actions')(ngModule);
require('./components/close')(ngModule);
require('./components/postal-address')(ngModule);
require('./components/tooltip')(ngModule);
require('./components/focus-on')(ngModule);
require('./components/obsfucate')(ngModule);
require('./components/image-gallery');
require('./components/float-label');
require('./components/preview-accordion');
require('./components/form-input-textarea');
require('./components/short-message');
require('./components/image-frame');
require('./components/tooltip-mobile');
require('./components/pinit');
require('./components/waypoint');
require('./components/d3');
require('./components/hui-visualization');
require('./components/bind-html-compile');
require('./components/hui-slider');
require('./components/device');
require('./components/lightbox');
require('./components/redraw');
require('./components/bing-maps');
require('./components/tab-display');
require('./components/content-carousel');

module.exports = ngModule;

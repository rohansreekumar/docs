'use strict';

require('hui-components-content/lib/search');
require('hui-components-content/lib/listings-new');
require('hui-components-ui/lib/components/modals');
require('hui-components-ui/lib/components/scroll-input-into-view');
require('hui-components-vendor/lib/jquery-ng');


var ngModule = angular.module('app.search', [
    'huiListings',
    'huiSearch',
    'huiModals',
    'jQuery',
    'huiInputFocusScroll'
]);

require('./search-sort')(ngModule);


module.exports = ngModule;

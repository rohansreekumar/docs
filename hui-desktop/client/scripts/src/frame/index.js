// site frame module

'use strict';

require('hui-components-ui/lib/components/modals');
require('hui-components-content/lib/device-apps');
require('hui-components-content/lib/user');
require('hui-components-vendor/lib/lodash');
require('hui-components-ui/lib/components/lock-scroll');
require('./global-nav-header');
require('./global-nav-footer');
require('hui-components-content/lib/share-email');


var ngModule = angular.module('app.frame', [
    'app.frame.globalNav',
    'app.frame.globalNavFooter',
    'ngAnimate',
    'ngDialog',
    'lodash',
    'hui.deviceApps',
    'huiModals',
    'hui.user',
    'huiLockScroll',
    'huiShareEmail'
]);

require('./desktop-modals--service')(ngModule);
require('./hide-show-on-scroll--directive')(ngModule);
require('./hdc-mobile-go--directive')(ngModule);
require('./ngdialog')(ngModule);
require('./grey-separator-bar--directive')(ngModule);

require('./templates')(ngModule);

module.exports = ngModule;

'use strict';

require('hui-components-vendor/lib/lodash');
require('hui-components-content/lib/myhomes');
require('hui-components-content/lib/user');
require('hui-components-content/lib/leads');
require('hui-components-content/lib/search');
require('hui-components-content/lib/router');

var ngModule = angular.module('app.frame.globalNav', [
    'hui.MyHomes',
    'lodash',
    'hui.user',
    'huiLeads',
    'huiSearch',
    'huiRouter'
]);

require('./templates')(ngModule);
require('./global-nav-header--directive')(ngModule);
require('./nav-items--directive')(ngModule);
require('./global-nav-header--service')(ngModule);

module.exports = ngModule;

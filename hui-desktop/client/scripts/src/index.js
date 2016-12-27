'use strict';

// Load dependencies.
require('hui-components-vendor/lib/angular');
require('hui-components-vendor/lib/angular-ra-newrelic');
require('hui-components-vendor/lib/lodash');

// Load modules.

// Hui UI modules
require('hui-components-ui/lib');
require('hui-components-ui/lib/templates');
require('hui-components-ui/lib/components/modals');
require('hui-components-ui/lib/components/device');
require('hui-components-ui/lib/components/track-scroll');

// Hui content modules
require('hui-components-content/lib/user');
require('hui-components-content/lib/seo');
require('hui-components-content/lib/device-apps');
require('hui-components-content/lib/tracking');
require('hui-components-content/lib/http');
require('hui-components-content/lib/router');
require('hui-components-content/lib/local-pros');
require('hui-components-content/lib/myhomes');

require('hui-components-dfp');

// App Modules
require('./router');
require('./frame');
require('./layout/landing');
require('./layout/property');
require('./search');

// App
require('./app');

var util = require('hui-components-util'),
    App = util.App;

// window.app_config = ['{{helios}}', '{{api_key}}', '{{environment}}', '{{legacy_host}}'];
window.app = new App({
    standard_query: {
        api_key: window.app_config[1] || '00000000000000000001',
        app_platform: 'desktop',
        app: 'hdc_portal'
    },
    experience: 'desktop',
    legacy_host: window.location.host,
    env: window.app_config[2],
    helios_host: window.app_config[0],
    initial_props: window.initial_props,
    log_host: window.app_config[4]
});

// hard code this here so that webpack knows not to include _desktop
window.t_k = '_desktop';

angular.element(document).ready(function () {
    // 1 = dev, 2 = staging, 4 = production, 16 = local (mock)

    /* istanbul ignore else: Code that should only be used for production, no tests */
    if (window.app.dev) {
        window.debug = true;
    }

    angular.bootstrap(document, ['app']); // No intercepts
});

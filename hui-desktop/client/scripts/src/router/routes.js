'use strict';
var HuiParam = require('hui-components-content/lib/router/uiRouterConfigs').HuiParam,
    HuiStateConfig = require('hui-components-content/lib/router/uiRouterConfigs').HuiStateConfig;

module.exports = function (ngModule) {
    // Configure States (Routes)
    ngModule.config([
        '$stateProvider',
        function ($stateProvider) {

            // Load layout directives
            $stateProvider
                .state('app', {
                    abstract: true,
                    views: {
                        header: {
                            template: '<global-nav-header></global-nav-header>'
                        },
                        'sub-header': {
                            template: '<grey-separator-bar></grey-separator-bar>'
                        },
                        footer: {
                            template: '<global-nav-footer></global-nav-footer>'
                        }
                    }
                })
                .state('app.home', new HuiStateConfig({
                    url: '/',
                    views: {
                        'sub-header@': {
                            template: '<search-header></search-header>'
                        },
                        'content@': {
                            template: '<page-home-page />'
                        },
                        'footer@': {
                            template: '<home-page-footer />'
                        }
                    }
                }))
                .state('app.propertyNational', new HuiStateConfig({
                    views: {
                        'sub-header@': {
                            template: '<search-header></search-header>'
                        },
                        'content@': {
                            template: '<page-property-landing />'
                        },
                        'footer@': {
                            template: '<home-page-footer />'
                        }
                    }
                }))
                .state('app.propertyState', new HuiStateConfig({
                    views: {
                        'sub-header@': {
                            template: '<search-header></search-header>'
                        },
                        'content@': {
                            template: '<page-property-landing />'
                        },
                        'footer@': {
                            template: '<home-page-footer />'
                        }
                    }
                }))
                .state('app.propertyDetail', new HuiStateConfig({
                    views: {
                        'content@': {
                            template: '<page-property-udp />',
                            controller: 'ViewController',
                            controllerAs: 'viewCtrl'
                        }
                    }
                }))
                .state('app.propertySrp', new HuiStateConfig({
                    views: {
                        'content@': {
                            template: '<page-property-results />'
                        }
                    }
                }));

        }
    ]);

};

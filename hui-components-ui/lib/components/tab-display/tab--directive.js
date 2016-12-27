'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name tabs
     * @module huiTab
     * @restrict E
     * @description
     * Directive that provides tab functionality
     *
     * @param tabConfig {array}  contains tab configuration data.
     * @param onClick {method} points to callback method expression.
     * @param activeTab {string} contains default tab name.
     *
     * @example
     * <tabs tab-config="config"  on-click="updateTab" active-tab="tabName"></tabs>
     */
    ngModule.directive('tabs', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    tabConfig: '=',
                    onClick: '&',
                    activeTab: '='
                },
                controller: 'tabsController',
                controllerAs: 'tabsCtrl',
                templateUrl: '/templates/tab-display.html',
                bindToController: true
            };
        }
    ]);

    /**
     * @ngdoc controller
     * @name tabDisplay.controller:tabsController
     * @requires _
     *
     * @description
     * controller for displaying tabs.
     *
     */
    ngModule.controller('tabsController', [
        '_',
        function (_) {
            var self = this;

            /**
            * @ngdoc method
            * @name init
            * @methodOf tabDisplay.controller:tabsController
            *
            * @description
            * Runs init function
            *
            */
            function init() {
                _.forEach(self.tabConfig, function (tabValue) {
                    if (_.get(tabValue, ['name']) === 'Zip Codes') {
                        _.set(tabValue,['name'], 'ZIP Codes');
                    }
                });
            }
            init();

            /**
             * @ngdoc method
             * @name tabsController#onTabClick
             * @module huiTab
             *
             * @description
             * This method is invoked on click event of tab..
             * It calls the call back method which is passed on directive.
             * If call back function return true then it updates tab changes else does not update.
             *
             * @param tab {object} tab object on which click event occurred.
             */
            self.onTabClick = function (tab) {
                var isChangedRequired = self.onClick()(tab);
                if (isChangedRequired) {
                    self.activeTab = tab.name;
                }
            };
        }
    ]);

};

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Tab Module', function () {
    beforeEach(angular.mock.module('huiTab'));

    describe('Tabs Directive', function () {
        context('binding of the element', function () {
            util.helpers.sinon(chai);
            util.helpers.directive(angular);

            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.scope.tabConfig = [
                    {
                        name: 'test'
                    }
                ];
                self.scope.onTabChange = function () {
                    return true;
                };
                self.scope.activeTab = 'test';

                self.template = '<tabs tab-config="tabConfig"  on-click="onTabChange" active-tab="activeTab"></tabs>';
            }));

            it('should bind to an element', function () {
                var self = this;
                expect(self.$el.hasClass('tabs-container')).to.be.true;
            });
        });
    });

    describe('Tabs Controller', function () {
        describe('Tabs Controller OnClick', function() {
            beforeEach(angular.mock.inject(function ($controller) {
                var self = this;
                self.returnValue = true;

                self.controller = $controller('tabsController', {});
                self.controller.onClick = function () {
                    return function () {
                        return self.returnValue;
                    };
                };
            }));

            it('should set tab name on tab click if call back returns true', function () {
                var self = this;
                self.controller.onTabClick({name: 'test'});

                expect(self.controller.activeTab).to.equal('test');
            });

            it('should not set tab name on tab click if call back returns false', function () {
                var self = this;
                self.controller.activeTab = '';
                self.returnValue = false;
                self.controller.onTabClick({name: 'test'});

                expect(self.controller.activeTab).to.equal('');
            });
        });
        describe('Tabs Controller init()', function() {
            beforeEach(angular.mock.inject(function ($controller) {
                var self = this;

                self.tabConfig = [
                    {
                        label: '',
                        name: ''
                    }
                ];
                self.setController = function (tabConfig) {
                    self.controller = $controller('tabsController', {}, {
                        tabConfig: tabConfig || self.tabConfig
                    });
                };
            }));

            it('should set tab name ZIP Codes when Zip Codes is passed', function () {
                var self = this,
                    tabConfig = [
                        {
                            label: 'Zip Codes',
                            name: 'Zip Codes'
                        }
                    ];
                self.setController(tabConfig);

                expect(self.controller.tabConfig[0].name).to.equal('ZIP Codes');
            });
            it('should not change the tab if the name is not Zip Codes', function () {
                var self = this,
                    tabConfig = [
                        {
                            label: 'Cities',
                            name: 'Cities'
                        }
                    ];
                self.setController(tabConfig);

                expect(self.controller.tabConfig[0].name).to.equal('Cities');
            });
        });
    });
});

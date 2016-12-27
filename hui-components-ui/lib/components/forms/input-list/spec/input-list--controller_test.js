'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Forms Module', function() {

    beforeEach(angular.mock.module('huiForms.formInputList'));
    util.helpers.sinon(chai);
    describe('Forms Select Input', function () {

        describe('Directive', function() {
            util.helpers.directive(angular);
            beforeEach(angular.mock.inject(function ($rootScope, inputList) {
                var self = this;
                self.scope = $rootScope.$new();

                self.inputList = {
                    init: self.sinon.stub(inputList, 'init')
                };

                self.template = '<formInputSelectList class="test-form"></formInputSelectList>';
            }));

            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('test-form')).to.equal(true);
            });
        });

        describe('Controller', function () {
            beforeEach(angular.mock.inject(function ($rootScope, $controller) {
                var self = this;

                self.scope = $rootScope.$new();
                self.rootScope = $rootScope;

                self.inputList = {
                    init: self.sinon.stub()
                };

                self.formInputData = {
                    values: [
                        {
                            label: 'test'
                        }
                    ]
                };

                self.controller = $controller('InputListController', {
                    $scope: self.scope,
                    inputList: self.inputList
                }, {

                });
            }));

            describe('setSelectButton method', function () {
                beforeEach(angular.mock.inject(function () {
                    var self = this;
                }));

                // Delete @window.t_k after each test to prevent lingering setting
                afterEach(angular.mock.inject(function ($window) {
                    delete $window.t_k;
                }));

                it('should set select button to formInputData label', function () {
                    var self = this;
                    expect(self.controller.selectButton).to.equal('test');
                });

                it('should set select button to param passed', function () {
                    var self = this;
                    self.controller.setSelectButton('cheese');
                    expect(self.controller.selectButton).to.equal('cheese');
                });

                it('should set $rootScope selectButton to param passed if on desktop', function () {
                    var self = this;
                    self.controller.setSelectButton('penguins');
                    expect(self.rootScope.selectButton).to.equal('penguins');
                });
            });

            describe('setupMultiSettings method', function () {

                it('should set select button to formInputData label', function () {
                    var self = this;

                    self.controller.setupMultiSettings(4);
                    expect(self.controller.multiRows).to.equal(true);
                });

                it('should set select button to param passed', function () {
                    var self = this;
                    self.controller.setSelectButton('cheese');
                    expect(self.controller.selectButton).to.equal('cheese');
                });

                it('should set $rootScope selectButton to param passed if on desktop', function () {
                    var self = this;
                    self.controller.setSelectButton('penguins');
                    expect(self.rootScope.selectButton).to.equal('penguins');
                });
            });
        });
    });
});

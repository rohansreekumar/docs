'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test'),

    useCase = describe;

require('./../index.js');

describe('huiModals Module', function () {

    describe('modalWatcher', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.huiModals', ['huiModals']);

            // Get provider reference
            self.testModule.config(function (modalWatcherProvider) {
                // bind the provider to a variable
                self.serviceProvider = modalWatcherProvider;
            });

            // Get service reference
            angular.mock.module('test.huiModals');
            angular.mock.inject(function (modalWatcher) {
                self.service = modalWatcher;
            });
        });

        describe('Provider', function () {
            describe('setDefaults method', function () {
                it('should update the defaults', function () {
                    var self = this;

                    self.serviceProvider.setDefaults({
                        hypotheticalDefault: 'Needs Caffeine'
                    });

                    expect(self.serviceProvider.defaults).to.have.property('hypotheticalDefault', 'Needs Caffeine');

                });

            });
        });

        describe('Service', function () {
            util.helpers.sinon(chai);
            describe('setWatchers method', function () {
                beforeEach(angular.mock.inject(function ($rootScope, openModals, modalOpenClass, _) {
                    var self = this;

                    self.$rootScope = $rootScope;

                    self.modalOpenClass = self.sinon.spy(modalOpenClass, 'update');

                    self.openModals = {
                        add: self.sinon.spy(openModals, 'add'),
                        remove: self.sinon.spy(openModals, 'remove')
                    };
                    self.dialog = function (jQueryElement) {

                        var el = [
                            {
                                id: _.uniqueId('modal_')
                            }
                        ];

                        if (!!jQueryElement) {
                            // return jQuery element only
                            return el;
                        } else {
                            // return data with a jQuery element

                            return {
                                dialog: el,
                                name: _.uniqueId('ModalName-')
                            };
                        }
                    };
                    self.service.setWatchers();
                }));

                afterEach(function () {
                    var self = this;
                    self.service.disableWatchers();
                });

                it('should add the modal id to the openModals service.', function () {

                    var self = this;

                    self.$rootScope.$broadcast('ngDialog.opened', self.dialog(true));

                    expect(self.openModals.add).to.be.called;

                    expect(self.$rootScope.modalsActive).to.be.true;

                    self.$rootScope.$broadcast('ngDialog.opened', self.dialog());

                    expect(self.openModals.add).to.be.calledTwice;

                });

                it('should remove modal ids from the openModals service.', function () {
                    var self = this,
                        dialog = self.dialog(true);

                    // open with jquery el
                    self.$rootScope.$broadcast('ngDialog.closing', self.dialog());
                    expect(self.openModals.remove).to.be.called;

                    // open close 1
                    self.$rootScope.$broadcast('ngDialog.opened', dialog);
                    self.$rootScope.$broadcast('ngDialog.closing', dialog);

                    expect(self.openModals.remove).to.be.called;

                    expect(self.$rootScope.modalsActive).to.be.false;

                    // open close this one of many
                    self.$rootScope.$broadcast('ngDialog.opened', self.dialog());
                    self.$rootScope.$broadcast('ngDialog.opened', dialog);
                    self.$rootScope.$broadcast('ngDialog.opened', self.dialog());
                    self.$rootScope.$broadcast('ngDialog.opened', self.dialog());

                    self.$rootScope.$broadcast('ngDialog.closing', dialog);

                    expect(self.openModals.remove.calledWith(dialog[0].id)).to.be.true;

                    expect(self.$rootScope.modalsActive).to.be.true;
                });

                it('should trigger body class update.', function () {
                    var self = this;

                    self.$rootScope.$broadcast('ngDialog.closed', self.dialog());
                    expect(self.modalOpenClass).to.be.called;
                });

            });

            describe('setWatchers method with isDesktop', function () {

                beforeEach(angular.mock.inject(function ($rootScope, openModals, modalOpenClass, _) {
                    var self = this;

                    self.$rootScope = $rootScope;

                    self.modalOpenClass = self.sinon.spy(modalOpenClass, 'update');

                    self.openModals = {
                        add: self.sinon.spy(openModals, 'add'),
                        remove: self.sinon.spy(openModals, 'remove')
                    };
                    self.dialog = {
                        dialog: [
                            {
                                id: _.uniqueId('modal_'),
                                animate: function (animateStyles, animationTime, animationCallback) {
                                    animationCallback();
                                },
                                remove: function () {

                                }
                            }
                        ],
                        name: _.uniqueId('ModalName-')
                    };
                    self.service.setWatchers({ isDesktop: true });
                }));

                afterEach(function () {
                    var self = this;
                    self.service.disableWatchers();
                });

                it('should remove modal ids from the openModals service.', function () {
                    var self = this;
                    self.$rootScope.$broadcast('ngDialog.closing', self.dialog);
                    expect(self.openModals.remove).to.be.called;
                });

            });
        });

    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test'),
    useCase = describe;

require('./../index.js');

describe('Modals Module', function () {

    describe('modalOpenClass', function () {
        beforeEach(function () {
            var self = this;


            // in order to test provider methods assign a fake module to a variable.
            self.testModule = angular.module('test.huiModals', ['huiModals']);

            // then you have access to the fake modules config functions to test against.
            self.testModule.config(function (_modalOpenClassProvider_) {
                // bind the provider to a variable
                self.modalOpenClassProvider = _modalOpenClassProvider_;
                self.modalOpenClassProvider.setDefaults({debounce: 0});

            });

            angular.mock.module('test.huiModals');
            angular.mock.inject(function (modalOpenClass, openModals) {
                self.openModals = openModals;
                self.service = modalOpenClass;

                self.testClasses = 'body-modal--puppy-open body-modal--kitty-open body-modal--birdie-open body-modal--cute-rat-open';
                self.testModals = [
                    {id: 1, name: 'puppy'},
                    {id: 2, name: 'kitty'},
                    {id: 3, name: 'birdie'},
                    {id: 4},
                    {id: 5},
                    {id: 6, name: 'cuteRat'}
                ];
            });
        });


        describe('Provider', function () {
            describe('setDefaults method', function () {
                it('should update the defaults', function () {
                    var self = this;

                    self.modalOpenClassProvider.setDefaults({
                        prefix: 'pre-',
                        suffix: '-suff'
                    });

                    expect(self.modalOpenClassProvider.defaults).to.have.property('prefix', 'pre-');
                    expect(self.modalOpenClassProvider.defaults).to.have.property('suffix', '-suff');
                });

            });
        });
        describe('Service', function () {


            describe('$$addClassToBody method', function () {
                beforeEach(angular.mock.inject(function ($document, $rootScope) {
                    var self = this;

                    self.rootScope = $rootScope;
                    self.$body = $document.find('body');

                }));
                it('should add a class to the body if a modal is open', function () {

                    var self = this;
                    self.openModals.$current = [self.testModals[0]];

                    self.service.update();

                    expect(self.$body.hasClass('body-modal--open')).to.be.true;

                });
                it('should add a remove class from the body if all modals are closed', function () {

                    var self = this;
                    self.openModals.$current = [self.testModals[0]];

                    self.service.update();
                    self.openModals.$current = [];
                    self.service.update();

                    expect(self.$body[0].className.indexOf('body-modal--')).to.equal(-1);

                });
                it('should add a class to the body for every open modal', function () {

                    var self = this;
                    self.openModals.$current = [self.testModals[0]];

                    self.service.update();

                    expect(self.$body.hasClass('body-modal--puppy-open')).to.be.true;

                });
                it('should udpate the classes when all modals are closed', function () {
                    var self = this;
                    // set up one modal in open modals
                    self.openModals.$current = [self.testModals[0]];

                    // add class to element manually (just testing remove right now);
                    self.$body.addClass('body-modal--puppy-open');
                    self.service.$current = 'body-modal--puppy-open';

                    // remove modals from Open Modals
                    self.openModals.$current = [];
                    self.service.update();

                    // check to see if modals classes are cleared
                    expect(self.$body[0].className.indexOf('body-modal--puppy-open')).to.equal(-1);
                });

                it('should udpate the classes when one modals is closed', function () {
                    var self = this;
                    // set up several modals open in open modals
                    self.openModals.$current = self.testModals;

                    // add classes
                    self.service.update();

                    // remove only one modal
                    self.openModals.$current.splice(1, 1);

                    // update classes
                    self.service.update();

                    // check to see if only that modals class is gone
                    expect(self.$body.hasClass('body-modal--kitty-open')).to.be.false;
                    expect(self.$body.hasClass('body-modal--puppy-open')).to.be.true;
                    expect(self.$body.hasClass('body-modal--birdie-open')).to.be.true;

                });
            });
            describe('get method', function () {
                it('should return the current string of classes', function () {
                    var self = this,
                        out;

                    // no modals open
                    out = self.service.get();

                    expect(out).to.equal('');


                    // test modals open
                    self.service.$current = self.testClasses;

                    out = self.service.get();

                    expect(out).to.equal(self.testClasses);

                });

            });

            describe('update method', function () {
                useCase('named modals are open', function () {
                    it('should make a string of classes based on the open modal names', function () {
                        var self = this,
                            out;


                        // test modals open

                        self.openModals.$current = self.testModals;

                        out = self.service.update();

                        expect(out).to.equal(self.testClasses);

                        self.openModals.$current.push({
                            id: 6,
                            name: 'bunny'
                        });

                        // changing prefix/suffix to make sure this test is good.
                        self.modalOpenClassProvider.setDefaults({
                            prefix: 'pre-',
                            suffix: '-suff'
                        });

                        out = self.service.update();

                        out = out.split(' ');

                        out.forEach(function (className) {
                            expect(className.indexOf('pre-')).to.not.equal(-1);
                            expect(className.indexOf('-suff')).to.not.equal(-1);
                        });
                    });

                });
                useCase('no named modals are open', function () {
                    it('should make a blank string', function () {
                        var self = this,
                            out;

                        // no modals open

                        out = self.service.get();

                        expect(out).to.equal('');

                        // still blank after update
                        out = self.service.update();

                        expect(out).to.equal('');

                    });
                });
            });
        });
    });


});

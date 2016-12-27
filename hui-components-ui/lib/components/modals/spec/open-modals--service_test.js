'use strict';


require('./../index.js');

var chai = require('chai'),
    util = require('hui-components-mock/lib/test'),
    expect = chai.expect;

// replace openModals global var with self.service

describe('Modals Module', function () {

    beforeEach(angular.mock.module('huiModals'));

    util.helpers.sinon(chai);

    beforeEach(angular.mock.inject(function (_openModals_, modalOpenClass) {
        var self = this;

        self.service = _openModals_;

        self.modalOpenClass = self.sinon.spy(modalOpenClass, 'update');

    }));

    describe('openModals Service', function () {
        var dialog, $rootScope;

        beforeEach(angular.mock.inject(function (_$rootScope_) {
            var self = this;
            $rootScope = _$rootScope_;

            dialog = {
                    id: 3
                };

            self.service.add(dialog);
        }));

        describe('getActive Method', function () {

            it('should report if any modals are open', function () {
                var self = this;

                expect(self.service.getActive()).to.be.true;
            });

        });

        describe('add method', function () {

            it('should add an unnamed modal to the modals array', function () {
                var self = this;

                self.service.add({id: 2});
                expect(self.service.$current.length).to.be.above(0);
                expect(self.service.$current).to.contain({id: 2});
            });
            it('should add an named modal to the modals array', function () {
                var self = this;

                self.service.add({
                    dialog: {id: 3},
                    name: 'modalName'
                });
                expect(self.service.$current.length).to.be.above(0);
                expect(self.service.$current).to.contain({id: 3});

            });
        });

        describe('remove method', function () {
            it('should remove the modal from the current array', function () {
                var self = this;

                self.service.add({id: 1});
                self.service.add({id: 2});
                self.service.add(
                    {
                        dialog: {id: 4},
                        name: 'modalName'
                    });
                self.service.remove(4);
                expect(self.service.$current).to.not.contain({id: 4});
            });
        });


    });
});

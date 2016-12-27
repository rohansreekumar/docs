'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');
require('./../index.js');
describe('Form Input Textarea Module', function () {

    beforeEach(angular.mock.module('huiFormInputTextarea'));
    describe('Form Input Textarea', function () {

        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<form-input-textarea data-form-input-textarea-auto-focus="boolean"></form-input-textarea>';
        }));

        it('should bind to an element', function () {
            var self = this;
            expect(self.$el.hasClass('form-input-textarea')).to.be.true;
        });
    });

    describe('Form Input Textarea Auto Focus', function () {

        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<textarea  data-form-input-textarea-auto-focus="boolean"></textarea>';
        }));

        it('should not focus the input when false', angular.mock.inject(function ($document) {
            var self = this;
            expect(self.$el[0]).to.not.equal($document[0].activeElement);
        }));

        it('should focus the input when true', angular.mock.inject(function ($document) {
            var self = this;
            self.scope.boolean = true;
            self.scope.$digest();
            expect(self.$el[0]).to.equal($document[0].activeElement);
        }));


    });

    describe('Form Input Textarea Controller', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope, $controller) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<form-input-textarea data-auto-focus="true"></form-input-textarea>';
            self.controller = $controller('formInputTextareaController', {}, {
                scope: self.scope
            });
        }));

        it('should monitor if the textarea is open or not', function () {
            var self = this;
            expect(self.controller.isEdit).to.be.false;
            self.controller.toggleTextarea();
            expect(self.controller.isEdit).to.be.true;
            self.controller.toggleTextarea();
            expect(self.controller.isEdit).to.be.false;
        });
    });
});

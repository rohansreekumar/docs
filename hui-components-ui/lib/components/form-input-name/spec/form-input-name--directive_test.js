'use strict';

var chai = require('chai'),
    expect = chai.expect,
    useCase = describe,
    util = require('hui-components-mock/lib/test');

require('./../index');

describe('formInputName Module', function () {

    describe('formInputName', function () {
        describe('Directive', function () {
            beforeEach(angular.mock.module('huiFormInputName'));
            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.template = '<form name="leadFormForm">' +
                    '<input name="name" ng-model="name" form-input-name type="text" />' +
                    '</form>';
            }));


            useCase('used with ngModel', function () {
                util.helpers.directive(angular);

                it('should bind to an attribute', function () {
                    var self = this;

                    expect(self.$el.scope().leadFormForm.name.$validators).to.have.property('fullName');
                });

                it('should be valid when there are 2 or more words', function () {
                    var self = this;

                    self.$el.find('input').val('Donald Trump').trigger('input');
                    self.scope.$apply();

                    expect(self.$el.scope().leadFormForm.name.$invalid).to.be.false;
                    expect(self.$el.scope().leadFormForm.name.$error.fullName).to.be.undefined;

                });

                it('should be invalid when there are less than 2 words', function () {
                    var self = this;

                    self.$el.find('input').val('Donald').trigger('input');
                    self.scope.$apply();

                    expect(self.$el.scope().leadFormForm.name.$invalid).to.be.true;
                    expect(self.$el.scope().leadFormForm.name.$error.fullName).to.be.true;

                });
            });

            useCase('used without ngModel', function () {
                util.helpers.directive(angular);

                it('should fail gracefully if placed on an element without ngModel', function () {
                    var self = this;

                    self.template = '<input name="name" form-input-name type="text" />';

                    expect(self.$el.hasClass('ng-scope')).to.be.true;
                });
            });

            useCase('used with a non-string input', function () {
                util.helpers.directive(angular);

                it('should be invalid if the value is not a string', function () {
                    var self = this;

                    self.template = '<form name="someForm">' +
                        '<input name="number" ng-model="number" form-input-name type="number" />' +
                        '</form>';

                    self.$el.find('input').val(21).trigger('input');

                    self.scope.$apply();

                    expect(self.$el.scope().someForm.number.$invalid).to.be.true;
                    expect(self.$el.scope().someForm.number.$error.fullName).to.be.true;
                });
            });


        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Forms Module', function () {

    beforeEach(angular.mock.module('huiForms.formInputList'));

    describe('Form Input List', function () {
        var fields = {},
            radioListHtml = '<form name="radioForm"><form-input-radio-list ' +
                'class="_radioList" ' +
                'data-form-input-name="beds" ' +
                'data-form-input-data="filterCtrl.fieldData.radios" ' +
                'data-form-input-model="filterCtrl.formInputModel" ' +
                'data-form-input-context="filterCtrl.searchParams">' +
                '</form-input-radio-list></form>';


        fields.radios = {
            multiple: true,
            restrictField: angular.noop,
            displayValue: function () {
                return true;
            },
            defaultValue: function (field) {
                return field.values[0].value;
            },
            values: [
                {
                    key: 'baths_0',
                    display: 'Any',
                    value: '0'
                },
                {
                    key: 'baths_1',
                    display: '1+',
                    value: '1'
                },
                {
                    key: 'baths_2',
                    display: '2+',
                    value: '2',
                    displayIf: {
                        listingStatus: 'FOR SALE'
                    }
                },
                {
                    key: 'baths_3',
                    display: '3+',
                    value: '3',
                    displayIf: {
                        listingStatus: 'FOR RENT'
                    }
                },
                {
                    key: 'baths_4',
                    display: '4+',
                    value: '4'
                },
                {
                    key: 'baths_5',
                    display: '5+',
                    value: '5'
                }
            ]
        };

        describe('Radio List Directive', function () {

            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.controller = function (newFields) {
                    newFields = newFields || fields;
                    return {
                        searchParams: {},
                        fieldData: newFields
                    };
                };

                self.template = radioListHtml;
                self.scope = $rootScope.$new();
                self.scope.filterCtrl = self.controller();

            }));

            describe('binding', function () {

                util.helpers.directive(angular);

                it('should bind to an element.', function () {
                    var self = this;

                    expect(self.$el.find('input[type="radio"]')).to.have.lengthOf(fields.radios.values.length);
                });

                it('should expose its controller as listCtrl.', function () {
                    var self = this;

                    expect(self.$el.find('label').first().scope().listCtrl).to.not.be.undefined;
                });

            });

            describe('values on model', function () {
                util.helpers.directive(angular);

                it('should be correct', function () {
                    var self = this,
                        inputs = self.$el.find('input[type="radio"]'),
                        inputModel;

                    // click one
                    //inputs.first().click();
                    inputs.first().click().trigger('click').blur();
                    //self.scope.$digest();
                    self.scope.$apply();

                    inputModel = self.scope.filterCtrl.formInputModel;

                    expect(inputModel).to.not.be.empty;

                    expect(inputs.first().parent().scope().listCtrl.formInputModel).to.not.be.undefined;
                    expect(inputModel).to.equal(fields.radios.values[0].value);

                });
            });

            describe('values filter', function () {
                util.helpers.sinon(chai);
                util.helpers.directive(angular);


                beforeEach(function () {
                    var self = this;

                    self.displayValue = self.sinon.spy(fields.radios, 'displayValue');
                });


                it('should use a use a provided filter function to filter the available values.', function () {
                    var self = this;

                    expect(self.$el.find('input[type="radio"]')).to.have.length(fields.radios.values.length);

                    expect(self.displayValue).to.have.been.called;
                });
            });
        });
    });
});

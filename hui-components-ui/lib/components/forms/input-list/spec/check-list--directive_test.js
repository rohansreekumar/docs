'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test'),
    _ = require('lodash');

describe('Forms Module', function () {

    beforeEach(angular.mock.module('huiForms.formInputList'));

    describe('Form Input List', function () {
        var fields = {},
            checkListHtml = '<form name="checkForm""><form-input-check-list ' +
                'class="_checkList" ' +
                'data-form-input-name="checkboxes" ' +
                'data-form-input-data="filterCtrl.fieldData.checkboxes" ' +
                'data-form-input-model="filterCtrl.searchParams.checkboxes" ' +
                'data-form-input-context="filterCtrl.searchParams">' +
                '</form-input-check-list></form>',
            noFilterCheckListHtml = '<form name="checkForm""><form-input-check-list ' +
                'class="_checkList" ' +
                'data-form-input-name="checkboxes" ' +
                'data-form-input-data="filterCtrl.fieldData.checkboxes" ' +
                'data-form-input-model="filterCtrl.searchParams.checkboxes">' +
                '</form-input-check-list></form>';


        fields.checkboxes = {
            multiple: true,
            restrictField: function (formScope) {
                return formScope.listingStatus.value === 'HOME VALUE';

            },
            displayValue: function () {
                return true;
            },
            defaultValue: function (field) {
                return field.values[0].value;
            },
            values: [
                {
                    label: 'Resale',
                    value: 'RESALE'
                },
                {
                    label: 'New Home',
                    value: 'NEW HOME'
                },
                {
                    label: 'Foreclosure',
                    value: 'FORECLOSURE',
                    displayIf: {
                        listingStatus: 'FOR SALE'
                    }
                },
                {
                    label: 'Corporate Housing',
                    value: 'CORPORATE',
                    displayIf: {
                        listingStatus: 'FOR RENT'
                    }
                }
            ]
        };

        util.helpers.sinon(chai);

        describe('Check List Directive', function () {

            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.controller = function (newFields) {
                    newFields = newFields || fields;
                    return {
                        searchParams: {},
                        fieldData: newFields
                    };
                };

                self.template = checkListHtml;
                self.scope = $rootScope.$new();
            }));

            describe('binding', function () {

                util.helpers.directive(angular);

                beforeEach(angular.mock.inject(function () {
                    var self = this;

                    self.scope.filterCtrl = self.controller();

                }));

                it('should bind to an element.', function () {
                    var self = this;

                    expect(self.$el.find('input[type="checkbox"]')).to.have.lengthOf(fields.checkboxes.values.length);
                });

                it('should expose its controller as listCtrl.', function () {
                    var self = this;

                    expect(self.$el.find('label').first().scope().listCtrl).to.not.be.undefined;
                });

            });

            describe('values on model', function () {
                util.helpers.directive(angular);

                beforeEach(angular.mock.inject(function () {
                    var self = this;

                    self.scope.filterCtrl = self.controller();

                }));

                it('should be correct', function () {
                    var self = this,
                        inputs = self.$el.find('input[type="checkbox"]'),
                        inputModel;

                    // click one
                    inputs.first().click();
                    self.scope.$digest();

                    inputModel = self.scope.filterCtrl.searchParams.checkboxes;

                    expect(inputModel).to.not.be.empty;

                    expect(inputs.first().parent().scope().listCtrl.formInputModel).to.not.be.undefined;
                    expect(inputs.first().parent().scope().listCtrl.formInputModel[0]).to.equal(fields.checkboxes.values[0].value);

                });
                it('should be an array of the chosen values.', function () {
                    var self = this,
                        inputModel,
                        inputs = self.$el.find('input[type="checkbox"]');

                    //click all
                    inputs.each(function () {
                        this.click();
                    });

                    self.scope.$digest();

                    inputModel = self.scope.filterCtrl.searchParams.checkboxes;

                    expect(_.isArray(inputModel)).to.be.true;
                    expect(inputModel).to.have.length.of(fields.checkboxes.values.length);

                    // click first one to unset
                    inputs.first().click();

                    self.scope.$apply();

                    expect(inputModel).to.have.length.of(fields.checkboxes.values.length - 1);
                });

            });

            describe('values filter', function () {
                beforeEach(angular.mock.inject(function () {
                    var self = this;

                    fields.checkboxes.displayValue = self.sinon.stub();
                    self.scope.filterCtrl = self.controller();

                }));

                describe('when a filter context is provided', function () {
                    util.helpers.directive(angular);

                    it('should use a use a provided filter function to filter the available values.', function () {
                        var self = this;

                        self.scope.filterCtrl.searchParams.listingStatus = 'FOR SALE';

                        expect(self.$el.find('input[type="checkbox"]')).to.have.length.above(0);

                        expect(fields.checkboxes.displayValue).to.have.been.called;
                    });

                    it('should update when the input context changes', function () {

                        var self = this,
                            inputs = self.$el.find('input[type="checkbox"]');

                        self.scope.filterCtrl.searchParams.listingStatus = 'FOR SALE';

                        expect(inputs).to.have.length.above(0);
                        self.scope.$digest();

                        expect(fields.checkboxes.displayValue.callCount).to.equal(fields.checkboxes.values.length);
                        expect(fields.checkboxes.displayValue.calledWith(fields.checkboxes.values[2].displayIf, self.scope.filterCtrl.searchParams)).to.be.true;
                        expect(fields.checkboxes.displayValue.calledWith(fields.checkboxes.values[3].displayIf, self.scope.filterCtrl.searchParams)).to.be.true;

                    });
                });

                describe('when a filter context is not provided', function () {

                    util.helpers.directive(angular);
                    beforeEach(angular.mock.inject(function () {
                        var self = this;

                        self.template = noFilterCheckListHtml;
                    }));


                    it('should not filter.', function () {
                        var self = this;
                        expect(self.$el.find('input[type="checkbox"]')).to.have.length.above(0);

                        self.scope.$digest();
                        self.scope.filterCtrl.searchParams.listingStatus = 'FOR SALE';

                        expect(fields.checkboxes.displayValue).to.not.have.have.been.called;
                    });

                });
            });

            describe('values promise resolution', function () {

                util.helpers.directive(angular);

                var newValues, newFields, getPromise, findInputs;

                beforeEach(angular.mock.inject(function ($q) {
                    var self = this;

                    newValues = [
                        {
                            label: ' cheese',
                            value: 'RESALE'
                        },
                        {
                            label: 'cake',
                            value: 'NEW HOME'
                        },
                        {
                            label: 'puppies',
                            value: 'NEW 4504E'
                        },
                        {
                            label: 'kitties',
                            value: 'NOT THE FACE'
                        }
                    ];

                    getPromise = function () {
                        return $q.defer();
                    };

                    findInputs = function ($document) {
                        return {
                            append: function () {
                                return $document
                                    .find('body')
                                    .append(self.el)
                                    .find('._checkList input[type="checkbox"]');
                            },
                            find: function () {
                                return $document.find('._checkList input[type="checkbox"]');
                            }
                        };
                    };

                    newFields = angular.copy(fields);

                    // standard deferred
                    self.d = getPromise();

                    newFields.checkboxes.values = self.d.promise;

                    self.scope.filterCtrl = self.controller(newFields);
                }));

                afterEach(function () {
                    var self = this;

                    delete self.d;
                    delete self.scope;
                    delete self.$el;
                    delete self.template;
                });
                it('should get the values as a result of a promise.', function () {
                    var self = this;
                    self.d.resolve(newValues);

                    expect(self.$el.find('input[type="checkbox"]')).to.have.lengthOf(newValues.length);
                });

                it('should empty values when the promise is rejected.', function () {
                    var self = this;

                    self.d.reject();

                    expect(self.$el.find('input[type="checkbox"]')).to.have.lengthOf(0);
                });

                it('should update the values from a promise.', function () {
                    var self = this,
                        updatedValues = [
                            {
                                label: 'Cute',
                                value: 'puppy'
                            },
                            {
                                label: 'Good',
                                value: 'also puppy'
                            },
                            {
                                label: 'Furry',
                                value: 'still puppy'
                            }
                        ],
                        secondPromise = getPromise();

                    // resolve first promise
                    self.d.resolve(newValues);

                    expect(self.$el.find('input[type="checkbox"]')).to.have.lengthOf(newValues.length);
                    expect(self.$el.find('label').first().scope().listCtrl.formInputData.filteredValues[0]).to.equal(newValues[0]);
                    expect(self.$el.find('label').first().scope().listCtrl.formInputData.filteredValues[1]).to.equal(newValues[1]);

                    // update values
                    self.scope.filterCtrl.fieldData.checkboxes.values = secondPromise.promise;

                    // update input context to trigger update
                    self.scope.filterCtrl.searchParams.listingStatus = 'FOR SALE';

                    // resove new promise
                    self.scope.$apply(function () {
                        secondPromise.resolve(updatedValues);
                    });

                    // find the inputs
                    expect(self.$el.find('input[type="checkbox"]')).to.have.lengthOf(updatedValues.length);
                    expect(self.$el.find('label').first().scope().listCtrl.formInputData.filteredValues[0]).to.equal(updatedValues[0]);
                    expect(self.$el.find('label').first().scope().listCtrl.formInputData.filteredValues[1]).to.equal(updatedValues[1]);
                });

            });


        });
    });
})
;

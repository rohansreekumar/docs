'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('Forms Module', function () {

    describe('Form Input List', function () {
        describe('behavior service Provider', function () {

            beforeEach(function () {
                var self = this,
                    fakeModule;
                // in order to test provider methods assign a fake module to a variable.
                self.testModule = angular.module('test.huiForms', []);

                // then you have access to the fake modules config functions to test against.
                self.testModule.config(function (_inputListProvider_) {
                    // bind the provider to a variable
                    self.inputListProvider = _inputListProvider_;
                });

                angular.mock.module('huiForms.formInputList', 'huiForms', 'test.huiForms');
                angular.mock.inject();
            });

            it('should update the defaults.', function () {
                var self = this;

                self.inputListProvider.setDefaults({
                    hypotheticalDefault: 'Need Caffeine.'
                });

                expect(self.inputListProvider.defaults.hypotheticalDefault).to.equal('Need Caffeine.');
            });

            describe('swap method', function () {
                it('should swap the elements in an array', function () {
                    var self = this,
                        myArray = [
                            {label:'label1', value:'value1'},
                            {label:'label2', value:'value2'},
                            {label:'label3', value:'value3'},
                            {label:'label4', value:'value4'},
                            {label:'label5', value:'value5'}
                        ];

                    self.inputListProvider.swapFilteredValues(myArray, 3, 4);

                    expect(myArray).to.deep.eql([
                        {label:'label1', value:'value1'},
                        {label:'label2', value:'value2'},
                        {label:'label5', value:'value5'},
                        {label:'label4', value:'value4'},
                        {label:'label3', value:'value3'}
                    ]);
                });
            });
        });
    });
});

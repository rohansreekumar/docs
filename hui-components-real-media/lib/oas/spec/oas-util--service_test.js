'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');


require('./../index.js');

describe('oas Module', function () {

    describe('oasUtil', function () {
        beforeEach(function () {
            var self = this;

            self.testModule = angular.module('test.oas', ['oas']);

            // Get provider reference
            self.testModule.config(function (oasUtilProvider) {
                // bind the provider to a variable
                self.serviceProvider = oasUtilProvider;
            });

            // Get service reference
            angular.mock.module('test.oas');
            angular.mock.inject(function (oasUtil) {
                self.service = oasUtil;
            });
        });


        describe('Provider', function () {

        });


        describe('Service', function () {

        });


    });
});

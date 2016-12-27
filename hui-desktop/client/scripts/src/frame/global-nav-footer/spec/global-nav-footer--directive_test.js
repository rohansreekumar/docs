'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('globalNavFooter Module', function () {
    beforeEach(angular.mock.module('app.frame.globalNavFooter'));
    describe('globalNavFooter', function () {

        describe('Directive', function () {
            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.template = '<global-nav-footer></global-nav-footer>';
            }));

            util.helpers.directive(angular);

            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('global-nav-footer')).to.be.true;
            });

        });

        describe('Controller', function () {

        });


    });
});

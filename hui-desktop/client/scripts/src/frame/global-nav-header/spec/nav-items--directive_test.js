'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('nav items Module', function () {

    beforeEach(angular.mock.module('app.frame.globalNav'));

    describe('navItems', function () {

        describe('Directive', function () {
            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.template = '<nav-items></nav-items>';
            }));

            util.helpers.directive(angular);

            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('items-list')).to.be.true;
            });
        });
    });
});

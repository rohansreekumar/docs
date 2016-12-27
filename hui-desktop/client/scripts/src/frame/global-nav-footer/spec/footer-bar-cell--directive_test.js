'use strict';

var chai = require('chai'),
    expect = chai.expect,

    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Footer bar cell Directive', function () {
    beforeEach(angular.mock.module('hui.details'));
    beforeEach(angular.mock.module('app.frame.globalNavFooter'));
    describe('Footer bar cell Directive', function () {
        beforeEach(angular.mock.inject(function ($rootScope) {
            var self = this;

            self.scope = $rootScope.$new();
            self.template = '<footer-bar-cell></footer-bar-cell>';
        }));

        util.helpers.directive(angular);

        it('should bind to an element', function () {
            var self = this;

            expect(self.$el.hasClass('footer-bar-cell')).to.be.true;
        });
    });
});

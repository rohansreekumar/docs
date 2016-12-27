'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Bind Html Compile Module', function () {
    beforeEach(angular.mock.module('huiBindHtml'));
    describe('Bind Html Compile Directive', function() {
        util.helpers.directive(angular);
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function ($rootScope, $compile) {
            var self = this;
            self.scope = $rootScope.$new();

            self.$compile = self.sinon.spy($compile);
            self.watchSpy = self.sinon.spy(self.scope, '$watch');

            self.scope.description = '<local-schools-tooltip></local-schools-tooltip>';

            self.template = '<div class="tooltip-body" bind-html-compile="description"></div>';
        }));

        it('should bind to an element', function () {
            var self = this;

            expect(self.$el.hasClass('ng-scope')).to.be.true;
        });

        it('should call $compile when description is provided', function () {
            var self = this;

            expect(self.$compile).to.have.been.called;
        });

        it('should call $watch when description is provided', function () {
            var self = this;

            expect(self.watchSpy).to.have.been.called;
        });
    });
});

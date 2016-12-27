'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('layout.landing Module', function () {

    beforeEach(function () {
        var ngModule = angular.module('test.layout.landing', []);
        require('./../home-page-footer--directive')(ngModule);
        angular.mock.module('test.layout.landing');
    });

    describe('homePageFooter', function () {

        describe('Directive', function () {

            beforeEach(angular.mock.inject(function ($rootScope, $templateCache) {
                var self = this;

                self.scope = $rootScope.$new();
                $templateCache.put(
                    '/templates/layout/home-page-footer--directive.html',
                    require('./../templates/home-page-footer--directive.html')
                );
                self.template = '<home-page-footer />';
            }));

            util.helpers.directive(angular);

            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('home-page-footer')).to.be.true;
            });

        });

        describe('Controller', function () {

        });
    });
});

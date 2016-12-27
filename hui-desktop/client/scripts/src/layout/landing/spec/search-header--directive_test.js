'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('layout.landing Module', function () {

    beforeEach(function () {
        var ngModule = angular.module('test.layout.landing', []);
        require('./../search-header--directive')(ngModule);
        angular.mock.module('test.layout.landing');
    });

    describe('searchHeader', function () {

        describe('Directive', function () {

            beforeEach(angular.mock.inject(function ($rootScope, $templateCache) {
                var self = this;

                self.scope = $rootScope.$new();
                $templateCache.put(
                    '/templates/layout/search-header--directive.html',
                    require('./../templates/search-header--directive.html')
                );
                self.template = '<search-header></search-header>';
            }));

            util.helpers.directive(angular);

            it('should bind to an element', function () {
                var self = this;

                expect(self.$el.hasClass('search-header')).to.be.true;
            });

        });

        describe('Controller', function () {

        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('App Router Module', function () {

    describe('View Controller', function () {

        beforeEach(angular.mock.module('app.router'));

        beforeEach(angular.mock.inject(function ($controller, $rootScope) {
            var self = this;

            $rootScope.pageProps = {
                $current: {
                    page: {
                        type: 'foo'
                    }
                }
            };

            self.controller = $controller('ViewController', {});

        }));

        describe('binding', function () {
            it('should expose page properties', function () {
                var self = this;

                expect(self.controller.pageProps).to.not.be.undefined;
            });
        });
    });
});

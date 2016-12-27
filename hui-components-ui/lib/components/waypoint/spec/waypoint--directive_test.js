'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Waypoints module', function () {
    beforeEach(angular.mock.module('huiwaypoint'));

    describe('Waypoint Directive', function () {
        context('binding of the element', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.template = '<waypoint data-ref="$root.globalNav.toggleHeader"></waypoint>';
            }));

            util.helpers.directive(angular);
            it('should bind to an element', angular.mock.inject(function ($timeout) {
                var self = this;
                $timeout.flush(1000);
                expect(self.$el.parent().html()).to.contain('<waypoint');
            }));
        });
    });
});

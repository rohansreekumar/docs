'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Redraw module', function() {
    beforeEach(angular.mock.module('huiRedraw'));

    describe('Redraw Util Service', function() {
        beforeEach(function() {
            var self = this;
            self.userDevice = {
                details: {
                    platform: 'iOS'
                }
            };
            self.element = angular.element('<div class="is-transformable"></div>');
            // you have to call this for the modules to happen, somehow...
            angular.mock.inject(function (redrawUtil) {
                self.service = redrawUtil;
            });
        });

        it('should remove is-transformable from element', function() {
            var self = this;

            self.service.removeTransform(self.element);
            expect(self.element.hasClass('is-transformable')).to.be.false;
        });

        it('should remove is-transformable from element if it is right device', function() {
            var self = this;

            self.service.removeTransformOnPlatform(self.element, 'desktop');
            expect(self.element.hasClass('is-transformable')).to.be.false;
        });
    });
});

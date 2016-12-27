'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Content Carousel Module', function () {
    beforeEach(angular.mock.module('huiContentCarousel'));

    describe('Content Carousel Utility Directive', function () {
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function ($rootScope) {
            var self = this;

            self.scope = $rootScope.$new();
            self.scope.mock_slides = [{}, {}, {}];

            self.template = '<content-carousel-utility ' +
                'data-slides=mock_slides ' +
                'data-carousel-gallery="mock-carousel" ' +
                'data-no-wrap="true"> ' +
                '</content-carousel-utility>';
        }));

        it('should compile the UI-Bootstrap Carousel element', function (done) {
            var self = this;

            expect(self.$el.find('.carousel').attr('uib-carousel')).to.not.equal(undefined);
            expect(self.$el.find('.carousel').attr('active')).to.equal('0');
            expect(self.$el.find('.carousel .item').attr('uib-slide')).to.not.equal(undefined);
            expect(self.$el.find('.carousel .item').attr('ng-repeat')).to.equal('slide in slides track by $index');
            expect(self.$el.find('.carousel .item').attr('index')).to.equal('$index');
            expect(self.$el.find('.carousel mock-carousel').length).to.equal(3);
            done();
        });
    });
});

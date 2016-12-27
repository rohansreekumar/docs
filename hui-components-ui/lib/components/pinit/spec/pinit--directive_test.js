'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Pinit module', function () {
    beforeEach(angular.mock.module('huiPinit'));
    beforeEach(angular.mock.module('huiImageFrame'));

    describe('Pinit Controller', function () {
        describe('position method', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function ($controller, $timeout) {
                var self = this;
                self.$timeout = $timeout;
                self.controller = $controller('pinitController', {}, {
                    pinitId: 'aa',
                    pinitSrc: 'bb',
                    pinitAlt: 'cc'
                });
            }));

            it('should set the pinit button offsets', angular.mock.inject(function ($timeout) {
                var self = this;

                self.controller.position({
                    imageEl: {
                        width: 500,
                        height: 500
                    }
                });

                $timeout.flush();

                expect(self.controller.pinitTranslateX).to.equal(250);
                expect(self.controller.pinitTranslateY).to.equal(250);
            }));

            it('should set the pinit url', angular.mock.inject(function ($timeout) {
                var self = this;

                self.controller.position({
                    imageEl: {
                        width: 500,
                        height: 500
                    }
                });

                $timeout.flush();

                expect(self.controller.href).to.equal('//www.pinterest.com/pin/create/button/?url=http://m.homes.com?imageID=aa1&amp;media=bb&amp;description=cc');
            }));

            it('should set element opacity to 0', function () {
                var self = this,
                    element = {
                        css: self.sinon.stub()
                    };

                self.controller.opacity(element);
                expect(element.css.calledWith('opacity', '0')).to.be.true;
            });

            it('should set pinit url for desktop', function () {
                var self = this;
                self.controller.isDesktop = true;
                self.controller.position({
                    imageEl: {
                        width: 500,
                        height: 500
                    }
                });

                expect(self.controller.href).to.equal('//www.pinterest.com/pin/create/button/?url=http://homes.com?imageID=aa1&amp;media=bb&amp;description=cc');
            });
        });
    });

    describe('Pinit Directive', function () {
        context('binding of the element', function () {
            util.helpers.sinon(chai);
            beforeEach(angular.mock.inject(function ($rootScope) {
                var self = this;

                self.scope = $rootScope.$new();
                self.template = '<div class="gallery-slide-image" image-frame>' +
                    '<img ng-src="cdn.homes.com/cgi-bin/readimage/4196916358"/>' +
                    '<pinit pinit-id="2" pinit-src="cdn.homes.com/cgi-bin/readimage/4196916358" pinit-alt="Image1Alt"></pinit>' +
                    '</div>';
            }));

            util.helpers.directive(angular);
            it('should bind to an element.', function () {
                var self = this;
                expect(self.$el.parent().html()).to.contain('class="pin-it-button');
            });
        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('huiInputFocusScroll Module', function () {

    describe('scrollInputIntoView', function () {
        beforeEach(function () {
            var self = this;

            self.module = angular.module('huiInputFocusScroll');

            self.module.config(function (scrollInputIntoViewProvider) {
                self.serviceProvider = scrollInputIntoViewProvider;
            });

            angular.mock.module('huiDevice');
            angular.mock.module('huiInputFocusScroll');
            angular.mock.inject(function (scrollInputIntoView) {
                self.service = scrollInputIntoView;
            });
        });


        describe('Provider', function () {
            describe('setDefaults method', function () {
                it('should update the defaults', function () {
                    var self = this;

                    self.serviceProvider.setDefaults({
                        hypotheticalDefault: 'Bank of America'
                    });

                    expect(self.serviceProvider.defaults).to.have.property('hypotheticalDefault', 'Bank of America');
                });
            });
        });

        util.helpers.sinon(chai);
        describe('Service', function () {
            beforeEach(function () {
                var self = this,
                    inputFieldTop = '<div class="parent-element">' +
                                    '<input placeholder="not a real text field" autofocus></input>' +
                                '</div>',
                    inputFieldMiddle = '<div class="parent-element" style="position: absolute; top:100px;">' +
                                    '<input placeholder="not a real text field" autofocus></input>' +
                                '</div>',
                    inputFieldBottom = '<div class="parent-element" style="position: absolute; top:700px;">' +
                                    '<input placeholder="not a real text field" autofocus></input>' +
                                '</div>';

                angular.mock.inject(function (
                    $rootScope,
                    $window,
                    $compile,
                    $document
                ) {
                    self.scope = $rootScope.$new();

                    self.document = $document;

                    self.elTop = $compile(inputFieldTop)(self.scope);
                    self.elMiddle = $compile(inputFieldMiddle)(self.scope);
                    self.elBottom = $compile(inputFieldBottom)(self.scope);

                    self.scope.$digest();
                    self.document.find('body').append(self.elTop);
                    self.document.find('body').append(self.elMiddle);
                    self.document.find('body').append(self.elBottom);
                });
            });
            describe('findPos method', function () {
                context('when object has a parent', function () {
                    it('find the position', function () {
                        var self = this,
                            obj = {
                                offsetTop: 10,
                                offsetParent: {
                                    offsetTop: 25
                                }
                            };

                        expect(self.service.findPos(obj)).to.equal(35);
                    });
                });
                context('when object has no parent', function () {
                    it('find the position', function () {
                        var self = this,
                            obj = {
                                offsetTop: 10
                            };

                        expect(self.service.findPos(obj)).to.equal(0);
                    });
                });
            });

            describe('isElementFullyVisible method', function () {
                context('when element is behind header', function () {
                    it('return false', function() {
                        var self = this,
                            testEl =  {
                                parentElement: {
                                    getBoundingClientRect: self.sinon.stub().returns({
                                        top: 10
                                    })
                                }
                            };

                        expect(self.service.isElementFullyVisible(testEl)).to.equal(false);
                    });
                });
                context('when element is behind footer', function () {
                    it('return false', function() {
                        var self = this,
                            testEl =  {
                                parentElement: {
                                    getBoundingClientRect: self.sinon.stub().returns({
                                        bottom: 275
                                    })
                                }
                            };

                        expect(self.service.isElementFullyVisible(testEl)).to.equal(false);
                    });
                });
                context('when element is neither behind header nor footer', function () {
                    it('return true', function() {
                        var self = this,
                            testEl =  {
                                parentElement: {
                                    getBoundingClientRect: self.sinon.stub().returns({
                                        top: 101,
                                        bottom: 99
                                    })
                                }
                            };

                        expect(self.service.isElementFullyVisible(testEl)).to.equal(true);
                    });
                });
                context('when case is undefined', function () {
                    it('return false ', function() {
                        var self = this,
                            testEl =  {
                                parentElement: {
                                    getBoundingClientRect: self.sinon.stub().returns({
                                        bottom: 10
                                    })
                                }
                            };

                        expect(self.service.isElementFullyVisible(testEl)).to.equal(false);
                    });
                });
            });

            describe('scroll method', function () {
                context('when tagName equals INPUT', function () {
                    context('when not fully visible', function () {
                        context('when rect.bottom is less than half of $window.innerHeight', function () {
                            it('should call scroll top', function () {
                                var self = this,
                                    scrollableElement = {
                                        scrollTop: self.sinon.spy()
                                    },
                                    input = self.document.find('input')[0];

                                input.focus();

                                self.service.scroll(scrollableElement);

                                expect(scrollableElement.scrollTop.calledWith(-74)).to.equal(true);
                            });
                        });
                        context('when rect.bottom is greater than or equal to half of $window.innerHeight', function () {
                            it('should call scroll top', function () {
                                var self = this,
                                    scrollableElement = {
                                        scrollTop: self.sinon.spy()
                                    },
                                    input = self.document.find('input')[2];

                                input.focus();

                                self.service.scroll(scrollableElement);

                                expect(scrollableElement.scrollTop.calledWith(66)).to.equal(true);
                            });
                        });
                    });
                    context('when is fully visible', function () {
                        context('when rect.bottom is greater than or equal to half of $window.innerHeight', function () {
                            it('should call scroll top', function () {
                                var self = this,
                                    scrollableElement = {
                                        scrollTop: self.sinon.spy()
                                    },
                                    input = self.document.find('input')[1];

                                input.focus();

                                self.service.scroll(scrollableElement);

                                expect(scrollableElement.scrollTop.called).to.equal(false);
                            });
                        });
                    });
                });
            });
        });
    });
});

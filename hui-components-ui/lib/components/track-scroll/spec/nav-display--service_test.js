'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

describe('huiTrackScroll Module', function () {

    util.helpers.sinon(chai);

    describe('navDisplay', function () {
        beforeEach(function () {
            var self = this;

            self.module = angular.module('huiTrackScroll');

            self.module.config(function (navDisplayProvider) {
                self.serviceProvider = navDisplayProvider;
            });

            angular.mock.module('huiTrackScroll');

            angular.mock.inject(function (navDisplay) {
                self.service = navDisplay;
            });
        });

        describe('Provider', function () {
            describe('setDefaults method', function () {
                it('should update the defaults', function () {
                    var self = this;

                    self.serviceProvider.setDefaults({
                        bottomElementClass: 'search-header',
                        topElementClass: 'main-nav'
                    });

                    expect(self.serviceProvider.defaults).to.have.property('topElementClass', 'main-nav');
                });
            });
        });

        beforeEach(function () {
            var self = this,
                bottomElement = '<div class="test-element-search-header">Test Element Search Header</div>',
                topElement = '<div class="test-element-main-nav">Test Element Main Nav</div>';

            angular.mock.inject(function (
                trackScroll,
                $timeout,
                $rootScope,
                $compile,
                $document
            ) {
                // Required Services
                self.timeout = $timeout;
                self.trackScroll = trackScroll;

                // Set defaults
                self.serviceProvider.setDefaults({
                    bottomElementClass: 'test-element-search-header',
                    topElementClass: 'test-element-main-nav',
                    animationSpeed: 0
                });

                // Adding test elements to the DOM
                self.scope = $rootScope.$new();
                $compile(bottomElement)(self.scope);
                $compile(topElement)(self.scope);
                $document.find('body').append(bottomElement);
                $document.find('body').append(topElement);

                // Angular elements to check classes
                self.searchHeader = angular.element('.test-element-search-header');
                self.mainNav = angular.element('.test-element-main-nav');
            });
        });

        describe('Service', function () {
            describe('showTopElement method', function () {
                context('show equals false', function () {
                    it('should hide topElement', function () {
                        var self = this;

                        self.service.showTopElement(false);

                        expect(self.searchHeader.hasClass('test-element-search-header--push-down')).to.equal(false);
                        expect(self.mainNav.hasClass('test-element-main-nav--visible')).to.equal(false);
                        expect(self.mainNav.hasClass('test-element-main-nav--hidden')).to.equal(true);
                    });
                });
                context('show does not equal false', function () {
                    it('should hide topElement', function () {
                        var self = this;

                        self.service.showTopElement(true);

                        expect(self.searchHeader.hasClass('test-element-search-header--push-down')).to.equal(true);
                        expect(self.mainNav.hasClass('test-element-main-nav--visible')).to.equal(true);
                        expect(self.mainNav.hasClass('test-element-main-nav--hidden')).to.equal(false);
                    });
                });
            });
            describe('delayedToggleTopElement method', function() {
                context('bottomElement has --visible class', function () {
                    it('should remove fixed and hidden classes', function () {
                        var self = this;

                        self.service.getTopElement = self.sinon.stub().returns({
                            hasClass: self.sinon.stub().returns(true),
                            removeClass: self.sinon.stub(),
                            addClass: self.sinon.stub()
                        });

                        self.service.delayedToggleTopElement('up');

                        self.timeout.flush();

                        expect(self.service.getTopElement().hasClass.called).to.equal(true);
                        expect(self.service.getTopElement().removeClass.called).to.equal(true);
                    });
                });
                context('bottomElement doesn\'t have --fixed class', function () {
                    it('should add fixed class', function () {
                        var self = this;

                        self.service.getTopElement = self.sinon.stub().returns({
                            hasClass: self.sinon.stub().returns(false),
                            removeClass: self.sinon.stub(),
                            addClass: self.sinon.stub()
                        });

                        self.service.delayedToggleTopElement('down');

                        self.timeout.flush();

                        expect(self.service.getTopElement().addClass.called).to.equal(true);
                    });
                });
            });
            describe('scrollAction method', function () {
                beforeEach(function () {
                    var self = this;

                    self.service.getBottomElement = self.sinon.stub().returns({
                        hasClass: self.sinon.stub().returns(true),
                        removeClass: self.sinon.stub(),
                        addClass: self.sinon.stub()
                    });
                    self.service.showTopElement = self.sinon.stub();
                    self.trackScroll.setBaseline = self.sinon.stub();
                });
                context('baselineCheck is true, bottomElement has visible class', function () {
                    it('call showTopElement method', function () {
                        var self = this;

                        self.trackScroll.baselineCheck = self.sinon.stub().returns(true);

                        self.service.scrollAction();

                        expect(self.service.showTopElement.calledWith(false)).to.equal(true);
                        expect(self.trackScroll.setBaseline.called).to.equal(true);
                    });
                });
                context('baselineCheck is false', function () {
                    it('call showTopElement method', function () {
                        var self = this;

                        self.trackScroll.baselineCheck = self.sinon.stub().returns(false);

                        self.service.scrollAction();

                        expect(self.service.showTopElement.called).to.equal(false);
                        expect(self.trackScroll.setBaseline.called).to.equal(true);
                    });
                });
                context('bottomElement doesn\'t have --visible class', function () {
                    it('call showTopElement method', function () {
                        var self = this;

                        self.service.getBottomElement = self.sinon.stub().returns({
                            hasClass: self.sinon.stub().returns(false),
                            removeClass: self.sinon.stub(),
                            addClass: self.sinon.stub()
                        });

                        self.service.scrollAction();

                        expect(self.trackScroll.setBaseline.called).to.equal(true);
                    });
                });
                context('bottomElement is visible, baselineCheck is false, trackScroll returns false', function () {
                    it('call showTopElement method', function () {
                        var self = this;

                        self.trackScroll.returnSetScroll = self.sinon.stub().returns(false);

                        self.service.scrollAction();

                        expect(self.service.showTopElement.called).to.equal(false);
                        expect(self.trackScroll.setBaseline.called).to.equal(true);
                    });
                });
                context('bottomElement is visible, baselineCheck is false, trackScroll returns true', function () {
                    it('call showTopElement method', function () {
                        var self = this;

                        self.trackScroll.returnSetScroll = self.sinon.stub().returns(true);

                        self.service.scrollAction();

                        expect(self.service.showTopElement.called).to.equal(true);
                        expect(self.trackScroll.setBaseline.called).to.equal(true);
                    });
                });
            });
            describe('down method', function () {
                it('should hide bottom element and remove top element above it', function () {
                    var self = this,
                        searchHeaderFound = angular.element('.test-element-search-header'),
                        delayedToggleTopElement = self.sinon.stub();

                    self.service.delayedToggleTopElement = self.sinon.stub();
                    self.service.getBottomElement = self.sinon.stub().returns({
                        addClass: self.sinon.stub()
                    });

                    self.service.down();

                    expect(self.service.getBottomElement.called).to.equal(true);
                    expect(self.service.delayedToggleTopElement.called).to.equal(true);
                });
            });
            describe('up method', function () {
                it('should show bottom element and add top element above it', function () {
                    var self = this,
                        searchHeaderFound = angular.element('.test-element-search-header');

                    self.service.delayedToggleTopElement = self.sinon.stub();
                    self.service.showTopElement = self.sinon.stub();
                    self.service.getBottomElement = self.sinon.stub().returns({
                        removeClass: self.sinon.stub()
                    });

                    self.service.up();

                    expect(self.service.showTopElement.called).to.equal(true);
                    expect(self.service.getBottomElement.called).to.equal(true);
                    expect(self.service.delayedToggleTopElement.called).to.equal(true);
                });
            });
        });
    });
});

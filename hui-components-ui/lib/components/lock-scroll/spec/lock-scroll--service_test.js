'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('huiLockScroll Module', function () {
    // Load huiLockScroll module

    beforeEach(function () {
        var self = this;
        angular.mock.module('huiLockScroll');
        self.testModule = angular.module('test.huiLockScroll', ['huiLockScroll']);
        self.testModule.config(function (_LockScrollProvider_) {
            self.LockScrollProvider = _LockScrollProvider_;
        });
        angular.mock.module('test.huiLockScroll');
        angular.mock.inject(function (_LockScroll_) {
            var self = this;
            self.service = _LockScroll_;
        });
    });

    describe('LockScroll Provider', function () {
        it('should update the defaults.', function () {
            var self = this;
            self.LockScrollProvider.setDefaults({
                thisIs: 'Sparta'
            });
            expect(self.LockScrollProvider.defaults).to.have.property('thisIs', 'Sparta');
        });
    });

    describe('LockScroll Service', function () {
        describe('for body tag without style attribute', function () {
            it('should add _lock--scroll class when modal is opened', function () {
                var self = this,
                    body;
                angular.mock.inject(function ($document) {
                    body = $document.find('body');
                });
                self.service.lock();
                expect(body.hasClass('_lock--scroll')).to.be.true;
            });

            it('should remove _lock--scroll class when modal is closed', function () {
                var self = this,
                    body;
                angular.mock.inject(function ($document) {
                    body = $document.find('body');
                });
                self.service.unlock();
                expect(body.hasClass('_lock--scroll')).to.be.false;
            });

            it('should add _lock--scroll class when starting transitioning pages', function () {
                var self = this,
                    body,
                    rootScope;
                angular.mock.inject(function ($document, $rootScope) {
                    body = $document.find('body');
                    rootScope = $rootScope;
                });
                rootScope.$broadcast('$locationChangeStart');
                expect(body.hasClass('_lock--scroll')).to.be.true;
            });

            it('should remove _lock--scroll class and scroll to top position when finishing transitioning pages', function () {
                var self = this,
                    body,
                    rootScope;
                angular.mock.inject(function ($document, $rootScope) {
                    body = $document.find('body');
                    rootScope = $rootScope;
                });
                rootScope.$broadcast('$stateChangeSuccess');
                expect(body.hasClass('_lock--scroll')).to.be.false;
                expect(body.scrollTop()).to.be.equal(0);
            });
        });
        describe('for body tag with style attribute', function () {
            it('should add _lock--scroll class when modal is opened', function () {
                var self = this,
                    body;
                angular.mock.inject(function ($document) {
                    body = $document.find('body');
                    body.css({ color: '#ddd', position: 'relative', top: '50px' });
                });
                self.service.lock();
                expect(body.hasClass('_lock--scroll')).to.be.true;
            });

            it('should remove _lock--scroll class when modal is closed', function () {
                var self = this,
                    body;
                angular.mock.inject(function ($document) {
                    body = $document.find('body');
                    body.css({ color: '#ddd', position: 'relative', top: '50px' });
                });
                self.service.unlock();
                expect(body.hasClass('_lock--scroll')).to.be.false;
            });
        });

        describe('for body tag with style attribute when restore scenario with second modal', function () {
            it('should remove _lock--scroll class when body contains already lock scroll class', function () {
                var self = this,
                    body;
                angular.mock.inject(function ($document) {
                    body = $document.find('body');
                    body.addClass('_lock--scroll');
                    body.css({ color: '#ddd', position: 'relative', top: '50px' });
                });
                self.service.lock();
                expect(body.hasClass('_lock--scroll')).to.be.true;
                self.service.unlock();
                expect(body.hasClass('_lock--scroll')).to.be.false;
            });
        });
    });
});

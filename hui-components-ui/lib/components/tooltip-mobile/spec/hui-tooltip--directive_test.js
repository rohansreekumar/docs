'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Tooltip Module', function () {
    // Load huiTooltip module
    beforeEach(angular.mock.module('huiTooltip'));
    beforeEach(function () {
        var self = this;

        self.testModule = angular.module('test.huiTooltip', ['huiTooltip']);
        self.testModule.config(function (_tooltipProvider_) {
            self.tooltipProvider = _tooltipProvider_;
        });
        angular.mock.module('test.huiTooltip');
        angular.mock.inject();
    });

    describe('Tooltip Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(
            function (tooltip, ngDialog) {
                var self = this;

                self.service = tooltip;
                self.ngDialog = {
                    open: self.sinon.stub(ngDialog, 'open', function () {
                        return {
                            closePromise: {
                                then: function (resolve, reject) {
                                }
                            }
                        };
                    }),
                    close: self.sinon.stub(ngDialog, 'close')
                };
            }
        ));

        describe('$$dialog test', function () {
            it('should not open dialog if $$dialog is already defined', function () {
                var self = this;
                self.service.$$dialog = 'tooltip';
                self.service.openTooltip();
                expect(self.ngDialog.open).to.not.have.been.called;
            });
        });

        describe('Tooltip $$closeCallback', function () {
            it('should clear the dalog', function () {
                var self = this;
                self.service.$$dialog = 'tooltip';
                self.service.$$closeCallback();
                expect(self.service.$$dialog).to.not.equal('tooltip');
                expect(self.service.$$dialog).to.be.undefined;
            });
        });
    });

    describe('Tooltip Provider', function () {
        it('should update the defaults.', function () {
            var self = this;
            self.tooltipProvider.setDefaults({
                thisIs: 'Sparta'
            });
            expect(self.tooltipProvider.defaults).to.have.property('thisIs', 'Sparta');
        });
    });

    describe('Open Tooltip Directive', function () {
        util.helpers.sinon(chai);
        util.helpers.directive(angular);
        beforeEach(angular.mock.inject(function (ngDialog, tooltip, $rootScope) {
            var self = this;
            self.scope = $rootScope.$new();
            self.template = '<a data-open-tooltip>Disclaimer</a>';
            self.openSpy = self.sinon.spy(ngDialog, 'open');
        }));

        it('should call the open tooltip method', function () {
            var self = this;
            self.$el.click();
            expect(self.openSpy).to.have.been.called;
        });
    });
});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test'),
    template = '<section hui-preview-accordion accordion-lines="4">' +
        ' <section hui-preview-accordion-content>' +
        '   {{ctrl.text}}' +
        ' </section>' +
        ' <a ng-click="accordion.isOpen = !accordion.isOpen" ng-show="accordion.displayButton">Trigger</a>' +
        '</section hui-preview-accordion>',

    accordionTpl = '<section hui-preview-accordion accordion-lines="4"></section>',

    contentTpl = '<div class="fakeParent">' +
        '<section hui-preview-accordion-content>' +
        '<img height="300" width="300" src="http://placehold.it/300x300">' +
        '</section>' +
        '</div>';

require('./../index.js');

describe('HUI Preview Accordion', function () {

    var self, el, ctrl, render, $scope, $document, $mockAttrs, mockHuiPreviewAccordionLineHeight, instantiate;

    describe('HUI Preview Accordion Directive', function () {

        self = this;

        beforeEach(angular.mock.module('huiPreviewAccordion', function ($controllerProvider) {

            $controllerProvider.register('huiPreviewAccordionCtrl', function () {
                return {
                    someMethod: function () {
                        return true;
                    }
                };
            });

        }));

        beforeEach(angular.mock.inject(function ($rootScope, $compile, _$document_) {

            $scope = $rootScope.$new();
            $document = _$document_;

            render = function () {

                self.el = $compile(accordionTpl)($scope);
                $scope.$digest();

                el = $document
                    .find('body')
                    .append(self.el)
                    .find('[hui-preview-accordion]');

            };

        }));

        afterEach(function () {
            $document
                .find('[hui-preview-accordion]')
                .remove();
        });

        it('should bind to an attribute', function () {

            render();

            expect(el.hasClass('ng-scope')).to.be.true;

        });

    });

    describe('HUI Preview Accordion Controller', function () {

        beforeEach(angular.mock.module('huiPreviewAccordion'));

        beforeEach(angular.mock.inject(function ($controller, $rootScope) {

            $scope = $rootScope.$new();
            $mockAttrs = {
                accordionLines: 4
            };
            mockHuiPreviewAccordionLineHeight = 20;

            instantiate = function () {
                ctrl = $controller('huiPreviewAccordionCtrl', {
                    $attrs: $mockAttrs,
                    huiPreviewAccordionLineHeight: mockHuiPreviewAccordionLineHeight,
                    $scope: $scope
                });
            };

        }));

        it('should open the accordion', function () {

            instantiate();

            ctrl.openAccordion();

            expect(ctrl.isOpen).to.be.true;

        });

        it('should close the accordion', function () {

            instantiate();

            ctrl.closeAccordion();

            expect(ctrl.isOpen).to.be.false;

        });

        it('should set the default value of accordionLines to 4', function () {

            $mockAttrs.accordionLines = undefined;

            instantiate();

            expect(ctrl.accordionLines).to.equal(4);

        });

    });

    describe('HUI Preview Accordion Content Directive', function () {

        var fooCtrl, $document, $window;

        beforeEach(angular.mock.module('huiPreviewAccordion', function ($provide) {

            $provide.value('huiPreviewAccordionLineHeight', 20);
            $provide.service('_', function () {
                return {
                    throttle: function (argA, argB) {
                        argA();
                    }
                };
            });

        }));

        beforeEach(angular.mock.inject(function ($rootScope, $compile, _$document_, _$window_) {

            $scope = $rootScope.$new();
            $document = _$document_;
            $window = _$window_;

            fooCtrl = {
                isOpen: false,
                displayButton: false,
                text: 'A lovely bunch of coconuts!',
                accordionLines: 4
            };

            render = function () {

                el = $document
                    .find('body')
                    .append(contentTpl)
                    .find('[hui-preview-accordion-content]');

                angular.element('.fakeParent')
                    .data('$huiPreviewAccordionController', fooCtrl);

                $compile(el[0])($scope);

                $scope.$digest();

            };

        }));

        afterEach(function () {

            $document.find('.fakeParent').remove();

        });

        it('should bind to an attribute', function () {

            render();

            expect(el.hasClass('ng-scope')).to.be.true;

        });

        it('should check the height of the content if resize event is heard', function () {

            render();

            angular.element($window).trigger('resize');

            expect(fooCtrl.displayButton).to.equal(true);

        });

        it('should set the state of displayButton to true if the scrollHeight of the element is greater than the closedHeight', function () {

            render();

            angular.element($window).trigger('resize');

            expect(fooCtrl.displayButton).to.equal(true);

        });

        it('set the state of displayButton to false if the scrollHeight of the element is less than the closedHeight', function () {

            contentTpl = contentTpl.replace(/height="300"/i, 'height="10"');

            render();

            angular.element($window).trigger('resize');

            $scope.$apply();

            expect(fooCtrl.displayButton).to.equal(false);

        });

        it('set the state of displayButton to false if the scrollHeight of the element is equal to the closedHeight', function () {

            contentTpl = contentTpl.replace(/height="300"/i, 'height="80"');
            render();
            angular.element($window).trigger('resize');
            $scope.$apply();
            expect(fooCtrl.displayButton).to.equal(false);
        });

        it('should set the element\'s transition property to be max-height if the controller\'s isOpen property is true', function () {
            render();

            fooCtrl.isOpen = true;

            $scope.$apply();

            expect(el.css('-webkit-transition-property')).to.equal('max-height');
        });

        it('should set the element\'s max-height to the product of \'accordionLines\' and \'huiPreviewAccordionLineHeight\' if isOpen property is false', function () {

            render();

            fooCtrl.isOpen = false;

            $scope.$apply();

            expect(el.css('max-height')).to.equal('80px');

        });

    });

});

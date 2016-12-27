'use strict';

require('./../index.js');

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash');


describe('Float Label', function () {

    beforeEach(angular.mock.module('huiFloatLabel'));

    describe('Float Label Directive', function () {
        var floatLabelHtml = '<form name="floatLabelForm">' +
                '<div>' +
                '<div data-float-label="{{theLabel}}">' +
                '<input type="text"' +
                'name="floatLabel" ' +
                'ng-model="floatLabel" ' +
                'placeholder="{{theLabel}}"> ' +
                '</div>' +
                '</form>',
            render;

        afterEach(angular.mock.inject(function ($document) {
            $document.find('[data-float-label]').remove();
        }));

        beforeEach(angular.mock.inject(function ($rootScope, $compile, $controller) {
            var self = this, $scope = $rootScope.$new(), compileFn = $compile(floatLabelHtml);

            render = function () {
                self.el = compileFn($scope);
                $rootScope.$digest();
            };

            $scope.theLabel = 'excuse me';

            self.scope = $scope;

        }));
        it('should bind to an element', function () {
            var self = this;


            render();

            angular.mock.inject(function ($document) {
                var placeholder = $document
                    .find('body')
                    .append(self.el)
                    .find('[data-float-label] input')
                    .attr('placeholder');

                expect(placeholder).to.not.be.undefined;
                expect(placeholder).to.equal(self.scope.theLabel);
            });
        });
    });
});

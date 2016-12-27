'use strict';

/**
 * Setup and teardown directive
 * @param angular reference to angular
 */
module.exports = function (angular) {

    beforeEach(angular.mock.inject([
        '$rootScope',
        '$compile',
        '$document',
        function ($rootScope,
                  $compile,
                  $document) {

            var _renderedEl;

            Object.defineProperty(this, '$el', {
                get: function () {
                    if (!_renderedEl) {
                        if (this.scope === undefined) {
                            console.warn('Test Directive Helper: No scope provided for template.');
                        }
                        _renderedEl = $compile(this.template)(this.scope);
                        $document.find('body').prepend(_renderedEl);
                        $rootScope.$digest();

                        if (this.$httpBackend && this.templateExternal) {

                            this.$httpBackend.flush();
                        }
                    }

                    return _renderedEl;
                },
                set: function () {
                },
                enumerable: true,
                configurable: true
            });
        }
    ]));

    afterEach(function () {
        if (this.$el) {
            (this.scope) ? this.scope.$destroy() : undefined;
            this.$el.remove();
        }
    });
};

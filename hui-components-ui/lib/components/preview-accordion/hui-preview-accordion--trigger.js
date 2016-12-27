'use strict';

module.exports = function(ngModule) {

    /**
     * @ngdoc directive
     * @name huiPreviewAccordionTrigger
     * @module huiPreviewAccordion
     * @restrict A
     * @require
     *   huiPreviewAccordion
     *
     * @description
     * A directive added to a element that flags it as the trigger for the
     * content area of huiPreviewAccordion.  Will display if the controller's
     * displayButton property is true, will be hidden otherwise.
     *
     * @example
     * <a hui-preview-accordion-trigger ng-show="accordion.displayButton">Show More</a>
     */
    ngModule.directive('huiPreviewAccordionTrigger', function() {
        var directive = {
            restrict: 'A',
            require: '^huiPreviewAccordion'
        };
        return directive;
    });
};

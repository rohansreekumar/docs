'use strict';

module.exports = function(ngModule) {

    /**
     * @ngdoc directive
     * @name huiPreviewAccordion
     * @module huiPreviewAccordion
     * @restrict E
     *
     * @param {number} accordion-lines
     * When multiplied against the value of huiPreviewAccordionLineHeight,
     * (defined in hui-mobile's app.js) sets the intial height of the
     * preview-accordion--content element;
     *
     * @description
     * huiPreviewAccordion is a directive that--when used with
     * huiPreviewAccordionContent and huiPreviewAccordionTrigger--builds a
     * generic expandable content box.
     *
     * @example
     * <section hui-preview-accordion accordion-lines="4">
     *   <section hui-preview-accordion-content>
     *     <!-- arbitrary content here -->
     *     <h1>Collected works of George Orwell</h1>
     *     <h2>Animal Farm</h2>
     *     <img src="animal-farm-cover.jpg">
     *     <p>All animals are equal, but some animals are more equal than others.</p>
     *     <!-- end arbitrary content -->
     *   </section>
     *   <a hui-preview-accordion-trigger ng-show="accordion.displayButton">Potato</a>
     * </section hui-preview-accordion>
     */

    ngModule.directive('huiPreviewAccordion', function() {

        var directive = {
            restrict: 'A',
            bindToController: true,
            scope: true,
            controller: 'huiPreviewAccordionCtrl',
            controllerAs: 'accordion'
        };

        return directive;

    });

    /**
     * @ngdoc controller
     * @name huiPreviewAccordionCtrl
     * @module huiPreviewAccordion
     * @requires $attrs, huiPreviewAccordionLineHeight
     *
     * Controller for the huiPreviewAccordion.
     */

    ngModule.controller('huiPreviewAccordionCtrl', [
        '$attrs',
        'huiPreviewAccordionLineHeight',
        function($attrs, huiPreviewAccordionLineHeight) {

            var _this = this;

            /**
             * Set the initial state of displayButton to true, and the state of
             * isOpen to false;
             */

            _this.displayButton = true;
            _this.isOpen = false;

            /**
             * Expose the value of $attrs.accordionLines (or default of 4) on
             * the controller's accordionLines property.
             */

            _this.accordionLines = $attrs.accordionLines || 4;

            /**
             * @ngdoc method
             * @name huiPreviewAccordionCtrl#openAccordion
             * @description
             * Sets the state of huiPreviewAccordionCtrl's isOpen property to
             * true.
             */

            _this.openAccordion = function() {
                _this.isOpen = true;
            };

            /**
             * @ngdoc method
             * @name huiPreviewAccordionCtrl#closeAccordion
             * @description
             * Sets the state of huiPreviewAccordionCtrl's isOpen property to
             * false.
             */

            _this.closeAccordion = function() {
                _this.isOpen = false;
            };

        }
    ]);

};

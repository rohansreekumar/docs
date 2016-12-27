'use strict';

module.exports = function(ngModule) {

    /**
     * @ngdoc directive
     * @name huiPreviewAccordionContent
     * @module huiPreviewAccordion
     * @restrict A
     * @require
     *   huiPreviewAccordion
     *   $window
     *   _,
     *   huiPreviewAccordionLineHeight
     *
     * @description
     * A directive added to a element that flags it and it's contents as being
     * the content container for huiPreviewAccordion.
     *
     * <section hui-preview-accordion-content>
     *   <!-- arbitrary content here -->
     *   <h1>Collected works of George Orwell</h1>
     *   <h2>Animal Farm</h2>
     *   <img src="animal-farm-cover.jpg">
     *   <p>All animals are equal, but some animals are more equal than others.</p>
     *   <!-- end arbitrary content -->
     * </section>
     */

    ngModule.directive('huiPreviewAccordionContent', [
        '$window',
        'huiPreviewAccordionLineHeight',
        '_',
        function(
            $window,
            huiPreviewAccordionLineHeight,
            _
        ) {

            var directive = {
                restrict: 'A',
                require: '^huiPreviewAccordion',
                link: function(scope, element, attrs, ctrl) {

                    /**
                     * Set the values of closedHeight and scrollHeight.
                     * closedHeight - (No. of Lines to show) * (Height of each line)
                     * scrollHeight - Height of the content container if it were open.
                     */

                    var closedHeight = ctrl.accordionLines * huiPreviewAccordionLineHeight,
                        scrollHeight = element[0].scrollHeight;

                    /**
                     * @ngdoc function
                     * @name heightCheck
                     * @description
                     * Gets the current value of the element's scroll height. If the
                     * scroll height is greater than closed height, set
                     * the value of ctrl.displayButton to true.  Else, set it to
                     * false.
                     */

                    function heightCheck() {
                        scrollHeight = element[0].scrollHeight;
                        if (scrollHeight > closedHeight) {
                            ctrl.displayButton = true;
                        } else {
                            ctrl.displayButton = false;
                        }
                    }

                    scope.$watch(scrollHeight, function() {
                        heightCheck();
                    });

                    /**
                     * @ngdoc function
                     * @name restrictHeight
                     * @description
                     * Checks the state of ctrl.isOpen. If true, set the max-height
                     * of the element to none.  Otherwise, set the max-height of the
                     * element to closedHeight.
                     */

                    function restrictHeight() {

                        if (ctrl.isOpen) {
                            // Set transition here as within css file for section does not work.
                            element.css('transition', 'max-height 0.5s ease-in-out');
                            // Set mas-height to large defined figure to allow transition css to take effect.
                            // setting as "none" does not allow the transitions to know transition difference to animate.
                            element.css('max-height', '1000px');
                        } else {
                            // Return to set height defined in accordion-lines(x) attribute on element.
                            element.css('max-height', closedHeight);
                        }
                    }

                    restrictHeight();

                    /**
                     * Watch the state of ctrl.isOpen and fire restrictHeight() if
                     * it changes.
                     */
                    scope.$watch(function() {
                        return ctrl.isOpen;
                    }, restrictHeight);

                    /**
                     * Listen for $window to fire a 'resize' event and
                     * fire a throttled version of heightCheck().
                     */
                    angular.element($window).bind('resize', _.throttle(heightCheck, 300));

                }
            };

            return directive;

        }
    ]);

};

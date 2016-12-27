'use strict';

exports = module.exports = function (ngModule) {


    ngModule.directive('closeButton', [
        function () {
            /**
             * @ngdoc directive
             *
             * @name  closeButton
             * @module  hui
             *
             *
             * @restrict AE
             *
             * @description
             *
             * The `closeButton` directive closes a lightbox or overlay
             *
             * @example
             <example>
             <div class="alert"><close-button /></div>
             </example>
             */

            var directive = {
                restrict: 'AE',
                replace: true,
                templateUrl: '/ui/templates/close.html'
            };

            directive.link = function ($scope, element) {

            };

            return directive;
        }
    ]);
};

'use strict';

module.exports = function (ngModule) {


    ngModule.directive('postalAddress', [
        function () {
            /**
             * @ngdoc directive
             *
             * @name  postalAddress
             * @module  hui
             *
             *
             * @restrict E
             *
             * @description
             *
             * The `postalAddress` outputs a postal address with Schema markup
             *
             * @example
             <example>
             <postal-address data-ng-model="detail.address"></postal-address>
             </example>
             */
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/ui/templates/postal-address.html',
                scope: {
                    address: '=ngModel'
                }
            };
        }
    ]);
};

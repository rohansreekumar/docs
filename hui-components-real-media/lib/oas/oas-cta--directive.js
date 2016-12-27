'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name oasCta
     * @module oas
     * @restrict E
     *
     * @description
     * Load an OAS (RealMedia) Ad.
     *
     * @param pos holds the position
     * @param size contains size
     *
     * @example
     * <oas-cta data-pos='x01' data-size='[230,60]'></oas-cta>
     *
     */
    ngModule
        .directive('oasCta', function () {
            return {
                restrict: 'E',
                replace: true,
                bindToController: {
                    pos: '@',
                    size: '='
                },
                templateUrl: '/templates/oas/oas-cta--directive.html',
                controllerAs: 'oasCtaCtrl',
                controller: 'oasCtaController',
                compile: function (tEl, tAttrs) {
                    var cta;

                    function preLink($scope, el, attr, ctrl) {
                        cta = document.createElement('div');
                        cta.id = 'oas_' + attr.pos;
                    }

                    function postLink($scope, el, attr, ctrl) {
                        el.append(cta);
                        ctrl.pos = attr.pos;
                        ctrl.size = attr.size;
                        ctrl.init(el);
                    }

                    return {
                        pre: preLink,
                        post: postLink
                    };
                }
            };
        })

    /**
     * @ngdoc controller
     * @name oasCtaController
     * @module oas
     *
     * @description
     * controller for oas-cta directive
     *
     * @requires $scope
     * @requires oas
     *
     */
    .controller('oasCtaController', [
        '$scope',
        'oas',
        function (
            $scope,
            oas
        ) {

            var self = this;

            /**
             * @ngdoc method
             * @name oasController#init
             *
             * Intialize an oas ad
             */
            self.init = function initOasCta() {
                if (!self.pos || !self.size) {
                    // both size and position are required for all oas positions
                    return;
                }

                oas.loadCta(self.pos, JSON.parse(self.size));
            };

            $scope.$on('$destroy', function () {
                oas.destroyPosition(self.pos);
            });
        }
    ]);
};

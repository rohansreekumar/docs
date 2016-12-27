'use strict';


module.exports = function(ngModule) {

    ngModule
    /**
     * @ngdoc directive
     * @name client.frame.globalNavFooter.directive:footerBarCell
     * @restrict E
     *
     * @description
     * Generates the footer Bar template.
     * @link client.frame.globalNavFooter.directive:footerBarCell
     *
     * @returns footer bar template.
     */
    .directive('footerBarCell', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: '/templates/globalNavFooter/footer-bar-cell--directive.html',
                controllerAs: 'footerBarCellCtrl',
                controller: 'footerBarCellController'
            };
        }
    ])

    /**
     * @ngdoc controller
     * @name client.frame.globalNavFooter.controller:footerBarCellController
     * @requires pageProperties
     *
     * @description
     * Controller for footer Bar template.
     * @link client.frame.globalNavFooter.controller:footerBarCell
     */

    .controller('footerBarCellController', [
        'pageProperties',
        function (
            pageProperties
        ) {
            var self = this;
            self.footerLinks = pageProperties.$current.footer_link_data;
        }
    ]);
};

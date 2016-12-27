'use strict';


module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name huiSearch.directive:greySeparatorBar
     *
     * @restrict E
     *
     * @description
     * Grey Separaator Bar for internal pages
     */
    ngModule
        .directive('greySeparatorBar', function () {
            return {
                restrict: 'E',
                replace: true,
                bindToController: true,
                scope: {},
                templateUrl: '/templates/frame/grey-separator-bar--directive.html',
                controllerAs: 'greySeparatorBarCtrl',
                controller: 'greySeparatorBarController'
            };
        })

        /**
         * @ngdoc directive
         * @name huiSearch.directive:onFocus
         *
         * @restrict A
         *
         * @requires angular.service:$timeout
         *
         * @description
         * toggle the display of elements other than search box
         */
        .directive('onFocus', [
            '$timeout',
            function ($timeout) {
                return {
                    restrict: 'A',
                    bindToController: true,
                    controllerAs: 'greySeparatorBarCtrl',
                    controller: 'greySeparatorBarController',
                    link: function (scope, el, attr, ctrl) {
                        angular.element(document).on('focus', '.frame-content-column .search-form--wrapper input:text', function (e) {
                            angular.element(e.currentTarget).attr('placeholder', 'City,St or Zip or Address');
                            angular.element(el).children('button').hide();
                        });

                        angular.element(document).on('focusout', '.frame-content-column .search-form--wrapper input:text', function (e) {
                            angular.element(e.currentTarget).attr('placeholder', 'Search');
                            $timeout(function () {
                                angular.element(el).children('button').show();
                            }, 500);
                        });
                    }
                };
            }
        ])

        /**
        * @ngdoc directive
        * @name huiFrame.frame.directive:toggleView
        *
        * @restrict A
        *
        * @description
        * view search result toggle button. view map or view list
        *
        */
        .directive('toggleView', function () {
            return {
                restrict: 'A',
                replace: true,
                transclude: true,
                bindToController: true,
                controllerAs: 'greySeparatorBarCtrl',
                controller: 'greySeparatorBarController',
                link: function (scope, el, attr, ctrl) {
                    el.text('View on Map');
                    el.addClass('grey-separator-bar--viewmap');

                    el.on('click', function () {
                        if (el.hasClass('grey-separator-bar--viewmap')) {
                            el.text('View List');
                        } else {
                            el.text('View on Map');
                        }
                        el.toggleClass('grey-separator-bar--viewmap grey-separator-bar--viewlist');
                    });
                }
            };
        })

        /**
         * @ngdoc controller
         * @name huiSearch.directive:greySeparatorBarController
         *
         * @restrict E
         *
         * @requires huiRouter.service:pageProperties
         * @requires lodash:lodash
         * @requires angular.filter:currencyFilter
         *
         * @description
         * display the header text by fetching the data from rootscope
         */
        .controller('greySeparatorBarController', [
            'pageProperties',
            '_',
            'currencyFilter',
            function (
                pageProperties,
                _,
                currencyFilter
            ) {
                var self = this,
                    price = _.get(pageProperties, '$current.property_detail.price.value'),
                    currency = (_.get(pageProperties, '$current.property_detail.price.currency') === 'USD') ? '$' : _.get(pageProperties, '$current.property_detail.price.currency');
                self.headerText = _.get(pageProperties, '$current.meta.result.h1', '');
                self.propertyCost = currencyFilter(price, currency, 0);
                self.pageType  = _.get(pageProperties, '$current.meta.result.page_type', '');
                self.propertyDetails = _.get(pageProperties, '$current.property_detail', '');
                if (_.get(pageProperties, '$current.property_detail.provider.name', null)) {
                    self.forSaleAgentUrl = 'http://www.homes.com/real-estate-agents/' + _.kebabCase(_.get(pageProperties, '$current.property_detail.provider.name', '')) + '/id-' + _.get(pageProperties, '$current.property_detail.provider.id', '');
                }
                self.searchResultCount  = _.get(pageProperties, '$current.property_results.result.pagination.total_found');
            }
        ]);
};

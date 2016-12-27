'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc controller
     * @name layout.property.controller:pagePropertyUdpCtrl
     *
     * @requires $element
     * @requires _
     * @requires adobeAnalytics
     * @requires pageProperties
     * @requires huiTalkNow.factory:talkNowFactory
     *
     * @description
     * sets up the property details page
     */
    ngModule.controller('pagePropertyUdpCtrl', [
        '$element',
        '_',
        'adobeAnalytics',
        'pageProperties',
        'talkNowFactory',
        function (
            $element,
            _,
            adobeAnalytics,
            pageProperties,
            talkNowFactory
        ) {
            var self = this,
                stickyHeader = false,
                $stickyHeader = $element.find('.sticky-header');

            self.isProduction = talkNowFactory.isProduction();
            self.oas = _.get(pageProperties, '$current.oas', '');
            self.property = _.get(pageProperties, '$current.property_detail', '');
            self.curbcall = _.get(pageProperties, '$current.curbcall', '');

            self.dfpListingStatus = _.camelCase(pageProperties.$current.property_detail.listing_status);
            self.dfpListingType = _.includes(pageProperties.$current.property_detail.listing_type, 'FORECLOSURE');

            /**
             * @ngdoc method
             * @name toggleHeader
             * @methodOf layout.property.controller:pagePropertyUdpCtrl
             *
             * @description
             * on scrolling element touch on offset to enable stick-header-info block
             */
            self.toggleHeader = function (direction) {
                if (direction === 'down' && !stickyHeader) {
                    $stickyHeader.addClass('active');
                } else {
                    $stickyHeader.removeClass('active');
                }
            };

            talkNowFactory.checkAgentAvailability(self.curbcall)
                .then(function (response) {
                    self.hasTalkNow = response;
                });

            /**
             * @ngdoc method
             * @name closeStickyHeader
             * @methodOf layout.property.controller:pagePropertyUdpCtrl
             *
             * @description
             * on close link to  hide sticky-header
             */
            self.closeStickyHeader = function () {
                if (self.hasTalkNow) {
                    self.hasTalkNow = false;
                    return;
                }

                stickyHeader = true;
                $stickyHeader.removeClass('active');
            };

            adobeAnalytics.directCall('directCall');

            if (self.property.offered_by === 'frc' || self.property.offered_by === 'a55' || (self.property.property_type && self.property.property_type.value === 'APARTMENT' && self.property.listing_status === 'for_rent')) {
                self.hidePropertyRecords = true;
            }
        }
    ]);

    /**
    * @ngdoc directive
    * @name layout.property.directive:pagePropertyUdp
    * @restrict E
    *
    * @description
    * Directive for the property details page
    */
    ngModule.directive('pagePropertyUdp', [
        function () {
            return {
                restrict: 'E',
                controller: 'pagePropertyUdpCtrl',
                controllerAs: 'detailsCtrl',
                replace: true,
                templateUrl: '/templates/layout/udp.html'
            };
        }
    ]);
};

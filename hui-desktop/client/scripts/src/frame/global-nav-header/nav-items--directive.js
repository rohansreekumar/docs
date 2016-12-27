'use strict';

module.exports = function (ngModule) {
    /**
     * @ngdoc directive
     * @name navItems
     * @restrict E
     *
     * @description
     * A directive to display nav items
     */
    ngModule.directive('navItems',
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: true,
                templateUrl: 'templates/frame/global-nav--header/nav-items.html',
                controller: 'navItemsController',
                controllerAs: 'navItemsCtrl'
            };
        }
    );

    /**
     * @ngdoc controller
     * @name navItemsController
     * @module app.frame.globalNav
     *
     * @description
     * set up nav items
     */
    ngModule.controller('navItemsController', [
        '$scope',
        function ($scope) {
            var self = this;

            $scope.responseMenu = [
                {
                    id: '923jdii9f02',
                    label: 'For Sale',
                    uri: '/for-sale/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Homes for Sale',
                            uri: '/for-sale/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Foreclosed Homes',
                            uri: '/for-sale/foreclosures/',
                            obfuscated: true
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Buying a Home Q&A',
                            uri: '/answers/Buying-a-Home/',
                            obfuscated: true
                        }
                    ]
                },
                {
                    id: '923jdii9f02',
                    label: 'For Rent',
                    uri: '/rentals/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Homes for Rent',
                            uri: '/rentals/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Apartments for Rent',
                            uri: '/rentals/apartments/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Retirement Communities',
                            uri: '/rentals/retirement-communities/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Off Campus Housing',
                            uri: '/off-campus-housing/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Renting Q&A',
                            uri: '/answers/Renting/',
                            obfuscated: true
                        }
                    ]
                },
                {
                    id: '923jdii9f02',
                    label: 'Foreclosure',
                    uri: '/for-sale/foreclosures/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Foreclosed Homes',
                            uri: '/for-sale/foreclosures/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Foreclosure Q&A',
                            uri: '/answers/Foreclosures/',
                            obfuscated: true
                        }
                    ]
                },
                {
                    id: '923jdii9f02',
                    label: 'Home Values',
                    uri: '/Home-Prices/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Home Values',
                            uri: '/Home-Prices/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Home Values Q&A',
                            uri: '/answers/Home-Values/',
                            obfuscated: true
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Request Home Estimate',
                            uri: '/Content/SoldHomesRequest.cfm',
                            obfuscated: true
                        }
                    ]
                },
                {
                    id: '923jdii9f02',
                    label: 'Mortgages',
                    uri: '/Mortgages/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Mortgage Rates',
                            uri: '/Mortgages/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Mortgage Calculator',
                            uri: '/Mortgages/Mortgage-Calculator/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Repair Your Credit Today',
                            uri: '/credit-repair/',
                            obfuscated: true
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Get Prequalified',
                            uri: '/Content/MortgageRequestConnect.cfm',
                            obfuscated: true
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Financing Q&A',
                            uri: '/answers/Home-Values/',
                            obfuscated: true
                        }
                    ]
                },
                {
                    id: '923jdii9f02',
                    label: 'Local Pros',
                    uri: '/directory/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Real Estate Agents',
                            uri: '/real-estate-agents/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Local Professionals',
                            uri: '/directory/'
                        }
                    ]
                },
                {
                    id: '923jdii9f02',
                    label: 'QA',
                    uri: '/answers/',
                    obfuscated: true,
                    children: [
                        {
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Questions & Answers',
                            uri: '/answers/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Ask a Question',
                            uri: '/answers/ask-questions/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Property Inquiries Q&A',
                            uri: '/answers/Property-Inquiries/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Buying a Home Q&A',
                            uri: '/answers/Buying-a-Home/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Renting Q&A',
                            uri: '/answers/Renting/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Foreclosures Q&A',
                            uri: '/answers/Foreclosures/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Selling a Home Q&A',
                            uri: '/answers/Selling-a-Home/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Rent vs Buy Q&A',
                            uri: '/answers/Rent-vs-Buy/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Financing Q&A',
                            uri: '/answers/Financing/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Home Values Q&A',
                            uri: '/answers/Home-Values/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Homes.com Help',
                            uri: '/answers/Homes.com-Help/'
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Contact Homes.com',
                            uri: '/Content/Feedback.cfm',
                            obfuscated: true
                        },{
                            id: '1234',
                            parent: '923jdii9f02',
                            label: 'Homes.com Corporate Site',
                            uri: 'http://connect.homes.com/',
                            obfuscated: true
                        }
                    ]
                }
            ];
        }
    ]);
};

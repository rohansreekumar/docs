'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');


require('./../index');

describe('Property Search Results', function () {

    //include module holding component to be tested
    beforeEach(angular.mock.module('layout.srp'));


    describe('Layout Directive', function () {

        // helpers for spies, httpBackend and directive
        util.helpers.sinon(chai);
        util.helpers.httpBackend(angular);
        util.helpers.directive(angular);

        beforeEach(angular.mock.inject([
            '$rootScope',
            '$q',
            'Seo',
            'inactiveListing',
            'localListings',
            'localAdService',
            'propertyLayoutPropertyData',
            function ($rootScope,
                      $q,
                      Seo,
                      inactiveListing,
                      localListings,
                      localAdService,
                      propertyLayoutPropertyData) {
                var self = this,
                    scope = $rootScope.$new();


                $rootScope.pageMeta = {};
                $rootScope.pageMeta.h1 = 'Find Your <br/>Home';


                self.sinon.stub(Seo, 'page', function () {
                    return {
                        $promise: $q(function (resolve) {
                            resolve({
                                h1: 'Find Your <br/>Home',
                                description: '',
                                title: 'Homes.com - Homes for Sale and Real Estate'
                            });
                        })
                    };
                });

                self.sinon.stub(propertyLayoutPropertyData, 'get', function () {
                    return {
                        then: function () {
                            return [];
                        }
                    };
                });

                self.sinon.stub(inactiveListing, 'showInactive');

                scope.viewCtrl = {
                    pageProps: util.mock.pageProps('/what-is-a-location-really/for-sale')
                };

                self.scope = scope;
            }
        ]));
        // ToDo: SRP Controller functionality should be tested directly


    });

});

'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    parsing = require('./../parsing'),
    useCase = describe;

describe('Fake URL Parsing Response Constructors', function () {

    before(function () {
        var self = this;

        // validators

    });
    beforeEach(function () {
        var self = this;

        self.query = {
            property: {
                national: {
                    forSale: '//heliosapi-local.homes.com/v1/atlas/experience?uri=/for-sale',
                    forRent: '//heliosapi-local.homes.com/v1/atlas/experience?uri=/for-rent',
                    homeValue: '//heliosapi-local.homes.com/v1/atlas/experience?uri=/home-prices'
                },
                srp: {
                    forSale: '//heliosapi-local.homes.com/v1/atlas/experience?uri=/for-sale/your-hometown-fl',
                    forRent: '//heliosapi-local.homes.com/v1/atlas/experience?uri=/for-rent/your-hometown-fl',
                    homeValue: '//heliosapi-local.homes.com/v1/atlas/experience?uri=/home-prices/your-hometown-fl'
                }
            }
        };

    });

    describe('parseUrl', function () {

        useCase('when property search results page', function () {
            it('should return property search results', function () {
                var self = this, out;

                out = parsing(self.query.property.srp.forSale);

                expect(out[1].property_results).to.not.be.undefined;


            });
            it('should return property search results that are home values', function () {
                var self = this, out;

                out = parsing(self.query.property.srp.homeValue);

                expect(out[1].property_results).to.not.be.undefined;
                expect(out[1].search.listing_status).to.equal('off_market');
            });

        });


    });

});

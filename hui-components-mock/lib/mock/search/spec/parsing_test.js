'use strict';

var chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash'),
    parsing = require('./../parsing'),
    useCase = describe;

describe('Fake Search Response Constructors', function () {

    before(function () {
        var self = this;

        self.testSearch = function (obj, addlProps) {
            var resultObj = obj[1].result.property_results,
                requiredPresent;

            if (resultObj === undefined) {
                return false;
            }

            if (obj[0] === 200) {

                requiredPresent = ['context', 'count'];


                if (_.isArray(addlProps)) {
                    requiredPresent = requiredPresent.concat(addlProps);
                } else if (!_.isUndefined(addlProps)) {
                    requiredPresent.push(addlProps);
                }

                return !_.some(requiredPresent, function (property) {
                    return _.isUndefined(resultObj[property]);
                });
            } else {
                return false;
            }

        };

        self.testError = function (obj) {
            var requiredProps = [
                'context',
                'input',
                'message',
                'code'
            ];

            return !_.some(requiredProps, function (property) {
                return _.isUndefined(obj[property]);
            });
        };

    });
    beforeEach(function () {
        var self = this;

        self.query = {
            good: {
                results: '//heliosapi-dev.homes.com/v2/searcher?' +
                'results=true' +
                '&listing_status=for_sale&search_query%5Blabel%5D=Your%20Hometown%2C%20FL&search_query%5Bvalue%5D=Your%20Hometown%2C%20FL' +
                '&context=property' +
                '&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764',
                resultsHv: '//heliosapi-dev.homes.com/v2/searcher?' +
                'results=true' +
                '&listing_status=off_market' +
                '&search_query%5Blabel%5D=Your%20Hometown%2C%20FL&search_query%5Bvalue%5D=Your%20Hometown%2C%20FL' +
                '&context=property' +
                '&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764',
                noResults: '//heliosapi-dev.homes.com/v2/searcher?listing_status=for_sale&search_query%5Blabel%5D=Your%20Hometown%2C%20FL&search_query%5Bvalue%5D=Your%20Hometown%2C%20FL&context=property&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764',
                resultsFilters: '//heliosapi-dev.homes.com/v2/searcher?' +
                'results=true' +
                '&listing_status=for_sale&property_type=CONDOMINIUM&property_type=MULTI_FAMILY&property_type=RESIDENTIAL&property_type=TOWNHOUSE&year_built%5Bmin%5D=1960&price%5Bmax%5D=10000000&listing_type=NEW%20HOME&listing_type=RESALE&square_footage%5Bmin%5D=2000&beds%5Bmin%5D=3&baths%5Bmin%5D=2&context=property&search_query%5Bvalue%5D=NOBLE%20COUNTY%2C%20IN&search_query%5Blabel%5D=NOBLE%20COUNTY%2C%20IN&app=hdc_portal&app_platform=mobileweb&api_key=799343c4-73b5-4e46-94a7-c489faf622b5',
                noResultsFilters: '//heliosapi-dev.homes.com/v2/searcher?listing_status=for_sale&property_type=CONDOMINIUM&property_type=MULTI_FAMILY&property_type=RESIDENTIAL&property_type=TOWNHOUSE&year_built%5Bmin%5D=1960&price%5Bmax%5D=10000000&listing_type=NEW%20HOME&listing_type=RESALE&square_footage%5Bmin%5D=2000&beds%5Bmin%5D=3&baths%5Bmin%5D=2&context=property&search_query%5Bvalue%5D=NOBLE%20COUNTY%2C%20IN&search_query%5Blabel%5D=NOBLE%20COUNTY%2C%20IN&app=hdc_portal&app_platform=mobileweb&api_key=799343c4-73b5-4e46-94a7-c489faf622b5',
                noResultsFacets: '//heliosapi-dev.homes.com/v2/searcher?listing_status=for_sale&search_query%5Blabel%5D=Your%20Hometown%2C%20FL&search_query%5Bvalue%5D=Your%20Hometown%2C%20FL&context=property' +
                '&facets=listing_type' +
                '&facets=property_type' +
                '&facets=baths' +
                '&facets=beds' +
                '&facets=lot_size' +
                '&facets=square_footage' +
                '&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764',
                recommendedLimit: '//heliosapi-dev.homes.com/v2/searcher?' +
                'results=true' +
                '&listing_status=for_sale&search_query%5Blabel%5D=Your%20Hometown%2C%20FL&search_query%5Bvalue%5D=Your%20Hometown%2C%20FL&context=property' +
                '&limit=4' +
                '&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764'

            },
            bad: {
                noContext: '//heliosapi-dev.homes.com/v2/searcher?results=true&listing_status=for_sale&search_query%5Blabel%5D=Your%20Hometown%2C%20FL&search_query%5Bvalue%5D=Your%20Hometown%2C%20FL&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764',
                noQuery: '//heliosapi-dev.homes.com/v2/searcher?results=true&listing_status=for_sale&context=property&app=hdc_portal&app_platform=mobileweb&api_key=b530707d-1491-4106-b6d1-eaeb722d0764',
                invalid: '//heliosapi-dev.homes.com/v2/searcher?results=true&listing_status=for_sale&search_query%5Blabel%5D=Invalid%20Search&search_query%5Bvalue%5D=Invalid%20Search&context=property&app=hdc_portal&app_platform=mobileweb&api_key=b57abad2-2438-45b9-a1d1-4bc105040ce2',
                nA: '//heliosapi-dev.homes.com/v2/searcher?results=true&listing_status=off_market&search_query%5Blabel%5D=Not%20Applicable&search_query%5Bvalue%5D=Not%20Applicable&context=property&app=hdc_portal&app_platform=mobileweb&api_key=3c92902a-e492-4512-8419-09f9289ecd59'
            }
        };

    });

    describe('parseSearch', function () {

        it('should create a HUI Search.', function () {

            var self = this, out;

            out = parsing(self.query.good.results);

            expect(out).to.satisfy(self.testSearch);
            expect(out[1].result).to.have.property('property_results').to.contain.keys(
                'results',
                'count',
                'pagination'
            );

        });

        useCase('when preview (no Results)', function () {
            it('should not return results', function () {
                var self = this, out;

                out = parsing(self.query.good.noResults);

                expect(out).to.satisfy(self.testSearch);

                expect(out[1].result).to.have.property('property_results').to.not.contain.keys(
                    'results'
                );
            });
            it('should not return results with filters applied', function () {
                var self = this, out;

                out = parsing(self.query.good.noResultsFilters);

                expect(out).to.satisfy(self.testSearch);

                expect(out[1].result).to.have.property('property_results').to.not.contain.keys(
                    'results'
                );
            });
        });

        useCase('when results are requested', function () {
            it('should have results with the correct listing_status', function () {
                var self = this, out;

                out = parsing(self.query.good.results);

                expect(out).to.satisfy(self.testSearch);

                expect(out[1].result).to.have.property('property_results').to.contain.keys(
                    'results',
                    'count',
                    'pagination'
                );

                if (out[1].result.property_results.count > out[1].result.property_results.results.length) {
                    // total_count = count
                    expect(out[1].result.property_results.results.length).to.equal(15); // standard page size
                    expect(out[1].result.property_results.pagination.total_count).to.equal(out[1].result.count);
                }

                _.forEach(out[1].result.property_results.results, function (result) {
                    expect(result.listing_status).to.equal('for_sale');
                });
            });

            it('should have results with home value listing status', function () {
                var self = this, out;

                out = parsing(self.query.good.resultsHv);

                expect(out).to.satisfy(self.testSearch);

                expect(out[1].result).to.have.property('property_results').to.contain.keys(
                    'results',
                    'count',
                    'pagination'
                );

                if (out[1].result.property_results.count > out[1].result.property_results.results.length) {
                    // total_count = count
                    expect(out[1].result.property_results.results.length).to.equal(5); // standard page size
                    expect(out[1].result.property_results.pagination.total_count).to.equal(out[1].result.count);
                }

                _.forEach(out[1].result.property_results.results, function (result) {
                    expect(result.listing_status).to.equal('off_market');
                });
            });

            it('should have results with certain filters applied', function () {
                var self = this, out;

                out = parsing(self.query.good.resultsFilters);

                expect(out).to.satisfy(self.testSearch);

                expect(out[1].result).to.have.property('property_results').to.contain.keys(
                    'results',
                    'count',
                    'pagination'
                );

                _.forEach(out[1].results, function (result) {
                    expect(result.listing_status).to.equal('for_sale');
                });
            });
        });

        describe('facets', function () {
            it('should return the requested facets', function () {
                var self = this, out;

                out = parsing(self.query.good.noResultsFacets);

                expect(out).to.satisfy(self.testSearch);

                expect(out[1].result).to.have.property('property_results').to.not.contain.keys(
                    'results'
                );

                expect(out[1].result).to.have.property('property_results')
                    .to.have.property('facets')
                    .to.contain.keys(
                    'listing_type',
                    'property_type',
                    'baths',
                    'beds',
                    'lot_size',
                    'square_footage'
                );

            });
        });

        describe('recommended', function () {
            it('should return <limit> results', function () {
                var self = this, out;

                out = parsing(self.query.good.recommendedLimit);

                expect(out).to.satisfy(self.testSearch);
                expect(out[1].result).to.have.property('property_results').to.contain.keys(
                    'results',
                    'count'
                );

                expect(out[1].result.property_results.results.length).to.equal(4);
            });
        });

        describe('bad searches', function () {
            useCase('no context', function () {
                it('should error', function () {
                    var self = this, out;

                    out = parsing(self.query.bad.noContext);
                    expect(out[0]).to.equal(400);

                    expect(out[1]).to.have.property('code', 'no_context');
                });
            });
            useCase('no query', function () {
                it('should error', function () {
                    var self = this, out;


                    out = parsing(self.query.bad.noQuery);
                    expect(out[0]).to.equal(400);

                    expect(out[1]).to.have.property('code', 'invalid_search');
                });
            });

            useCase('invalid query', function () {
                it('should error', function () {
                    var self = this, out;

                    out = parsing(self.query.bad.invalid);
                    expect(out[0]).to.equal(400);
                    expect(out[1]).to.satisfy(self.testError);

                    expect(out[1]).to.have.property('code', 'invalid_search');
                });
            });


            useCase('not applicable query', function () {
                // not appliable query is a valid city state in a home values search
                it('should error', function () {
                    var self = this, out;

                    out = parsing(self.query.bad.nA);
                    expect(out[0]).to.equal(400);
                    expect(out[1]).to.satisfy(self.testError);

                    expect(out[1]).to.have.property('code', 'not_applicable');
                });
            });
        });


    });

});

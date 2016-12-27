'use strict';

/**
 * @ngdoc module
 * @name huiMockRoutesMortgageRates
 * @module huiMockRoutesMortgageRates
 *
 * @description
 * The `huiMockRoutesMortgageRates` module
 *
 * <div doc-module-components="huiMockRoutesMortgageRates"></div>
 *
 */

// Module dependencies

// Create Module
var ngModule = angular.module('huiMockRoutesMortgageRates', ['ngMockE2E']),
    mockHelpers = require('./../../test/helpers/mock'),
    readGet = mockHelpers.readGet;

// Module components
ngModule
    .run([
        '$httpBackend',
        '_',
        function ($httpBackend,
                  _) {

            // Mock API
            // Mortgage Rates
            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v2\/mortgage\/rates.*/)
                .respond(function (method,
                                   url) {

                    var getParams = readGet(url),
                        bankrateResults = require('./bankrate_paid.json'),
                        informaResponse = require('./mortgage_rates_informa.json'),
                        mortgageRatesRandomCount = Math.floor(Math.random() * bankrateResults.length),
                        responseStatus,
                        responseData,
                        informaLoanType,
                        informaRatesRandomCount = getParams.rows;

                    responseStatus = 200;

                    if (mortgageRatesRandomCount === 0 || getParams.zip_code === '33333') {
                        // no paid results
                        responseData = informaResponse;
                        responseData.context = getParams.context;

                        // Set loan_type value to be refinance or purchase depending on request paramater
                        if (getParams.loan_type == 'refinance') {
                            informaLoanType = 'REFI';
                        } else {
                            informaLoanType = 'PURCH';
                        }

                        // set result_count to random if not set by getParams.rows above
                        if (informaRatesRandomCount === '-1' || informaRatesRandomCount === undefined && getParams.context == 'results') {
                            informaRatesRandomCount = Math.floor(Math.random() * 16) + 1;
                        }
                        if (getParams.home_price == '0' || getParams.home_price === undefined) {
                            // home_price is 0 or undefined so set and append default loan_amount to informa iFrame url
                            responseData.informa_url = responseData.informa_url + '?hideheader=1&loan_type=' + informaLoanType + '&result_count=' + informaRatesRandomCount + '&headerbgcolor=0054A0&headertextcolor=FFFFFF&searchoptionsbgcolor=E9EAEE&searchoptionstextcolor=484848&searchbtntextcolor=FFFFFF&searchbtnbordercolor=F7841B&searchbtnbgcolor=F7841B&sortoptionsbgcolor=ffffff&sortoptionstextcolor=484848&listingsponsoredadvertiserbgcolor=ffffff&listingsponsoredadvertisertextcolor=484848&listingadvertiserbgcolor=ffffff&listingadvertisertextcolor=484848&listingbtnbgcolor=F7841B&listingbtntextcolor=ffffff&listingbtnbordercolor=F7841B&disabledataleads=1&zip=23320&siteid=39b58f6b19d486a7&property_value=250000&loan_amount=200000';
                        } else {
                            responseData.informa_url = responseData.informa_url + '?hideheader=1&loan_type=' + informaLoanType + '&result_count=' + informaRatesRandomCount + '&headerbgcolor=0054A0&headertextcolor=FFFFFF&searchoptionsbgcolor=E9EAEE&searchoptionstextcolor=484848&searchbtntextcolor=FFFFFF&searchbtnbordercolor=F7841B&searchbtnbgcolor=F7841B&sortoptionsbgcolor=ffffff&sortoptionstextcolor=484848&listingsponsoredadvertiserbgcolor=ffffff&listingsponsoredadvertisertextcolor=484848&listingadvertiserbgcolor=ffffff&listingadvertisertextcolor=484848&listingbtnbgcolor=F7841B&listingbtntextcolor=ffffff&listingbtnbordercolor=F7841B&disabledataleads=1&zip=23320&siteid=39b58f6b19d486a7&property_value=' + getParams.home_price;
                        }
                    } else {
                        responseData = {
                            context: getParams.context,
                            type: 'bankrate',
                            results: []
                        };

                        if (getParams.rows === '-1' || getParams.rows === undefined && getParams.context == 'results') {
                            //https://lodash.com/docs#sample
                            responseData.results = _.sample(bankrateResults, mortgageRatesRandomCount);
                        } else if (getParams.rows === undefined && getParams.context == 'details') {
                            responseData.results = _.sample(bankrateResults, 4); // default value for details from spec
                        } else if (getParams.rows) {
                            responseData.results = _.sample(bankrateResults, getParams.rows);
                        }
                    }

                    return [
                        responseStatus,
                        responseData
                    ];
                });
        }
    ]);

module.exports = ngModule;

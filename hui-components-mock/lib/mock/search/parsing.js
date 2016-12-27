'use strict';
var _ = require('lodash'),
    util = require('./../../test/tool'),
    mockValues = require('./../../test/mock/fakeValues'),
    propertyResults = require('./../udp-url-parsing/property-results');

/**
 * creates search responses from url
 * @param url path to check
 * @returns {*} page properties object
 */
module.exports = function parseSearch(search) {
    var response = {},
        searchQuery,
        searchResponse = {},
        tmp;

    if (typeof search === 'string') {
        searchQuery = util.readGet(search);

    } else {
        searchQuery = search;
    }

    /**
     * Bad searchQuery
     * @returns {*[]}
     */
    function bad(error) {
        if (error) {
            return [400, error];
        }
        return [
            400,
            {
                code: 'invalid_search',
                input: searchQuery
            }
        ];
    }

    // if there is no context given, then this searchQuery is bad
    if (!searchQuery.context) {

        return bad({
            code: 'no_context',
            input: searchQuery
        });
    } else {
        searchResponse = response[searchQuery.context + '_results'] = {};
        searchResponse.context = searchQuery.context;
    }

    // match errors
    if ((searchQuery.search_query === undefined || searchQuery.search_query.value === undefined) && !(searchQuery.location && searchQuery.location[0])) {
        // No search Query

        return bad();
    } else if (searchQuery.search_query) {
        if (searchQuery.search_query.value === 'Not Applicable' && searchQuery.listing_status === 'off_market') {
            // A search query that would be valid under different conditions

            tmp = require('./searcher-errors/home-values-not-applicable');
            tmp.input = searchQuery;
            return bad(tmp);
        } else if (searchQuery.search_query.value === 'Invalid Search') {
            // A bad search query

            switch (searchQuery.listing_status) {
            case 'for_sale':
                tmp = require('./searcher-errors/for-sale-invalid-messaging');
                break;
            case 'for_rent':
                tmp = require('./searcher-errors/for-rent-invalid-messaging');
                break;
            case 'off_market':
                tmp = require('./searcher-errors/home-values-invalid-messaging');
                break;
            default:
                tmp = {
                    context: '',
                    input: '',
                    message: 'An unexpected error has occurred.',
                    code: 'invalid_search'
                };
                break;
            }

            tmp.input = searchQuery;

            return bad(tmp);
        }

    }


    // results requested, add pagination and results

    if (searchQuery.results) {
        tmp = propertyResults(searchQuery, searchQuery.limit || 15);
        _.extend(searchResponse, tmp);
    } else {
        // Searcher.preview
        if (searchQuery.search_query) {
            if (searchQuery.search_query.value.replace(',', '').toLowerCase() === 'no hometown fl') {

                tmp = require('./searcher-none.json');

            } else if (searchQuery.search_query.value.toLowerCase() === 'norfolk') {

                tmp = require('./searcher-ambiguous.json');
            } else if (searchQuery.search_query.value.toLowerCase() === 'virginia') {
                tmp = require('./searcher-state.json');
            } else {
                tmp = require('./searcher.json');
            }

            _.extend(searchResponse, tmp);
        }

        searchResponse.count = mockValues.fakeValue(9999, 1);
    }

    // facets
    if (searchQuery.facets) {
        tmp = mockValues.fakeFacets('property', searchQuery.facets, null, searchResponse.count);
        searchResponse.facets = tmp[1];
    }

    response.search = searchResponse.search = _.omit(searchQuery, [
        'api_key',
        'app_platform',
        'app',
        'results'
    ]);

    return [
        200,
        {
            success: true,
            result: response
        }
    ];
};

'use strict';

/**
 * Created by ashleahhill on 9/3/15.
 */

var _ = require('lodash');

function propertyResult(params, limit) {
    var results,
        pagination = {},
        listings = require('./listings/results-listings.json');


    results = _.where(listings.listing_results, {
        listing_status: params.listing_status
    });


    results = results.slice(0, limit);

    results = _.map(results, function (result) {
        result.uri = result.main_uri;
        return result;
    });

    listings.results = results;
    listings.count = listings.pagination.total_found;

    return listings;
}

module.exports = propertyResult;

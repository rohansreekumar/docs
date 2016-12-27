'use strict';

var _ = require('lodash'),
    searchResults = require('./../search/parsing'),
    qs = require('qs'),
    parseLocation;

/**
 * Deterimines if a string is a city, state, or zip
 * @param locationString
 * @returns {{}}
 */
parseLocation = function (locationString) {
    var locations = [],
        usPostalCodePattern = /^\d{5}(\-?\d{4})?$/,
        canadaPostalCodePattern = /([ABCEGHJ-NPRSTVXY]\d[A-Z])[\s\-]?(\d[A-Z]\d)/;

    locationString = locationString.trim();
    if (usPostalCodePattern.test(locationString) || canadaPostalCodePattern.test(locationString)) {
        locations.push({
            zip: locationString
        });
    } else {
        // take the last bit and assume its the region
        locations.push({
            region: locationString.substr(locationString.lastIndexOf(' ') + 1).toUpperCase(),
            locality: locationString.substr(0, locationString.lastIndexOf(' ')).toUpperCase()
        });
    }

    return locations;
};

/**
 * returns property_directory information for page properties object
 * @param type {string=} what type of page
 * @param routeParams {object} search params
 * @returns {*[]}
 */
exports.propertyDirectory = function (
    type,
    routeParams
) {

    var pageProps = {},
        tmp;

    pageProps.property_type = (routeParams.property_type && !_.isArray(routeParams.property_type)) ? [routeParams.property_type.replace(/-/g, '_').toLowerCase()] : undefined;
    pageProps.listing_status = (routeParams.listing_status) ? routeParams.listing_status.replace(/-/g, '_').toLowerCase() : undefined;

    if (routeParams.search_query && routeParams.search_query.value) {

        pageProps.search_query = routeParams.search_query;
        pageProps.search_query.value = pageProps.search_query.value.replace(/-/g, ' ');
        pageProps.search_query.label = _.startCase(pageProps.search_query.value);
    }

    if (type === 'propertyState') {
        // add popular cities to state
        pageProps.popular_cities = require('./popular-cities.json');
    } else if (type === 'propertySrp') {
        // add property search results
        //
        tmp = _.extend({
            context: 'property',
            results: true,
            limit: 30
        }, pageProps);

        tmp = searchResults(tmp);

        if (pageProps.listing_status === 'off_market') {

            pageProps = {
                success: true,
                result: {
                    listing_results: tmp[1].result.property_results.results
                },
                $search: tmp[1].result.search
            };
        } else {
            pageProps = {
                success: false,
                retry: true,
                $search: tmp[1].result.search
            };

            tmp = parseLocation(routeParams.search_query.value);
            routeParams.location = tmp;
            _.defaults(routeParams, {
                search_query: {
                    value: 'your hometownfl',
                    label: 'Your Hometown, FL'
                },
                listing_status: 'FOR SALE',
                limit: 15,
                order_by: [
                    'price'
                ],
                location: [
                    {
                        locality: 'CHESAPEAKE',
                        region: 'VA'
                    }
                ],
                results: true
            });

            routeParams.listing_status = routeParams.listing_status.toUpperCase().replace(/[_\-]/,' ');
            pageProps.retry_url = 'http://' + (window.helios || 'heliosapi-dev.homes.com') + '/v1/search/listing/list?' + qs.stringify(routeParams, {
                encode: false
            });
        }

    }

    if (type === 'propertySrp') {
        return ['property_results', pageProps];
    } else {
        return ['property_directory', pageProps];
    }
};

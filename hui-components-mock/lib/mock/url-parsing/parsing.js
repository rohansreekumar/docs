'use strict';
var util = require('./../../test/tool'),
    responseConstructors = require('./response-constructors'),
    propertyDetail = require('./../udp-url-parsing/parsing'),
    _ = require('lodash'),
    seo = require('./../seo/parsing');

/**
 * creates page properties object from url/path
 * @param url path to check
 * @returns {*} page properties object
 */
module.exports = function parseUrl (url) {
    var response = {
            page: {}
        },
        theUrl,
        pageData,
        tmp;

    theUrl = util.readGet(url).uri;

    function bad () {
        return [404, {code: 'notFound', input: theUrl}];
    }

    if (theUrl.match(/property\//)) {
        response.page.type = 'propertyDetail';

        tmp = theUrl.match(/\/(?:id-(\d*))(?:.*\?status=(\w.*))?/);

        if (!tmp[1]) {
            return bad();
        }

        pageData = propertyDetail(tmp[1], tmp[2]);

        if (!pageData[1]) {
            response.page.type = 'propertySrp';
            response.page.link = 'your-hometown-fl/for-sale/?inactive=true';
            response.page.listing_status = 'for sale';
            response.page.search_query = {label: 'Your Hometown, FL', value: 'your hometown fl'};
            response.page.inactive = true;
            response.page.redirect = true;

            pageData = responseConstructors.propertyDirectory('propertySrp', {
                listing_status: response.page.listing_status,
                search_query: response.page.search_query
            });

            response.property_detail = {inactive: true};

        } else {
            response.page.canonical = pageData[1].main_link;
            response.page.link = pageData[1].main_link.replace(/.*homes\.com\//, '');
            response.page.propertyId = pageData[1].prop_id;
        }

    } else if (/(for-sale|for-rent|home-prices|rentals)\/(\w+)(\/.*)*/.test(theUrl)) {
        response.page.link = theUrl;

        // these are meant to be different patterns so that /-/for-sale doesn't get through
        tmp = theUrl.match(/(for-sale|for-rent|home-prices|rentals)\/([\-\w]+)/);

        tmp[2] = tmp[2].replace(/\W/g, ' ');
        tmp[1] = (tmp[1] == 'home-prices') ? 'off_market' : ((tmp[1] == 'rentals') ? 'for_rent' : tmp[1]);

        tmp = {
            listing_status: tmp[1],
            search_query: {value: tmp[2]}
        };

        if (tmp.search_query.value !== 'virginia cities') {
            response.page.type = 'propertySrp';

            _.extend(tmp, util.readGet(theUrl));
        } else {
            response.page.type = 'propertyState';
        }

        pageData = responseConstructors.propertyDirectory(response.page.type, tmp);

    } else if (/for-sale|for-rent|home-prices/.test(theUrl)) {

        response.page.type = 'propertyNational';
        response.page.link = theUrl;

        tmp = theUrl.match(/(for-sale|for-rent|home-prices|rentals)/);

        tmp[1] = (tmp[1] == 'home-prices') ? 'off_market' : ((tmp[1] == 'rentals') ? 'for_rent' : tmp[1]);

        pageData = responseConstructors.propertyDirectory(response.page.type, {listing_status: tmp[1]});
    } else {
        return bad();
    }

    // add in search params, hackily
    if (pageData[1].search || pageData[1].$search) {

        response.search = pageData[1].search || pageData[1].$search;
        if (response.search.search_query.value === 'thin content') {
            response.thin_content = true;
            response.page.h2 = 'Homes ' + _.startCase(response.search.listing_status) + ' Nearby';
        }
    }

    // add the page
    response[pageData[0]] = pageData[1];

    response.meta = {
        success: true,
        result: seo(response)
    };
    // temporary static targeting for HDC-448

    response.targeting = {
        dfp: {
            state: ['VA'],
            zipcode: ['23453'],
            city: 'Virginia Beach',
            status: 'FOR SALE',
            propertyType: 'SINGLE FAMILY',
            price: 478930,
            listingType: 'RESALE'
        },
        om: {
            pageName: 'mobile.home',
            // s.server=""webprod15""
            channel: 'Main',
            pageType:'',
            events:'',
            evar1: 'Homes.com - Homes for Sale and Real Estate',
            siteType: 'Mobile'
        }

    };

    return [200, response];
};

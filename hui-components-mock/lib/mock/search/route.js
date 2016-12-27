'use strict';
var _ = require('lodash'),
    parseResults = require('./parsing'),
    util = require('./../../test/tool');


/**
 * Created by ashleahhill on 9/3/15.
 */


function propertyUri (search) {
    var uri;

    uri = '/' + _.kebabCase(
        (search.listing_status === 'off_market') ?
        'home prices' : (
            (search.listing_status === 'for_rent') ?
            'rentals' : search.listing_status)) + '/';
    if (search.search_query && search.search_query.value) {
        uri = uri + _.kebabCase(search.search_query.value);
    } else {
        if (search.location[0].locality) {
            uri = uri + _.kebabCase(search.location[0].locality + '-' + search.location[0].region);
        } else {
            uri = uri + _.kebabCase(search.location[0].lat + '-' + search.location[0].lng);
        }
    }

    return uri;
}
module.exports = function (mockModule) {

    mockModule.run([
        '$httpBackend',
        function ($httpBackend) {

            $httpBackend.whenGET(/\/\/heliosapi-local\.homes\.com\/v2\/(prototype\/)?consolidated-search.*/)
                .respond(function (method, url) {
                    var getParams = util.readGet(url),
                        response,
                        search,
                        tmp;

                    console.log(url); //jshint ignore:line

                    response = parseResults(url);

                    if (getParams.results && response[0] === 200) {
                        search = response[1].result.search;
                        switch (search.context) {
                            case 'property':

                                response[1] = {
                                    goto: {
                                        uri: propertyUri(search)
                                    }
                                };
                                break;
                            default:
                                response[1].page = {};
                        }

                    }

                    return response;
                });

            $httpBackend.whenGET(/\/\/heliosapi.*\.homes\.com\/v1\/search\/listing\/preview.*/)
                .respond(function (method, url) {
                    var getParams = util.readGet(url),
                        response,
                        search,
                        tmp;

                    console.log(url); //jshint ignore:line

                    response = parseResults(url);

                    if (response[0] === 200) {
                        search = response[1].result.search;
                        switch (search.context) {
                            case 'property':

                                response[1] = {
                                    goto: {
                                        uri: propertyUri(search) + '?' + _.uniqueId('filter-mock')
                                    },
                                    total_found: Math.random() * 1000
                                };
                                break;
                            default:
                                response[1].page = {};
                        }


                    }

                    return response;
                });
        }
    ]);

};

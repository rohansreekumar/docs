'use strict';
var mockUrlParser = require('./../../mock/url-parsing/parsing'),
    urlParserResponse = require('./../../mock/url-parsing/response-constructors');

/**
 * Retrieve mock page properties for the given url
 * @param url
 * @returns {*}
 */
exports.pageProps = function (url) {
    var pageProps;

    if (url === '/') {
        pageProps = {
            page: {
                type: 'home',
                link: '/'
            }
        };

        pageProps.property_directory = urlParserResponse.propertyDirectory(pageProps.page.type, pageProps); //jshint ignore:line
    } else {
        pageProps = mockUrlParser('//heliosapi-local.homes.com/url/?uri=' + url)[1];

    }

    return pageProps;
};

exports.urlParser = mockUrlParser;
exports.urlParserResponse = urlParserResponse;

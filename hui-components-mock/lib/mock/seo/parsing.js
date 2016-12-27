'use strict';

var _ = require('lodash'),
    mockHelpers = require('./../../test/tool'),
    compileMustache = mockHelpers.compileMustache;

function parseSeo (pageProps) {

    var templates = {},
        templateContext = {},
        responseData = {};

    function startCaseTemplateContext (vals) {
        templateContext = _.clone(vals);

        _.forEach(templateContext, function (param,
                                             key,
                                             params) {

            param = (_.isString(param)) ? param.toLowerCase() : param;
            params[key] = _.startCase(param);
        });
    }

    if ('home,propertyState,propertyNational'.indexOf(pageProps.page.type) !== -1) {
        startCaseTemplateContext(pageProps.property_directory);
    }

    if (pageProps.page.type === 'home') {
        templates = require('./seo-home.json');
    } else if (pageProps.page.type === 'propertyState') {
        if (pageProps.property_directory.property_type) {
            templates = require('./seo-state-property-type.json');
        } else {
            templates = require('./seo-state.json');
        }

    } else if (pageProps.page.type === 'propertyNational') {
        templates = require('./seo-national.json');
    } else if (pageProps.page.type === 'propertyDetail') {

        templateContext = pageProps;
        responseData = templates = require('./seo-api-udp-v2.json');

    } else if (pageProps.page.type === 'propertySrp') {

        templateContext = pageProps;
        responseData = templates = require('./seo-api-srp.json');
    }


    responseData.h1 = compileMustache(templates.h1, templateContext);
    responseData.desc = compileMustache(templates.desc, templateContext);
    responseData.title = compileMustache(templates.title, templateContext);


    return responseData;
}


module.exports = parseSeo;

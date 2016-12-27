'use strict';

/**
 * Parse GET params from url
 *
 * @param url {string} URL string
 * @returns {*} the params
 */

var qs = require('qs'),
    _ = require('lodash');

module.exports.readGet = function (url) {

    var getPattern = /\?(.*)/,
        getString,
        getParams;


    getString = getPattern.exec(url);

    if (!_.isNull(getString)) {
        getParams = qs.parse(getString[1]);

    } else {
        getParams = {};
    }


    return getParams;
};

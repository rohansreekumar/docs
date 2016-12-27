'use strict';
var _ = require('lodash');

/**
 *
 * Compile a string with lodash kinda like mustache
 *
 * @param {string} template
 * @param {object} templateContext object
 * @returns {string} compiled string
 **/

// mustache like delims
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports.compileMustache = function (template, templateContext) {
    return _.template(template)(templateContext);
};

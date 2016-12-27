'use strict';

/**
 * Setup and teardown sinon sandbox
 * @type {*|exports|module.exports}
 */
exports.sinon = require('./sinon');
/**
 * Setup and teardown $httpBackend mocks
 * @param angular reference to angular
 */
exports.httpBackend = require('./httpBackend');
/**
 * Setup and teardown directive
 * @type {*|exports|module.exports}
 */
exports.directive = require('./directive');
/**
 * Setup and teardown provider
 * @type {*|exports|module.exports}
 */
exports.provider = require('./provider');

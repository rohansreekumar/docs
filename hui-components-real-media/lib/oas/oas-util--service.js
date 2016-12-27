'use strict';

/**
 * @ngdoc service
 * @name oasUtil
 * @module oas
 *
 * @description
 * Load oas library
 *
 * @requires $q
 * @requires $document
 * @requires oasUrl
 */
module.exports = function (ngModule, Library) {
    var oasLoadLibrary = new Library();

    ngModule.service('oasUtil', [
        '$q',
        '$document',
        'oasUrl',
        oasLoadLibrary
    ]);
};

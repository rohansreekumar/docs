'use strict';


/**
 * @ngdoc service
 * @name app.frame.globalNavFooter.service:googleShareUtil
 *
 * @requires $q
 * @requires $document
 * @requires googleShareUrl
 *
 * @description
 * loads script async
 */

/**
 * @ngdoc constant
 * @name googleShareUrl
 * @module huiLeadId
 *
 * @description
 * url for script src
 */

module.exports = function (ngModule, loadLibrary) {
    var googleShareLoadLibrary = new loadLibrary.Library();

    ngModule.constant('googleShareUrl', '//apis.google.com/js/platform.js');

    ngModule.service('googleShareUtil', [
        '$q',
        '$document',
        'googleShareUrl',
        googleShareLoadLibrary
    ]);
};

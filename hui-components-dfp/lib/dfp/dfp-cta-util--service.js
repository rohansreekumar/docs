'use strict';

/**
 * @ngdoc service
 * @name DfpCtaUtils
 * @module huiDfp
 *
 * @author gary justin - https://github.dominionenterprises.com/gary-justin/fr-dfp-advertisement
 *
 * @description
 * service exposes utility and helper methods for use in other components.
 */
module.exports = function (ngModule, loadLibrary) {
    var dfpLoadLibrary = new loadLibrary.Library();

    ngModule.service('dfpCtaUtils', [
        '$q',
        '$document',
        'dfpUrl',
        dfpLoadLibrary
    ]);
};

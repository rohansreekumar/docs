'use strict';

var _ = require('lodash');

/**
 * Generate a fake value between upper and lower limit
 * @param upperLimit
 * @param lowerLimit
 * @returns {*}
 */
module.exports.fakeValue = function (upperLimit, lowerLimit) {
    upperLimit = parseInt(upperLimit || 0, 10);
    lowerLimit = parseInt(lowerLimit || 0, 10);
    return Math.floor(Math.random() * upperLimit - lowerLimit) + lowerLimit;
};


/**
 * Every dontFail times, fail.
 *
 * @returns {boolean} whehter or not to fail
 **/
module.exports.fakeFailure = function () {

    return !((global.dontFail) ? --global.dontFail : global.dontFail = 4);
};


/**
 * Generate Fake Facets
 * _Note_ A lot of 0's come back and it doesn't Quite add up to max.
 *
 * @param keys
 * @param context
 * @param max {number=9000} Upper limit for results.
 * @param totalCount {number=} Set total count
 * @returns {*[]}
 */
module.exports.fakeFacets = function (context, keys, max, totalCount) {
    var falseFacets = {};

    totalCount = totalCount || _.random(0, (max || 9000), false);

    function randomShares (shares, limit) {
        var n = shares.length,
            scale = limit / n,
            pieces, cc,
            newShares = {};

        pieces = _.times(n, _.random);

        cc = _.times(n, function (index) {
            return Math.floor(pieces[index] / _.reduce(pieces, function (sum, n) {
                    return sum + n;
                }) * n * scale);
        });

        _.each(shares, function (value, i) {
            newShares[value] = cc[i];
        });

        return newShares;
    }

    switch (context) {
        case 'agents':
            falseFacets = {
                bob: 9001
            };
            break;
        default:
            falseFacets.listing_type = randomShares([
                'NEW HOME',
                'RESALE',
                'FORECLOSURE',
                'RENTALS',
                'SENIOR COMMUNITY',
                'CORPORATE HOUSING'
            ], totalCount);

            falseFacets.beds = randomShares([
                '0',
                '1',
                '2',
                '3',
                '4',
                '5'
            ], totalCount);

            falseFacets.baths = randomShares([
                '0',
                '1',
                '2',
                '3',
                '4',
                '5'
            ], totalCount);

            falseFacets.lot_size = randomShares([
                '0',
                '1',
                '2',
                '4',
                '6',
                '10'
            ], totalCount);

            falseFacets.square_footage = randomShares([
                '0',
                '500',
                '1000',
                '1500',
                '2000',
                '5000'
            ], totalCount);

            falseFacets.city = randomShares([
                'VIRGINIA BEACH',
                'CHESAPEAKE',
                'NORFOLK',
                'RICHMOND',
                'ALEXANDRIA',
                'ROANOKE',
                'FREDERICKSBURG',
                'NEWPORT NEWS',
                'HAMPTON',
                'SUFFOLK'
            ], totalCount);

            falseFacets.county = randomShares([
                'FAIRFAX',
                'VIRGINIA BEACH CITY',
                'LOUDOUN',
                'PRINCE WILLIAM',
                'CHESAPEAKE CITY',
                'NORFOLK CITY',
                'CHESTERFIELD',
                'HENRICO',
                'JAMES CITY',
                'NEWPORT NEWS CITY',
                'BEDFORD',
                'ACCOMACK',
                'SUFFOLK CITY',
                'HAMPTON CITY',
                'STAFFORD',
                'PORTSMOUTH CITY',
                'FRANKLIN',
                'FREDERICK'
            ], totalCount);


            falseFacets.property_type = randomShares([
                'APARTMENT',
                'CONDOMINIUM',
                'FORECLOSURE',
                'LOTS_LAND',
                'MOBILE_MANUFACTURED',
                'MODELS',
                'MULTI_FAMILY',
                'NEW',
                'RESIDENTIAL',
                'RESORT',
                'TOWNHOUSE',
                'WATERFRONT'
            ], totalCount);

            falseFacets.nearby = randomShares([
                'VIRGINIA BEACH',
                'CHESAPEAKE',
                'NORFOLK',
                'PORTSMOUTH',
                'WILLIAMSBURG',
                'NEWPORT NEWS',
                'HAMPTON'
            ], totalCount);

    }

    if (_.isArray(keys)) {
        falseFacets = _.pick(falseFacets, keys);
    }

    return [totalCount, falseFacets];
};

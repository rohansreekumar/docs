'use strict';

/*
 * Hui Listing Detail Mocks created with hui-components-content@0.1.0-8633dd48a6f28e9e1ad707c2d7ac131a40e5a5b1
 *

 Local Links:

 http://localhost:9020/property/a55/id-206999739
 http://localhost:9020/property/agent-for-rent/id-400028620536
 http://localhost:9020/property/agent-free/id-221150982
 http://localhost:9020/property/agent/id-600014367465
 http://localhost:9020/property/alaska-apartment/id-190682294
 http://localhost:9020/property/broker-free/id-223253532
 http://localhost:9020/property/broker/id-100008265290
 http://localhost:9020/property/builder-free-plan/id-2099204
 http://localhost:9020/property/builder-free-spec/id-2099276
 http://localhost:9020/property/builder-plan-stories/id-2149409
 http://localhost:9020/property/builder-plan/id-2225441
 http://localhost:9020/property/builder-spec/id-1937554
 http://localhost:9020/property/condo/id-234624541
 http://localhost:9020/property/dual-ownership/id-600012941943
 http://localhost:9020/property/farm/id-222630144
 http://localhost:9020/property/for-rent-apartment-norfolk-video/id-215265654
 http://localhost:9020/property/for-rent-apartment-with-floorplans/id-233611995
 http://localhost:9020/property/for-rent-apartment-with-floorplans/id-233808150
 http://localhost:9020/property/for-rent-apartment/id-500024217222
 http://localhost:9020/property/for-rent-stories/id-400034454213
 http://localhost:9020/property/for-sale-call/id-600013143537
 http://localhost:9020/property/for-sale-mobile/id-228446166
 http://localhost:9020/property/for-sale-stories/id-400028463416
 http://localhost:9020/property/for-sale-video/id-400028279930
 http://localhost:9020/property/foreclosure/id-400028655926
 http://localhost:9020/property/la-mansion/id-100006186032
 http://localhost:9020/property/local-connnect-for-sale-schools/id-100008325931
 http://localhost:9020/property/lots-land-lot-size/id-232500829
 http://localhost:9020/property/lots-land/id-158809230
 http://localhost:9020/property/multi-family/id-600036509422
 http://localhost:9020/property/off-market-claimed/id-400028801900
 http://localhost:9020/property/off-market/id-200005613919
 http://localhost:9020/property/other-apartment-canada-floorplans/id-219832252
 http://localhost:9020/property/other-apartment-canada/id-199265873
 http://localhost:9020/property/other-apartment/id-206134706
 http://localhost:9020/property/price-history-all-down/id-500022853282
 http://localhost:9020/property/price-history-all-up/id-231189064
 http://localhost:9020/property/price-history-mixed/id-223942367
 http://localhost:9020/property/primary-image-no-gallery/id-700021769121
 http://localhost:9020/property/primary-image-no-gallery/id-235643148
 http://localhost:9020/property/primary-image-no-gallery/id-235103094
 http://localhost:9020/property/primary-image-no-gallery/id-234990970
 http://localhost:9020/property/primary-image-no-gallery/id-234990963
 http://localhost:9020/property/primary-image-no-gallery/id-224887485
 http://localhost:9020/property/primary-image-no-gallery/id-235103097
 http://localhost:9020/property/primary-image-no-gallery/id-400016358870
 http://localhost:9020/property/primary-image-no-gallery/id-221568598
 http://localhost:9020/property/primary-image-no-gallery/id-230111103
 http://localhost:9020/property/resort/id-400020527904
 http://localhost:9020/property/townhouse/id-215121403
 http://localhost:9020/property/unknown-home-for-rent/id-216689903
 http://localhost:9020/property/dual-status-100001483328-239669211/id-100001483328
 http://localhost:9020/property/dual-status-100001201374-227896648/id-100001201374?status=forsale
 http://localhost:9020/property/dual-status-100001201374-225550675/id-100001201374?status=forrent
 http://localhost:9020/property/dual-status-100006188723-223250760/id-100006188723?status=forrent
 http://localhost:9020/property/dual-status-100006188723-223250761/id-100006188723?status=forsale


 Testing.m Links:

 http://testing.m.homes.com/property/a55/id-206999739
 http://testing.m.homes.com/property/agent-for-rent/id-400028620536
 http://testing.m.homes.com/property/agent-free/id-221150982
 http://testing.m.homes.com/property/agent/id-600014367465
 http://testing.m.homes.com/property/alaska-apartment/id-190682294
 http://testing.m.homes.com/property/broker-free/id-223253532
 http://testing.m.homes.com/property/broker/id-100008265290
 http://testing.m.homes.com/property/builder-free-plan/id-2099204
 http://testing.m.homes.com/property/builder-free-spec/id-2099276
 http://testing.m.homes.com/property/builder-plan-stories/id-2149409
 http://testing.m.homes.com/property/builder-plan/id-2225441
 http://testing.m.homes.com/property/builder-spec/id-1937554
 http://testing.m.homes.com/property/condo/id-234624541
 http://testing.m.homes.com/property/dual-ownership/id-600012941943
 http://testing.m.homes.com/property/farm/id-222630144
 http://testing.m.homes.com/property/for-rent-apartment-norfolk-video/id-215265654
 http://testing.m.homes.com/property/for-rent-apartment-with-floorplans/id-233611995
 http://testing.m.homes.com/property/for-rent-apartment-with-floorplans/id-233808150
 http://testing.m.homes.com/property/for-rent-apartment/id-500024217222
 http://testing.m.homes.com/property/for-rent-stories/id-400034454213
 http://testing.m.homes.com/property/for-sale-call/id-600013143537
 http://testing.m.homes.com/property/for-sale-mobile/id-228446166
 http://testing.m.homes.com/property/for-sale-stories/id-400028463416
 http://testing.m.homes.com/property/for-sale-video/id-400028279930
 http://testing.m.homes.com/property/foreclosure/id-400028655926
 http://testing.m.homes.com/property/la-mansion/id-100006186032
 http://testing.m.homes.com/property/local-connnect-for-sale-schools/id-100008325931
 http://testing.m.homes.com/property/lots-land-lot-size/id-232500829
 http://testing.m.homes.com/property/lots-land/id-158809230
 http://testing.m.homes.com/property/multi-family/id-600036509422
 http://testing.m.homes.com/property/off-market-claimed/id-400028801900
 http://testing.m.homes.com/property/off-market/id-200005613919
 http://testing.m.homes.com/property/other-apartment-canada-floorplans/id-219832252
 http://testing.m.homes.com/property/other-apartment-canada/id-199265873
 http://testing.m.homes.com/property/other-apartment/id-206134706
 http://testing.m.homes.com/property/price-history-all-down/id-500022853282
 http://testing.m.homes.com/property/price-history-all-up/id-231189064
 http://testing.m.homes.com/property/price-history-mixed/id-223942367
 http://testing.m.homes.com/property/primary-image-no-gallery/id-700021769121
 http://testing.m.homes.com/property/primary-image-no-gallery/id-235643148
 http://testing.m.homes.com/property/primary-image-no-gallery/id-235103094
 http://testing.m.homes.com/property/primary-image-no-gallery/id-234990970
 http://testing.m.homes.com/property/primary-image-no-gallery/id-234990963
 http://testing.m.homes.com/property/primary-image-no-gallery/id-224887485
 http://testing.m.homes.com/property/primary-image-no-gallery/id-235103097
 http://testing.m.homes.com/property/primary-image-no-gallery/id-400016358870
 http://testing.m.homes.com/property/primary-image-no-gallery/id-221568598
 http://testing.m.homes.com/property/primary-image-no-gallery/id-230111103
 http://testing.m.homes.com/property/resort/id-400020527904
 http://testing.m.homes.com/property/townhouse/id-215121403
 http://testing.m.homes.com/property/unknown-home-for-rent/id-216689903
 http://testing.m.homes.com/property/dual-status-100001483328-239669211/id-100001483328
 http://testing.m.homes.com/property/dual-status-100001201374-227896648/id-100001201374?status=forsale
 http://testing.m.homes.com/property/dual-status-100001201374-225550675/id-100001201374?status=forrent
 http://testing.m.homes.com/property/dual-status-100006188723-223250760/id-100006188723?status=forrent
 http://testing.m.homes.com/property/dual-status-100006188723-223250761/id-100006188723?status=forsale
 */


var _ = require('lodash');

/**
 * Returns property_details for page properties object
 *
 * UPDATE THIS FUNCTION in hui-grunt-build!
 *
 * @param propertyIdentifier {string} From the url, is sz_id or prop_id
 * @param propListingStatus {string='FOR SALE'} Also from the url, used for dual listing status listings, defaults to FOR SALE
 * @returns {*}
 */

function propertyDetail (propertyIdentifier, propListingStatus) {
    var details,
        listings = require('./raw-listings.json');

    details = _.where(listings, {sz_id: propertyIdentifier});

    if (details.length === 0) {
        // found nothing using sz_id, try prop_id

        details = _.where(listings, {prop_id: propertyIdentifier});
    }

    if (details.length === 1) {
        //we have a winner!
        details = details[0];

    } else if (details.length > 1) {
        //dual-status or duplicate listing
        if (propListingStatus) {
            propListingStatus = propListingStatus.replace(/^for/, 'for_');

            details = _.where(details, {listing_status: propListingStatus})[0];
        } else {
            // default to FOR SALE listing
            details = _.where(details, {listing_status: 'for_sale'})[0];
        }
    } else {
        // found nothing, details is undefined
        details = undefined;
    }


    return details;
}

module.exports = propertyDetail;

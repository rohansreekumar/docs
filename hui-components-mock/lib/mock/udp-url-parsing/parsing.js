'use strict';
var _ = require('lodash'),
    propertyDetail = require('./listings');

function daysToNow (dateString) {
    var now = Date.now(),
        date = new Date(dateString);
    now = (now - date) / (1000 * 60 * 60 * 24);

    return Math.ceil(now);
}


function udpListings () {

    var property = propertyDetail.apply(null, arguments);

    if (!_.isUndefined(property)) {
        property.canonical = property.main_link;
        property.main_link = property.main_link.replace(/.*homes\.com/, '').replace(/\/$/, '');
        property.days_listed = daysToNow(property.listing_date);
    }

    return ['property_detail', property];
}

module.exports = udpListings;

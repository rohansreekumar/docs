'use strict';

var _ = require('lodash'),
    mockSchools = require('./schools.json');


// clean up
mockSchools = _.forEach(mockSchools, function (school, i, mockSchools) {
    mockSchools[i] = _.forEach(school, function (value, key, list) {

        var newKey = key.toLowerCase();
        list[newKey] = value;
        delete list[key];
    });
});

module.exports = mockSchools;


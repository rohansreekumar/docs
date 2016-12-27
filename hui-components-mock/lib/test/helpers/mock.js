'use strict';

// aliasing these tools here for tests/mocks written before HDC-515 - AH

var mockTools = require('./../mock/fakeValues'); // fakeFacets, fakeValue, fakeFailure

mockTools.readGet = require('./../tool/readGet').readGet;

mockTools.compileMustache = require('./../tool/compileMustache').compileMustache;

module.exports = mockTools;

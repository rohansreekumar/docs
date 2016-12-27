'use strict';

/**
 * Log an object prettified
 * @param obj Object to log, if it's not an object it will come back as undefined.
 */
exports.logObject = function (obj) {
    console.log(JSON.stringify(obj, null, 2)); //jshint ignore:line
};

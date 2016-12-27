'use strict';

//http://sinonjs.org/docs/#spies-api

exports.listSpies = function (sandbox) {
    console.log(Object.keys(sandbox));
};

exports.logSpy = function (spy) {
    console.log(spy.thisValues);
};

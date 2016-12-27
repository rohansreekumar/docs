'use strict';
// this tool requires that sinon be exposed globally.
// previously, sinon was required here, now, however, sinon is loaded with karma-sinon-chai
// this is due to a bug with sinon exporting property for webpack
// https://github.com/webpack/webpack/issues/177
//
/**
 * Setup and teardown sinon with chai
 *     // https://quickleft.com/blog/angularjs-unit-testing-for-real-though/
 * @param chai chai
 */
module.exports = function () {

    beforeEach(function () {

        // Create a new sandbox before each test
        this.sinon = global.sinon.sandbox.create();

    });

    afterEach(function () {

        // Cleanup the sandbox to remove all the stubs
        this.sinon.restore();
    });

};

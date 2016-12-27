'use strict';

/**
 * Setup and teardown $httpBackend mocks
 * @param angular reference to angular
 */
module.exports = function (angular) {

    beforeEach(function () {
        var self = this;
        angular.mock.inject([
            '$window',
            '$httpBackend',
            function ($window, _$httpBackend_) {
                $window.environment = 16; // always use mock api for tests
                self.$httpBackend = _$httpBackend_;
            }
        ]);
    });

    afterEach(function () {

        this.$httpBackend.verifyNoOutstandingExpectation();
        this.$httpBackend.verifyNoOutstandingRequest();
    });
};

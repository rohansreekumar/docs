'use strict';

var chai = require('chai'),
    expect = chai.expect,
    util = require('hui-components-mock/lib/test');

require('./../index.js');

describe('Google DoubleClick for Publishers Module', function () {
    beforeEach(angular.mock.module('huiDfp'));

    describe('Dfp Util Service', function () {
        util.helpers.sinon(chai);
        beforeEach(angular.mock.inject(function (dfpUrl, dfpCtaUtils, $q, $document, $location, $rootScope) {
            var self = this;

            self.scope = $rootScope.$new();
            self.dfpUrl = dfpUrl;
            self.service = dfpCtaUtils;
            self.document = $document;
            self.location = $location;

            self.sinon.createElement = self.sinon.stub($document[0].body, 'appendChild');
        }));

        describe('loadTagLibrary method', function () {
            context('when the tag libary is already cached', function () {
                it('should return the cached library', function () {
                    var self = this;
                    self.service.cache.library = function () {
                        return {
                            then: function (resolve) {
                                resolve();
                            }
                        };
                    };
                    self.service.cache.library = true;
                    self.service.loadLibrary();
                    expect(self.service).to.not.be.undefined;
                });
            });
            context('when the tag library is not cached', function () {
                beforeEach(function () {
                    var self = this;
                    self.service.loadLibrary();

                });
                it('should return a promise', function () {
                    var self = this;
                    expect(self.service.cache.library.then).to.not.be.undefined;
                });
            });

            context('when the script attempts to load', function () {

                it('should return a resolve promise', function () {
                    var self = this;

                    self.service.loadLibrary().then(function (response) {
                        expect(response).to.equal('Script loaded');
                    });

                    self.service.$onLoad();

                    self.scope.$digest();
                });

                it('should return a resolve promise', function () {
                    var self = this;

                    self.service.loadLibrary().catch(function (error) {
                        expect(error).to.equal('Script failed to load');
                    });

                    self.service.$onError();

                    self.scope.$digest();
                });
            });
        });
    });
});

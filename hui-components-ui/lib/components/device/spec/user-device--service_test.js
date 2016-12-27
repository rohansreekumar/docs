'use strict';

var chai = require('chai'),
    expect = chai.expect;

describe('Device Apps Module', function () {

    var $cookies,
        userDeviceProvider,
        userDevice,
        desktopUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3)' +
            ' AppleWebKit/537.36 (KHTML, like Gecko)' +
            ' Chrome/42.0.2311.90 Safari/537.36',

        iPadUserAgent = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) ' +
            ' AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 ' +
            ' Mobile/11A465 Safari/9537.53',

        iPhoneUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X)' +
            ' AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 ' +
            ' Mobile/12A4345d Safari/600.1.4',

        nexus7UserAgent = 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q)' +
            ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 ' +
            ' Mobile Safari/537.36',

        nexus4UserAgent = 'Mozilla/5.0 (Linux; Android 4.4.4; en-us; Nexus 4 Build/JOP40D) ' +
            ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 ' +
            ' Mobile Safari/537.36';

    function setup (userAgent) {
        var fakeModule = angular.module('test.huiDevice', []);

        fakeModule.config(function (_userDeviceProvider_) {
            userDeviceProvider = _userDeviceProvider_;

            if ($cookies) {
                $cookies.remove('isMobile');
            }

            if (userAgent) {
                userDeviceProvider.setUserAgent(userAgent);
            }

        });

        angular.mock.module('huiDevice', 'test.huiDevice');
        angular.mock.inject(function (_userDevice_, _$cookies_) {
            userDevice = _userDevice_;
            $cookies = _$cookies_;
        });
    }

    describe('User Device Provider', function () {

        beforeEach(function () {
            setup();
        });

        it('should allow the developer to set the user string', function () {

            userDeviceProvider.setUserAgent(desktopUserAgent);
            expect(userDeviceProvider.userAgent).to.equal(desktopUserAgent);

        });

    });

    describe('User Device Service', function () {

        it('should expose a method that parses the userAgent string', function () {

            setup(nexus7UserAgent);

            userDevice.set();

            expect(userDevice.details.deviceType).to.not.equal('NexusTablet');

        });

        it('should expose a method that allows the user to override userDevice.details', function () {

            setup(nexus7UserAgent);
            userDevice.set({
                isMobile: false
            });

            expect(userDevice.details.isMobile).to.be.false;

        });

        it('should expose a method that returns the device properties', function () {

            setup(nexus7UserAgent);

            expect(userDevice.get().platform).to.equal('android');
            expect(userDevice.get().isMobile).to.be.false;
            expect(userDevice.get().deviceType).to.equal('tablet');
            expect(userDevice.get().device).to.equal('NexusTablet');

        });

        describe('Desktops', function () {

            beforeEach(function () {
                setup(desktopUserAgent);
            });

            it('should not report as a mobile device', function () {

                expect(userDevice.details.platform).to.equal('desktop');
                expect(userDevice.details.isMobile).to.be.false;
                expect($cookies.get('IS_MOBILE')).to.equal('false');
                expect(userDevice.details.deviceType).to.equal('desktop');
                expect(userDevice.details.device).to.equal('desktop');

            });

        });

        describe('Mobiles', function () {

            describe('On iPhone', function () {

                beforeEach(function () {
                    setup(iPhoneUserAgent);
                });

                it('should report as an iPhone', function () {

                    expect(userDevice.details.platform).to.equal('ios');
                    expect(userDevice.details.isMobile).to.be.true;
                    expect(userDevice.details.deviceType).to.equal('phone');
                    expect(userDevice.details.device).to.equal('iPhone');

                });

            });

            describe('On Android', function () {

                beforeEach(function () {
                    setup(nexus4UserAgent);
                });

                it('should report as an Android Phone', function () {

                    expect(userDevice.details.platform).to.equal('android');
                    expect(userDevice.details.isMobile).to.be.true;
                    expect(userDevice.details.deviceType).to.equal('phone');
                    expect(userDevice.details.device).to.equal('Nexus');

                });

            });

        });

        describe('Tablets', function () {

            describe('On iPad', function () {

                beforeEach(function () {
                    setup(iPadUserAgent);
                });

                it('should report as an iPad', function () {

                    expect(userDevice.details.platform).to.equal('ios');
                    expect(userDevice.details.isMobile).to.be.false;
                    expect($cookies.get('IS_MOBILE')).to.equal('false');
                    expect(userDevice.details.deviceType).to.equal('tablet');
                    expect(userDevice.details.device).to.equal('iPad');

                });

            });

            describe('On Android Tablet', function () {

                beforeEach(function () {
                    setup(nexus7UserAgent);
                });

                it('should report as an Android Tablet', function () {

                    expect(userDevice.details.platform).to.equal('android');
                    expect(userDevice.details.isMobile).to.be.false;
                    expect($cookies.get('IS_MOBILE')).to.equal('false');
                    expect(userDevice.details.deviceType).to.equal('tablet');
                    expect(userDevice.details.device).to.equal('NexusTablet');

                });

            });

        });


    });

});

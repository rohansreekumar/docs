'use strict';
module.exports = function (ngModule) {
    /**
     * @ngdoc constant
     * @name mobileDevCode
     * @module huiDfp
     *
     * @description
     * network_code for DFP
     */
    ngModule.constant('dfpMobileCodeDev', '65144157');
    /**
     * @ngdoc constant
     * @name mobileCode
     * @module huiDfp
     *
     * @description
     * network_code for DFP
     *
     * 29685107 - mDot / live
     */
    ngModule.constant('dfpMobileCode', '29685107');
    /**
     * @ngdoc constant
     * @name dfpUrl
     * @module huiDfp
     *
     * @description
     * URL for Google's DFP library
     *
     */
    ngModule.constant('dfpUrl', '//www.googletagservices.com/tag/js/gpt.js');
    /**
     * @ngdoc constant
     * @name dfpApp
     * @module huiDfp
     *
     * @description
     * App portion of dfp targeted_ad_unit. HDC naming convention sets these before the position name. Example: '/65144157/Homes_Mobile/Details'
     *
     */
    ngModule.constant('dfpApp', 'Homes_Mobile');

    /**
     * @ngdoc constant
     * @name DFP IDs
     * @module huiDfp
     *
     * @description
     * Ads are requiring different IDs depending on if for_sale, for_rent or foreclosure so adding as constants to help centralise the code and make updates easier.
     *
     */
    ngModule.constant('dfpIds', {
        homesDesktopSr: {
            forSale: {
                header: 'div-gpt-ad-583335050829391971-1',
                right1: 'div-gpt-ad-583335050829391971-2',
                hbr1: 'div-gpt-ad-583335050829391971-3',
                hbr2: 'div-gpt-ad-583335050829391971-4',
                hbr3: 'div-gpt-ad-583335050829391971-5',
                hbr4: 'div-gpt-ad-583335050829391971-6',
                right2: 'div-gpt-ad-583335050829391971-7',
                liner1: 'div-gpt-ad-583335050829391971-8',
                liner2: 'div-gpt-ad-394017927245681243-2',
                special1: 'div-gpt-ad-538660237100591424-11',
                special2: 'div-gpt-ad-538660237100591424-12',
                bottom: 'div-gpt-ad-583335050829391971-9'
            },
            forRent: {
                header: 'div-gpt-ad-225436659794807296-1',
                right1: 'div-gpt-ad-225436659794807296-2',
                hbr1: 'div-gpt-ad-225436659794807296-3',
                hbr2: 'div-gpt-ad-225436659794807296-4',
                hbr3: 'div-gpt-ad-225436659794807296-5',
                hbr4: 'div-gpt-ad-225436659794807296-6',
                right2: 'div-gpt-ad-225436659794807296-7',
                liner1: 'div-gpt-ad-225436659794807296-8',
                liner2: 'div-gpt-ad-394017927245681243-2',
                special1: 'div-gpt-ad-674671900354111058-11',
                special2: 'div-gpt-ad-674671900354111058-12',
                bottom: 'div-gpt-ad-225436659794807296-9'
            },
            foreclosure: {
                header: 'div-gpt-ad-649331217918523673-1',
                right1: 'div-gpt-ad-649331217918523673-2',
                hbr1: 'div-gpt-ad-649331217918523673-3',
                hbr2: 'div-gpt-ad-649331217918523673-4',
                hbr3: 'div-gpt-ad-649331217918523673-5',
                hbr4: 'div-gpt-ad-649331217918523673-6',
                right2: 'div-gpt-ad-649331217918523673-7',
                liner1: 'div-gpt-ad-649331217918523673-8',
                liner2: 'div-gpt-ad-394017927245681243-2',
                special1: 'div-gpt-ad-394581795589006008-11',
                special2: 'div-gpt-ad-394581795589006008-12',
                bottom: 'div-gpt-ad-649331217918523673-9'
            },
            offMarket: {
                text1: 'div-gpt-ad-576924305463887817-1',
                text2: 'div-gpt-ad-576924305463887817-2',
                text3: 'div-gpt-ad-576924305463887817-3',
                text4: 'div-gpt-ad-576924305463887817-4',
                right1: 'div-gpt-ad-576924305463887817-5',
                hbr1: 'div-gpt-ad-576924305463887817-6',
                hbr2: 'div-gpt-ad-576924305463887817-7',
                hbr3: 'div-gpt-ad-576924305463887817-8',
                hbr4: 'div-gpt-ad-576924305463887817-9',
                right2: 'div-gpt-ad-576924305463887817-10',
                special1: 'div-gpt-ad-576924305463887817-11',
                special2: 'div-gpt-ad-576924305463887817-12',
                mortbutton: 'div-gpt-ad-576924305463887817-13',
                bottom: 'div-gpt-ad-576924305463887817-14',
                leadform: 'div-gpt-ad-576924305463887817-15'
            }
        },

        homesDesktopDt: {
            forSale: {
                text1: 'div-gpt-ad-538660237100591424-1',
                text2: 'div-gpt-ad-538660237100591424-2',
                text3: 'div-gpt-ad-538660237100591424-3',
                text4: 'div-gpt-ad-538660237100591424-4',
                right1: 'div-gpt-ad-538660237100591424-5',
                hbr1: 'div-gpt-ad-538660237100591424-6',
                hbr2: 'div-gpt-ad-538660237100591424-7',
                hbr3: 'div-gpt-ad-538660237100591424-8',
                hbr4: 'div-gpt-ad-538660237100591424-9',
                right2: 'div-gpt-ad-538660237100591424-10',
                special1: 'div-gpt-ad-538660237100591424-11',
                special2: 'div-gpt-ad-538660237100591424-12',
                mortbutton: 'div-gpt-ad-538660237100591424-13',
                bottom: 'div-gpt-ad-538660237100591424-14',
                leadform: 'div-gpt-ad-538660237100591424-15'
            },
            forRent: {
                text1: 'div-gpt-ad-674671900354111058-1',
                text2: 'div-gpt-ad-674671900354111058-2',
                text3: 'div-gpt-ad-674671900354111058-3',
                text4: 'div-gpt-ad-674671900354111058-4',
                right1: 'div-gpt-ad-674671900354111058-5',
                hbr1: 'div-gpt-ad-674671900354111058-6',
                hbr2: 'div-gpt-ad-674671900354111058-7',
                hbr3: 'div-gpt-ad-674671900354111058-8',
                hbr4: 'div-gpt-ad-674671900354111058-9',
                right2: 'div-gpt-ad-674671900354111058-10',
                special1: 'div-gpt-ad-674671900354111058-11',
                special2: 'div-gpt-ad-674671900354111058-12',
                mortbutton: 'div-gpt-ad-674671900354111058-13',
                bottom: 'div-gpt-ad-674671900354111058-14',
                leadform: 'div-gpt-ad-674671900354111058-15'
            },
            foreclosure: {
                text1: 'div-gpt-ad-394581795589006008-1',
                text2: 'div-gpt-ad-394581795589006008-2',
                text3: 'div-gpt-ad-394581795589006008-3',
                text4: 'div-gpt-ad-394581795589006008-4',
                right1: 'div-gpt-ad-394581795589006008-5',
                hbr1: 'div-gpt-ad-394581795589006008-6',
                hbr2: 'div-gpt-ad-394581795589006008-7',
                hbr3: 'div-gpt-ad-394581795589006008-8',
                hbr4: 'div-gpt-ad-394581795589006008-9',
                right2: 'div-gpt-ad-394581795589006008-10',
                special1: 'div-gpt-ad-394581795589006008-11',
                special2: 'div-gpt-ad-394581795589006008-12',
                mortbutton: 'div-gpt-ad-394581795589006008-13',
                bottom: 'div-gpt-ad-394581795589006008-14',
                leadform: 'div-gpt-ad-394581795589006008-15'
            },
            offMarket: {
                text1: 'div-gpt-ad-576924305463887817-1',
                text2: 'div-gpt-ad-576924305463887817-2',
                text3: 'div-gpt-ad-576924305463887817-3',
                text4: 'div-gpt-ad-576924305463887817-4',
                right1: 'div-gpt-ad-576924305463887817-5',
                hbr1: 'div-gpt-ad-576924305463887817-6',
                hbr2: 'div-gpt-ad-576924305463887817-7',
                hbr3: 'div-gpt-ad-576924305463887817-8',
                hbr4: 'div-gpt-ad-576924305463887817-9',
                right2: 'div-gpt-ad-576924305463887817-10',
                special1: 'div-gpt-ad-576924305463887817-11',
                special2: 'div-gpt-ad-576924305463887817-12',
                mortbutton: 'div-gpt-ad-576924305463887817-13',
                bottom: 'div-gpt-ad-576924305463887817-14',
                leadform: 'div-gpt-ad-576924305463887817-15'
            }
        }
    });
};

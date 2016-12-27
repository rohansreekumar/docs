'use strict';

module.exports = function (ngModule) {

    /**
     * @name homepageHeroBackgrounds
     * @description
     * The backgrounds for the homepage hero section
     */

    ngModule.factory('homepageHeroBackgrounds', [
        '$rootScope',
        '$location',
        '_',
        function ($rootScope,
                  $location,
                  _) {
            var bkgs, randomBkg, firstBkg, currentBkg, newBkg, shouldChangeBackground, lastPage, pagesToCheckAgainst;

            bkgs = [
                'random-background/homepage-hero01.jpg',
                'random-background/homepage-hero02.jpg',
                'random-background/homepage-hero03.jpg',
                'random-background/homepage-hero04.jpg',
                'random-background/homepage-hero05.jpg',
                'random-background/homepage-hero06.jpg'
            ];

            /*
             For this to really work we'd need a service to report the last viewed
             page.  For now, we can mock it out using $location.
             */

            pagesToCheckAgainst = [
                '/',
                '/for-sale',
                '/rentals',
                '/home-prices'
            ];

            $rootScope.$on('$locationChangeSuccess', function () {
                lastPage = $location.path();
            });

            shouldChangeBackground = function (page) {
                if (pagesToCheckAgainst.indexOf(page) !== -1) {
                    return false;
                } else {
                    return true;
                }
            };

            randomBkg = function () {
                return Math.floor(Math.random() * bkgs.length);
            };

            /**
             * Get a new backgound image url
             * @returns {string} image url
             */

            newBkg = function () {

                // first bkg
                if (currentBkg === undefined) {
                    firstBkg = currentBkg = randomBkg();
                    return bkgs[currentBkg];
                }

                // If background shouldn't change, return the current background.
                if (lastPage && !shouldChangeBackground(lastPage)) {
                    return bkgs[currentBkg];
                }

                // next background
                ++currentBkg;

                if (currentBkg > bkgs.length - 1) {
                    // loop around backgrounds
                    currentBkg = 0;
                }

                if (currentBkg === firstBkg) {
                    // all backgrounds seen, choose random start
                    firstBkg = currentBkg = randomBkg();
                }

                return bkgs[currentBkg];
            };

            return {
                newBackground: newBkg
            };

        }
    ]);


};

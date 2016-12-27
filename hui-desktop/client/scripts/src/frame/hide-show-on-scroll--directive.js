'use strict';

module.exports = function (ngModule) {
    ngModule.directive('hideShowOnScroll', [
        '$window',
        function ($window) {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    var baseline = $window.pageYOffset;
                    angular.element($window).bind('scroll', function () {

                        if (baseline < this.pageYOffset) {
                            if (element.hasClass('scrolling-up')) {
                                element.removeClass('scrolling-up');
                            }
                            element.addClass('scrolling-down');
                        } else {
                            if (element.hasClass('scrolling-down')) {
                                element.removeClass('scrolling-down');
                            }
                            element.addClass('scrolling-up');
                        }

                        baseline = this.pageYOffset;
                    });
                }
            };
        }
    ]);
};

'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name client.frame.globalNavFooter.globalNavFooter.directive:googleShareButton
     *
     * @restrict A
     *
     * @requires $window
     * @requires googleShare
     *
     * @description
     * Opens Google+ Share box
     * @link client.frame.globalNavFooter.directive:googleShareButton
     */
    ngModule.directive('googleShareButton', [
        '$window',
        'googleShare',
        function (
            $window,
            googleShare
        ) {
            return {
                restrict: 'A',
                scope: {
                    googleShareButton: '=?'
                },
                link: function (scope, element) {
                    var watchAdded = false,
                        unbindWatch;

                    function renderPlusButton() {
                        googleShare.loadLibrary()
                            .then(function () {
                                if (!scope.googleShareButton && !watchAdded) {
                                    // wait for data if it hasn't loaded yet
                                    watchAdded = true;
                                    unbindWatch = scope.$watch('googleShareButton', function (newValue, oldValue) {
                                        if (newValue) {
                                            renderPlusButton();
                                            unbindWatch();
                                        }
                                    });
                                    return;
                                } else {
                                    element.html('<div class="g-plusone"' + (!!scope.googleShareButton ? ' data-href="' + scope.googleShareButton + '"' : '') + ' data-size="standard"></div>');
                                    $window.gapi.plusone.go(element.parent()[0]);
                                }
                            });
                    }
                    renderPlusButton();
                }
            };
        }
    ]);
};

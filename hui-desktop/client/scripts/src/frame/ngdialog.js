'use strict';


/**
 * Configure ngdialog for app
 */
module.exports = function (ngModule) {

    ngModule.config([
        'ngDialogProvider',
        'modalThemeClassProvider',
        function (
            ngDialogProvider,
            modalThemeClassProvider
        ) {
            var desktopThemeClassName = 'ngdialog-theme-hui--desktop';
            modalThemeClassProvider.setDefaults({
                className: desktopThemeClassName
            });
            ngDialogProvider.setDefaults({
                className: desktopThemeClassName,
                showClose: true, // show close button
                closeByEscape: true, // close by hitting escape
                closeByDocument: true, // close by clicking on overlay
                closeByNavigation: true // close when you leave the page
            });
        }
    ]);
};

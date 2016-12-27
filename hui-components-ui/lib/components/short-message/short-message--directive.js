'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc directive
     * @name openShortMessage
     * @module huiShortMessage
     * @restrict A
     * @description
     * Open Short Message when clicked.
     *
     * @requires $parse
     * @requires ShortMessage
     */
    ngModule.directive('openShortMessage', [
        '$parse',
        'ShortMessage',
        function ($parse, ShortMessage) {
            var directive = {
                restrict: 'A'
            };

            directive.link = function (scope,
                                       element,
                                       attr) {
                scope.messageObject = $parse(attr.openShortMessage)(scope);

                element.on('click touchend', function () {
                    ShortMessage.open(scope.messageObject);
                });
            };
            return directive;
        }
    ]);

    /**
     * @ngdoc directive
     * @name shortMessage
     * @module huiShortMessage
     * @restrict E
     * @description
     * The Short Message Directive.
     * @param
     * {Object} message - an object complete with 'title' and 'message' properties
     * @example
     * <div data-open-short-message="messageObject"></div>
     */
    ngModule.directive('shortMessage',
        function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/ui/templates/short-message.html',
                bindToController: true,
                controller: 'shortMessageController',
                controllerAs: 'shortMessageCtrl',
                scope: {
                    message: '='
                }
            };
        }
    );

    /**
     * @ngdoc controller
     * @name shortMessageController
     * @module huiShortMessage
     *
     * @description
     * Manages state for shortMessage directive
     *
     */
    ngModule.controller('shortMessageController',
        function () {
            var self = this;
        }
    );

    /**
     * @ngdoc service
     * @name ShortMessage
     * @module huiShortMessage
     * @description
     * Provides short message business logic and interactive functionality
     * @requires ngDialog
     */
    ngModule.service('ShortMessage', [
        'ngDialog',
        'modalThemeClass',
        function (
            ngDialog,
            modalThemeClass
        ) {

            var service = {
                dialog: null
            };

            service.open = function (messageObject) {
                if (!service.dialog) {
                    service.dialog = ngDialog.open({
                        name: 'shortMessage',
                        className: modalThemeClass + ' modal--small short-message',
                        template: '<short-message data-message="messageObject"></short-message>',
                        controller: [
                            '$scope',
                            function($scope) {
                                $scope.messageObject = messageObject;
                            }
                        ],
                        appendTo: '._centerContent',
                        plain: true,
                        closeByDocument: true,
                        closeByNavigation: true,
                        showClose: true
                    });

                    service.dialog.closePromise.then(function () {
                        service.dialog = null;
                    });
                }
            };

            return service;
        }
    ]);
};

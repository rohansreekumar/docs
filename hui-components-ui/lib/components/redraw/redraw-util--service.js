'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc service
     * @name redrawUtil
     * @module huiRedraw
     *
     *
     * @description
     * redrawUtil service  provides
     * removeTransform method - remove the class .transformable to stop transform of element
     * removeTransformOnPlatform - if the platfomr is right, calls removeTransform()
     * the specific platform
     **/
    ngModule.service('redrawUtil', [
        'userDevice',
        function (userDevice) {

            var _this = this;

            _this.removeTransform = function(element) {
                element.removeClass('is-transformable');
            };

            _this.removeTransformOnPlatform = function(element, platform) {
                if (userDevice.details.platform === platform) {
                    _this.removeTransform(element);
                }
            };
        }
    ]);
};

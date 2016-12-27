'use strict';

module.exports = function (ngModule) {

    /**
     * @ngdoc service
     * @name d3Utils
     * @module huid3
     *
     *
     * @description
     * Creates a service to provide d3.js utilities to app.
     *
     */
    ngModule.service('d3Utils', function () {

        var _this = this;

        _this.d3 = window.d3;

    });

};

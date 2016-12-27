/**
 * @ngdoc module
 * @name modals
 * @module modals
 * @type {module}
 *
 * @description
 * the Modals module has modals.
 *
 * We're abstracting modals from ngDialog here a bit. if we use a different dialog plugin in the future, we only need to adjust these triggers.
 */

'use strict';
require('hui-components-vendor/lib/ngDialog');
require('hui-components-vendor/lib/lodash');

var ngModule = angular.module('huiModals', ['lodash', 'ngDialog']);

require('./open-modals--service')(ngModule);
require('./modal-open-class--service')(ngModule);
require('./modal-theme-class--value')(ngModule);
require('./modal-watcher--service')(ngModule);

module.exports = ngModule;

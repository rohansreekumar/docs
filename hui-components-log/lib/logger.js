'use strict';

var $ = require('jquery'),
    _ = require('lodash'),
    StackTrace = require('stacktrace-js'),
    store = require('store'),
    qs = require('qs'),
    internals;

internals = {
    /**
     * get the property keys off of object so that we can get everything we want off of the Error Objects for logs
     * @param  {Object} obj object to get the properties of
     * @return {Object}     array of property names
     */
    getAllProperties: function (obj) {
        var props = [];

        do {
            props = props.concat(Object.getOwnPropertyNames(obj));

            obj = Object.getPrototypeOf(obj);
        } while (obj && obj.constructor !== Object);

        return _.uniq(props);
    },
    /**
     * Clean up the props of an item we want to log, this is how we get properties off of the constructor
     * @param  {Object} item Item we want to log
     * @return {Object}      object with the properties we want set for logging
     */
    serializeLog: function (item) {
        var clone = {};

        _.forEach(internals.getAllProperties(item), function (prop) {
            if (typeof item[prop] !== 'function') {
                clone[prop] = item[prop];
            }
        });

        return clone;
    },
    /**
     * Use qs to serializeParams for sending
     * @param  {Object} params query parameter object
     * @return {String}        query params
     */
    serializeParams: function (params) {

        return qs.stringify(params);
    }
};

function Logger(options) {
    var _this = this,
        settings = {},
        publicMethods = {},
        logKey = 'app.log';

    options = options || {};
    settings.interval = options.interval || 2000;
    settings.apiHost = options.apiHost || window.app.log_host;
    settings.apiPath = options.apiPath || '/v1/log/squanch';
    settings.standardQueryParams = options.standardQueryParams || {
        api_key: '00000000000000000000',
        app_platform: 'mobileweb',
        app: 'hdc_portal'
    };
    logKey = options.logKey || logKey;

    _this.$settings = settings;

    _this.$sendInitialized = false;
    _this.$$sourceConstructorPattern = /new\s(\w[\S]*)\s/;

    _this.$addToQueue = function (item) {

        var current = _this.$getQueue();

        current = current || [];

        item = internals.serializeLog.call(_this, item);

        current.push(item);

        _this.$initSend();

        return store.set(logKey, current);
    };
    _this.$getQueue = function () {
        return store.get(logKey);
    };
    _this.$clearQueue = function () {
        return store.set(logKey, []);
    };

    _this.$cleanSource = function (stackFrame) {
        var match;

        if (stackFrame.functionName === 'new') {
            match = stackFrame.source.match(_this.$$sourceConstructorPattern);
            if (match && match[1]) {
                stackFrame.functionName = stackFrame.functionName + ' ' + match[1];
            }
        }

        return stackFrame;
    };
    // start sending errors
    _this.$initSend = function () {
        if (!_this.$sendInitialized) {
            _this.$clearInterval = window.setInterval(_this.$sendToServer, settings.interval);
            _this.standardQueryString = internals.serializeParams.call(_this, settings.standardQueryParams);
            _this.$sendInitialized = true;
        }
    };

    // send queued errors
    _this.$sendToServer = function () {
        var sending = _this.$getQueue() || []; // get all errors in queue

        function _handleLogServerError(loggingError) {
            // requeue errors that failed to log
            if (window.app && window.app.dev) {
                try {
                    console.warn('Sever-side logging failed for ' + sending.length + ' messages.', sending); // jshint ignore: line
                } catch (e) {
                    // do nothing
                }
            }

        }

        if (sending.length > 0) {
            // clear queue because we are going to send
            _this.$clearQueue();

            $.ajax({
                    type: 'POST',
                    url: window.location.protocol + '//' + settings.apiHost + settings.apiPath + '?' + _this.standardQueryString,
                    contentType: 'application/json',
                    data: angular.toJson(sending)
                })
                .then(_this.$clearQueue, _handleLogServerError);
        }
        // otherwise to nothing.
    };

    _this.$formatMessage = function (messageObj, level) {
        var format = {
            // timestamp,
            timestamp: Date.now(), // save the time when logged
            // page_url
            page_url: window.location.href, // want the full url with the domain
            // page_host
            page_host: window.location.hostname,
            // referrer
            referrer: window.document.referrer,
            // build_number,
            build_number: window.build_number,
            // level
            level: level || 'LOG'
        };

        if (typeof messageObj === 'string') {
            format.message = messageObj;

            // return format.message;
            return format;
        } else {
            return _.defaults(messageObj, format);
        }
    };

    // queue  errors for sending
    _this.$queueError = function (exception) {

        exception = _this.$formatMessage(exception, 'ERROR');

        return StackTrace.fromError(exception, {
                offline: true
            })
            .then(function (stackframes) {
                exception.stack = _(stackframes)
                    .map(function (sf) {
                        return _this.$cleanSource(sf).toString();
                    })
                    .join('\n');

                return _this.$addToQueue(exception);
            });
    };

    publicMethods.error = function (exception) {
        _this.$queueError(exception);
    };

    publicMethods.purge = function () {
        _this.$sendToServer();
    };

    return _.extend(_this, publicMethods);
}

Logger.prototype.constructor = Logger;

module.exports = Logger;

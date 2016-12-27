// css.js

// css functions

'use strict';

var rework = require('rework'),
    myth = require('myth'),
    mixin = require('rework-plugin-mixin'),
    reworkFunction = require('rework-plugin-function'),
    project = require('./../../../../project.json'),
    icons = require('./icons'),
    imprt = require('rework-import'),
    _ = require('lodash'),
    q = require('q'),
    fs = require('fs');


var mixins = {}, functions = {}, util = {};

_.merge(mixins, icons.mixins);
_.merge(functions, icons.functions);
_.merge(util, icons.util);


// fontUrl
//
// Returns path prepended with url of font assets. Run after imports are done.

functions.fontUrl = function (path) {

    return 'url(\'../fonts/' + path + '\')';
};

// only runs through font-url function
util.fonts = function (css) {

    css = rework(css)
        .use(reworkFunction({'font-url': functions.fontUrl}))
        .toString({compress: true});

    return css;
};

mixins.overflow = function (type) {
    if ('ellipsis' == type) {
        return {
            'white-space': 'nowrap',
            'overflow': 'hidden',
            'text-overflow': 'ellipsis'
        }
    }

    return type;
}

// Run CSS string through rework.js
function processCss(css, options) {
    options = options || {};
    options = _.defaults(options, {
        myth: true,
        source: './index.css'
    });

    console.log(options);

    if (options.myth === true) {
        css = rework(css)
            .use(myth({
                source: options.source,
                path: options.path
            }))
            // .use(mixin({'icon': mixins.icon}))
            .toString();
    } else {
        css = rework(css);

        css = css.use(imprt({path: options.path}));

        css = css.use(mixin({
            overflow: mixins.overflow
        }));

        css = css.toString();
    }

    return css;
}

module.exports = {
    mixins: mixins,
    functions: functions,
    util: util,
    processCss: processCss
};

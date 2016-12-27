// (Homes) Icon Font utils

// css functions

'use strict';

var rework = require('rework'),
    project = require('./../../../../project.json'),
    converter = require('./lib/converter'),
    _ = require('lodash'),
    q = require('q'),
    fs = require('fs');


var svgFontToJSON = function (source) {
    var d = q.defer();

    // read raw
    fs.readFile(source, function (err, svg) {
        if (err) {
            d.reject(err);
        }

        converter.toJson(svg, function (json, err) {
            if (err) {
                d.reject(err);
            }

            d.resolve(JSON.stringify(json, null, 4));
        });

    });

    return d.promise;
}


// Rework Mixins
var mixins = {

    // mixin
    // icon
    //
    // returns unicode for icon name, run after imports are done
    icon: function (name) {
        var data = JSON.parse(fs.readFileSync(project.path.icons + '/' + project.icons.map));

        return {
            'font-family': '"Homes Icons"',
            'content': '',
            'font-weight': '400'
        };
    }
};


// Rework Functions
var functions = {};

// Utilities

var util = {


    // #makeMap
    //
    // Makes a map for icon substitution
    //


    makeMap: function (path, source, dest) {
        var d = q.defer(), saveMap, map, svg;

        // expand path
        //
        svg = (/\.svg$/i.test(source)) ? true : false;

        source = path + '/' + source;
        dest = path + '/' + dest;

        saveMap = function (map) {
            fs.writeFile(dest, map, {encoding: 'utf8'}, function (err) {
                if (err) {
                    d.reject(err);
                }

                d.resolve(dest);
            });
        }

        if (svg) {
            svgFontToJSON(source).then(function (map) {
                saveMap(map);
            }, function (err) {
                d.reject(err);
            });
        } else {

            // read the json "Map" I made with find/ replace in SublimeText
            //
            fs.readFile(source, function (err, data) {
                if (err) {
                    d.reject(err);
                }
                // eventually this will read the svg font file file, parse to json and then do the match.
                // today it was easier to just find/replace in Sublime

                // Parse Raw, format is {name: [name, name...], code: [ unicode, unicode...]}
                data = JSON.parse(data);
                map = JSON.stringify(_.object(data.name, data.code));

                // write new map
                saveMap(map);

            });

        }


        return d.promise;
    }
};


module.exports = {
    mixins: mixins,
    functions: functions,
    util: util
};

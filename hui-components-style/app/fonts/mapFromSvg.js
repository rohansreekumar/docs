'use strict';

var parser = require('xmljson').to_json,
    path = require('canonical-path'),
    _ = require('lodash'),
    fs = require('fs');


//var xml = fs.readFileSync(path.resolve(__dirname, '../assets', 'fonts', 'homes-icons', 'homes-icons-web.svg')),
  var  outTemplate = fs.readFileSync(path.resolve(__dirname, './mapFromSvg.tpl.scss'), {encoding: 'UTF-8'});
//    outFile = path.resolve(__dirname, '../src', 'scss', 'homes-ui', 'mixins','_Icons-map.scss');

/**
 * Creates an object of unicode hex values for characters in an svg font.
 *
 * homes-icons-web.svg, the version with ligatures, has a double set of glyphs. By parsing the XML of the SVG file and then matching the unicode entity glyphs with the same glyph specified by ligature, we get human readable names.
 *
 * [
 *  {
 *      name: 'advertisewithus'
 *      unicode: unicode: 'e600'
 *   }
 * ]
 *
 * @param svgFont xml string
 * @returns {array} an array of names and unicode entities
 */

function mapFromSvg(svgFont) {
    var mapObj;

    parser(svgFont, function (error, data) {

        mapObj = _(data.svg.defs.font.glyph)
            .map(function (glyph) {
                var human = /[a-zA-Z]/;

                // 'd' is the path of the actual icon.
                if (human.test(glyph.$.unicode)) {
                    // ligature
                    return {
                        name: glyph.$.unicode,
                        d: glyph.$.d
                    }
                } else {
                    // entity
                    return {
                        unicode: glyph.$.unicode.charCodeAt(0).toString(16),
                        d: glyph.$.d
                    };
                }
            })
            .groupBy('d')
            .filter(function (glyphGroup) {
                return _.find(glyphGroup, 'name');
            })
            .map(function (glyphGroup) {
                var named = _.find(glyphGroup, 'name');
                var entity = _.find(glyphGroup, 'unicode');

                return _.defaults(named, entity);
            })
            .map(function (glyph) {
                return _.pick(glyph, 'name', 'unicode');
            })
            .value();
    });

    return mapObj;
}

function sassVars (varArray, sassVarTemplate) {
    sassVarTemplate = sassVarTemplate || outTemplate;

    sassVarTemplate = _.template(sassVarTemplate);

    return sassVarTemplate({variables:varArray});
}

function makeSassVars (src) {
    return sassVars(mapFromSvg(src));
}
exports.mapFromSvg = mapFromSvg;
exports.sassVars = sassVars;
exports.makeSassVars = makeSassVars;

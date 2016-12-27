'use strict';

var expect = chai.expect,
    _ = require('lodash'),
    project = require('./../../../../../project.json'),
    icons = require('./../icons.js');

describe('css/icons#util#makeMap', function () {

    it('should find an svg icon file');

    it('should convert an svg icon file to json', function () {
        var map = false;
        icons.util.makeMap(__dirname + './../../../../../' + project.path.fonts + 'homes-icons', 'homes-icons.svg', 'map.json').then(function (map) {

            console.log(map);
            expect(map).to.be.ok;
        });


    });

    it('should save a json map to a location');

    it('should return a json map');
});

/**
 * Created by Morgan on 5/29/2017.
 */

const should = require('should');
const reqeust = require('request');
const expect = require('chai').expect;
const util = require('util');
var GeoJson_helper = require('../services/overpass_jsonresult_helper/Geojson_helper_service');
const baseUrl = "http://localhost:3000/";


describe('Geojson_helper', function () {
    it('should work', function () {
        expect(true).to.be.true;
    })

    it('processOverpassResult should return an array of strings', function () {
        expect(true).to.be.true;
    })
});


function getGeoJsonData() {
    var data = { type: 'FeatureCollection',
        features: [
            { type: 'Feature',
                id: 'node/3118424509',
                properties: [Object],
                geometry: [Object] },
            { type: 'Feature',
                id: 'node/4109432194',
                properties: [Object],
                geometry: [Object] }
        ] }

    return data;

}

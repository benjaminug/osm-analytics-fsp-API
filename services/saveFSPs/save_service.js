/**
 * Created by Morgan on 4/28/2017.
 */

var util = require('util');
var queryOverpass = require("query-overpass");
const _geoJsonHelperService = require('../../services/overpass_jsonresult_helper/Geojson_helper_service');
const settings = require('../../common/settings');

var maxQueryCount = 0;

var saveExpo = module.exports = {

    generateSaveQuery: function (saveObject) {
        //do something
        var latitude = saveObject.lat;
        var longitude = saveObject.long;
        var radius = saveObject.radius;
        var searchterm = util.format('~"%s"', saveObject.search);

        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|microfinance_bank|microfinance|sacco"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, searchterm);

        return query;
    },

    processSaveRequest: function (searchObject, next, res, client_radius) {
        //Build the search query
        var query = saveExpo.generateSaveQuery(searchObject);

        maxQueryCount++;

        //Send query to Overpass API
        queryOverpass(query, function (err, geojson) {
            if (err) {
                maxQueryCount = 0;
                return next(err);
            }

            var current_radius = Number(searchObject.radius);//Get current object radius
            //Process returned data
            var processedGeojson = _geoJsonHelperService.processGeojsonData(geojson, current_radius);

            if (processedGeojson.length === 0 && maxQueryCount < settings.max_request_count) {

                var newRadius = current_radius + client_radius;//Add the current plus what the client sent
                searchObject.radius = newRadius;

                console.log('Radius: ' + searchObject.radius);
                console.log('Query count: ' + maxQueryCount);

                saveExpo.processSaveRequest(searchObject, next, res, client_radius);
            } else {
                maxQueryCount = 0;
                res.send(processedGeojson);
            }

        });
    }
};
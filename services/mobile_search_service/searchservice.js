/**
 * Created by Morgan on 4/21/2017.
 */
"use strict";
var util = require('util');
var queryOverpass = require("query-overpass");
const _geoJsonHelperService = require('../../services/overpass_jsonresult_helper/Geojson_helper_service');
const settings = require('../../common/settings');

var maxQueryCount = 0;

var self = module.exports = {

    generateSearchQuery: function (searchObject) {
        //do something

        var latitude = searchObject.lat;
        var longitude = searchObject.long;
        var radius = searchObject.radius;
        var searchterm = util.format('~"%s"', searchObject.search);

        //var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:5500,0.331321,32.576772)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"]["name"%s](area););out;';
        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, searchterm);

        return query;
    },

    processRequest: function (searchObject, next, res, client_radius) {
        //Build the search query
        var query = self.generateSearchQuery(searchObject);

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

                self.processRequest(searchObject, next, res, client_radius);
            } else {
                maxQueryCount = 0;
                res.send(processedGeojson);
            }

        });
    }
};




/**
 * Created by Morgan on 4/28/2017.
 */


var util = require('util');
var queryOverpass = require("query-overpass");
const _geoJsonHelperService = require('../../services/overpass_jsonresult_helper/Geojson_helper_service');
const settings = require('../../common/settings');

var maxQueryCount = 0;

var withdrawExpo = module.exports = {

    generateWithdrawQuery: function (withdrawObject) {
        //do something

        var latitude = withdrawObject.lat;
        var longitude = withdrawObject.long;
        var radius = withdrawObject.radius;
        var searchterm = util.format('~"%s"', withdrawObject.search);

        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|money_transfter"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, searchterm);

        return query;
    },

    processWithdrawRequest: function (searchObject, next, res, client_radius) {
        //Build the search query
        var query = withdrawExpo.generateWithdrawQuery(searchObject);

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

                withdrawExpo.processWithdrawRequest(searchObject, next, res, client_radius);
            } else {
                maxQueryCount = 0;
                res.send(processedGeojson);
            }

        });
    }
};


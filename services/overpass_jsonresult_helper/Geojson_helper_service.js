/**
 * Created by Morgan on 4/28/2017.
 */

var queryOverpass = require("query-overpass");
const settings = require('../../common/settings');
var validator = require('fluent-validator');
var util = require('util');

var maxQueryCount = 0;


function generateQuery(searchObject, fspType) {

    return new Promise(function (fulfill, reject) {

        //[out:json];node[place="city"];out;
        var latitude = searchObject.lat;
        var longitude = searchObject.long;
        var radius = searchObject.radius;

        var searchTerm = '';
        if (searchObject.search) {
            //searchTerm = util.format('~"%s"', searchObject.search);
            searchTerm = util.format('~"%s", i', searchObject.search); //i stands for case insensitive
        }

        var query = "";

        //querying for Fenced data
        //query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"]["name"%s](area););out 10;';

        switch (Number(fspType)) {
            case settings.FspCategory.Save:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|microfinance_bank|microfinance|sacco"]["name"%s];);out 20;';
                break;
            case settings.FspCategory.Borrow:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|credit_institution|microfinance_bank|microfinance|sacco"]["name"%s];);out 20;';
                break;
            case settings.FspCategory.Withdraw:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|microfinance_bank|microfinance|sacco|money_transfter"]["name"%s];);out 20;';
                break;
            case settings.FspCategory.Send:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|microfinance_bank|microfinance|money_transfter"]["name"%s];);out 20;';
                break;
            case settings.FspCategory.Search:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"]["name"%s];);out 10;';
                break;
            case NaN: //if string value is passed, Number("someString") will return NaN
            default:
                query = "";
                break;
        }

        if (query === "")
            return reject(new Error(settings.emptyQueryMessage))

        query = util.format(query, radius, latitude, longitude, searchTerm);

        return fulfill(query);

    });

}

function processOverpassResult(geoJsonData, search_radius) {

    var data = [];

    var featuresCollection = geoJsonData["features"];

    for (var i = 0; i < featuresCollection.length; i++) {

        var id = featuresCollection[i]["properties"].id;
        var tags = featuresCollection[i]["properties"]["tags"];
        var coordinates = featuresCollection[i]["geometry"].coordinates;

        tags.id = id;
        tags.radius = search_radius;
        tags.coordinates = coordinates;


        data.push(tags);
    }

    return data;
}

var coreProcessor = module.exports = {

    dataValidator: function (queryObject) {

        return new Promise(function (fulfill, reject) {
            var validation = validator()
                .validate(queryObject).isNotEmpty("Parameter can not be null or empty")
                .validate(queryObject.long).isFloat().and.isNotEmpty('Longitude can not be null or empty')
                .validate(queryObject.lat).isFloat().and.isNotEmpty('Latitude can not be empty')
                .validate(queryObject.radius).isNumeric().and.isPositive().or.isNotEmpty('Radius can not be empty');

            if (validation.hasErrors()) {

                reject(new Error(JSON.stringify(validation.getErrors())));
            } else {
                fulfill();
            }
        });

    },

    process_request: function (searchObject, fspType, next, res, client_radius) {

        generateQuery(searchObject, fspType).then(function (query) {

            maxQueryCount++;
            //Send query to Overpass API
            queryOverpass(query, function (err, geojson) {
                if (err) {

                    if (err.statusCode === settings.http_status && maxQueryCount < settings.max_request_count) {
                        console.log('error and retry: ' + err.statusCode);
                        setTimeout(function () {
                            return coreProcessor.process_request(searchObject, fspType, next, res, client_radius);
                        }, settings.retry_time);
                        return;
                    } else {
                        maxQueryCount = 0;
                        return next(err);
                    }
                }

                var newRadius = client_radius * maxQueryCount;//Add the current plus what the client sent

                //Process returned data
                var processedGeoJson = processOverpassResult(geojson, newRadius);

                if (processedGeoJson.length === 0 && maxQueryCount < settings.max_request_count) {

                    searchObject.radius = newRadius;

                    console.log('Recursion: ' + maxQueryCount);

                    coreProcessor.process_request(searchObject, fspType, next, res, client_radius);
                } else {
                    maxQueryCount = 0;
                    res.send(processedGeoJson);
                }

            });
        }).catch(next);

    }

};



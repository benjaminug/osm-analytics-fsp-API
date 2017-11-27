const queryOverpass = require("query-overpass");
const settings = require('../../common/settings');
const validator = require('fluent-validator');
const util = require('util');
let setup = settings();

let maxQueryCount = 0;


function generateQuery(searchObject, fspType) {

    return new Promise(function (fulfill, reject) {

        //[out:json];node[place="city"];out;
        let latitude = searchObject.lat;
        let longitude = searchObject.long;
        let radius = searchObject.radius;

        let searchTerm = '';
        if (searchObject.search) {
            //searchTerm = util.format('~"%s"', searchObject.search);
            searchTerm = util.format('~"%s", i', searchObject.search); //i stands for case insensitive
        }

        let query = "";

        //querying for Fenced data
        //query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"]["name"%s](area););out 10;';

        switch (Number(fspType)) {
            case setup.FspCategory.Save:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|microfinance_bank|microfinance|sacco"]["name"%s];);out 20;';
                break;
            case setup.FspCategory.Borrow:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|credit_institution|microfinance_bank|microfinance|sacco"]["name"%s];);out 20;';
                break;
            case setup.FspCategory.Withdraw:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|microfinance_bank|microfinance|sacco|money_transfter"]["name"%s];);out 20;';
                break;
            case setup.FspCategory.Send:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|microfinance_bank|microfinance|money_transfter"]["name"%s];);out 20;';
                break;
            case setup.FspCategory.Search:
                query = '[out:json][timeout:25];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"]["name"%s];);out 10;';
                break;
            case NaN: //if string value is passed, Number("someString") will return NaN
            default:
                query = "";
                break;
        }

        if (query === "")
            return reject(new Error(setup.emptyQueryMessage));

        query = util.format(query, radius, latitude, longitude, searchTerm);

        return fulfill(query);

    });

}

function processOverpassResult(geoJsonData, search_radius) {

    let data = [];

    let featuresCollection = geoJsonData["features"];

    for (let i = 0; i < featuresCollection.length; i++) {

        let id = featuresCollection[i]["properties"].id;
        let tags = featuresCollection[i]["properties"]["tags"];
        let coordinates = featuresCollection[i]["geometry"].coordinates;

        tags.id = id;
        tags.radius = search_radius;
        tags.coordinates = coordinates;


        data.push(tags);
    }

    return data;
}

let coreProcessor = function () {

    return {

        dataValidator: function (queryObject) {

            return new Promise(function (fulfill, reject) {
                let validation = validator()
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

        //Process the request sent from the client
        process_request: function (searchObject, fspType, next, res, client_radius) {

            generateQuery(searchObject, fspType).then(function (query) {

                maxQueryCount++;
                //Send query to Overpass API
                queryOverpass(query, function (err, geojson) {
                    if (err) {

                        if (err.statusCode === setup.http_status && maxQueryCount < setup.max_request_count) {
                            console.log('error and retry: ' + err.statusCode);
                            setTimeout(function () {
                                return coreProcessor().process_request(searchObject, fspType, next, res, client_radius);
                            }, setup.retry_time);
                            return;
                        } else {
                            maxQueryCount = 0;
                            return next(err);
                        }
                    }

                    let newRadius = client_radius * maxQueryCount;//Add the current plus what the client sent

                    //Process returned data
                    let processedGeoJson = processOverpassResult(geojson, newRadius);

                    if (processedGeoJson.length === 0 && maxQueryCount < setup.max_request_count) {

                        searchObject.radius = newRadius;

                        console.log('Recursion: ' + maxQueryCount);

                        coreProcessor().process_request(searchObject, fspType, next, res, client_radius);
                    } else {
                        maxQueryCount = 0;
                        res.send(processedGeoJson);
                    }

                });
            }).catch(next);

        }
    }

};

module.exports = coreProcessor;



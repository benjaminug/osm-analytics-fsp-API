/**
 * Created by Morgan on 4/21/2017.
 */

var util = require('util');

module.exports = {

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
    processGeojsonData: function (geojsonData) {

        var data = [];

        var featuresCollection = geojsonData["features"];

        for (var i = 0; i < featuresCollection.length; i++) {

            var id = featuresCollection[i]["properties"].id;
            var tags = featuresCollection[i]["properties"]["tags"];
            var coordinates = featuresCollection[i]["geometry"].coordinates;

            tags.id = id;
            tags.coordinates = coordinates;

            data.push(tags);
        }

        return data;

    }
};




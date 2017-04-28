/**
 * Created by Morgan on 4/28/2017.
 */

var util = require('util');

module.exports = {

    generateSaveQuery: function (saveObject) {
        //do something
        var latitude = saveObject.lat;
        var longitude = saveObject.long;
        var radius = saveObject.radius;
        var searchterm = util.format('~"%s"', saveObject.search);

        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|credit_institution|microfinance_bank|microfinance|sacco"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, searchterm);

        return query;
    }
};
/**
 * Created by Morgan on 4/28/2017.
 */


var util = require('util');

module.exports = {

    generateSendQuery: function (sendObject) {
        //do something
        var latitude = sendObject.lat;
        var longitude = sendObject.long;
        var radius = sendObject.radius;
        var searchterm = util.format('~"%s"', sendObject.search);

        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|credit_institution|microfinance_bank|microfinance|money_transfter|post_office"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, searchterm);

        return query;
    }
};

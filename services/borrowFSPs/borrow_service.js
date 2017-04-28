/**
 * Created by Morgan on 4/28/2017.
 */


var util = require('util');

module.exports = {

    generateBorrowQuery: function (borrowObject) {
        //do something

        var latitude = borrowObject.lat;
        var longitude = borrowObject.long;
        var radius = borrowObject.radius;
        var borrowterm = util.format('~"%s"', borrowObject.search);

        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|credit_institution|microfinance_bank|microfinance|sacco"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, borrowterm);

        return query;
    }
};


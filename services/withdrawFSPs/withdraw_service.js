/**
 * Created by Morgan on 4/28/2017.
 */


var util = require('util');

module.exports = {

    generateWithdrawQuery: function (withdrawObject) {
        //do something

        var latitude = withdrawObject.lat;
        var longitude = withdrawObject.long;
        var radius = withdrawObject.radius;
        var searchterm = util.format('~"%s"', withdrawObject.search);

        var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:%s,%s,%s)["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|money_transfter"]["name"%s](area););out;';

        query = util.format(query, radius, latitude, longitude, searchterm);

        return query;
    }
};


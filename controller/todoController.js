/**
 * Created by Morgan on 4/12/2017.
 */

//////Working version
//const express = require('express');
//const router = express.Router();
//
//
////Get a list of all Items based on location coordinates
//router.get('/', function (req, res, next) {
//
//    res.send({name:"morgan"});
//
//});
//
//module.exports = router;

/////End of working version

var queryOverpass = require("query-overpass");

module.exports = {
    getMovie: function (req, res) {
        //do something
        res.send({name: "morgan, Get"});
    },
    getMovies: function (req, res, next) {

        var query = '[out:json][timeout:25];area[name="Uganda"];(node[place="city"](area););out;';

        var req = queryOverpass(query, function (err, geojson) {
            if (err) {
                next(err);
            }
            res.send(geojson);
        });

    },
    postMovie: function (req, res) {
        //do something
        res.send({name: "morgan, Post"});
    },
    getCities: function (req, res, next) {
        //do something
        var query = '[out:json][timeout:25];area[name="Uganda"];(node[place="city"](area););out;';

        var req = queryOverpass(query, function (err, geojson) {
            if (err) {
                next(err);
            }
            res.send(geojson);
        });
    },
    getBanks: function (req, res, next) {
        //do something

        //var query = '[out:json][timeout:25];area[name="Uganda"];(node["amenity"~"bank|banking_agent|mobile_money_agent|atm|credit_institution|microfinance_bank|microfinance|sacco|bureau_de_change|money_transfter|post_office"](area););out;';
        //var query = '[out:json][timeout:25];area[name="Uganda"];(node["amenity"="mobile_money_agent"]["name"%s](area););out;';
        //var query = '[out:json][timeout:25];area[name="Uganda"];(node(around:1000,0.283277,32.575289)["amenity"~"bank|banking_agent|mobile_money_agent|atm"][atm="yes"]["name"%s](area););out;';
        //var query = '[out:json][timeout:25];(node(around:10000,0.283277,32.575289)["amenity"~"bank|banking_agent|mobile_money_agent|atm"][atm="yes"]["name"%s];);out;';
        //var query = '[out:json][timeout:25];area[name="Uganda"];node(around:4500,0.283277,32.575289)["amenity"~"bank|banking_agent|mobile_money_agent|atm"]["name"%s];out;out count;';


        //var query = '[out:json][timeout:25];area[name="Uganda"];(node["amenity"="bank"](area);way["amenity"="bank"](area);relation["amenity"="bank"](area););out;';
        //var query = '[out:json][timeout:25];area[name="Uganda"];(node["amenity"="mobile_money_agent"](area););out;';
        var query = '[out:json][timeout:25];area[name="Uganda"];(node["amenity"="credit_institution"](area););out;';

        var req = queryOverpass(query, function (err, geojson) {
            if (err) {
                next(err);
            }
            res.send(geojson);
        });
    }
};

//way["amenity"="bank"](area);
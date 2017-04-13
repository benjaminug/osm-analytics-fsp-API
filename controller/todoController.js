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


var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
    getMovie: function (req, res) {
        //do something
        res.send({name: "morgan, Get"});
    },
    getMovies: function (req, res) {
        //do something
        //res.send({name:"morgan, Get"});

        //var query = '[out:json][timeout:25];area[name="Uganda"];(node[place="city"](area););out';
        var query = 'http://overpass-api.de/api/interpreter?data=[out:json];area[name="Uganda"];(node[place="city"](area););out;';


        client.get(query, function (data, response) {
            // parsed response body as js object
            console.log(data);
            res.send({name: data});
            // raw response
            console.log(response);
        });

    },
    postMovie: function (req, res) {
        //do something
        res.send({name: "morgan, Post"});
    }
};


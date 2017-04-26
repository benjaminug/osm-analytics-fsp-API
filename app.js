/**
 * Created by Morgan on 4/12/2017.
 */

const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const _apicache = require('apicache');


//Set up express app
const app = express();

////Connect to mongo db
//mongoose.connect('mongodb://localhost/Hot_Realtime_FSL_Api');
//mongoose.Promise = global.Promise;

//Parse the body to Json or any other format
app.use(bodyParser.json());

//Cache setup
var _apicache2 = _interopRequireDefault(_apicache);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
var cache = _apicache2.default.middleware;

app.use(cache('5 minutes'));//https://github.com/kwhitley/apicache

//Initialise routes
app.use('/api', require('./controller/basecontroller'));

//Error handling middleware
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).send({error: err.message});
    //https://webapplog.com/error-handling-and-running-an-express-js-app/
});

//Listen for request
app.listen(process.env.port || 3000, function () {
    console.log('Now listening to requests...');
});




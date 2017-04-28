var express = require('express');
const bodyParser = require('body-parser');

//Set up express app
var app = express();

var db = require('./db');

//Parse the body to Json or any other format
app.use(bodyParser.json());

var cache = require('./apicache');

//app.use(cache('5 minutes'));

module.exports = app;
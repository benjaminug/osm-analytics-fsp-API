'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Set up express app
let app = express();

const swaggerSpec = require('./swagger');


// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


const db = require('./db');

//Parse the body to Json or any other format
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));
//
// var cache = require('./apicache');
//
// app.use(cache('5 minutes'));


module.exports = app;
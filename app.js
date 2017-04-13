/**
 * Created by Morgan on 4/12/2017.
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Set up express app
const app = express();

//Connect to mongo db
mongoose.connect('mongodb://localhost/Hot_Realtime_FSL_Api');
mongoose.Promise = global.Promise;

//Parse the body to Json or any other format
app.use(bodyParser.json());


//Initialise routes
//app.use('/api',require('./routes/api'));
app.use('/api', require('./controller/basecontroller'));

//Error handling middleware
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(422).send({error: err.message});
});

//Listen for request
app.listen(process.env.port || 3000, function () {
    console.log('Now listening to requests...');
});




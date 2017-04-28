/**
 * Created by Morgan on 4/26/2017.
 */

//Connect to mongo db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hot_Realtime_FSL_Api');
mongoose.Promise = global.Promise;

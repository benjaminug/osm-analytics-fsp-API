/**
 * Created by Morgan on 4/26/2017.
 */

//Connect to mongo db
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/Hot_Realtime_FSL_Api');
mongoose.connect('mongodb://hot_api_test_user:hot_api_test_2017@ds123311.mlab.com:23311/hot_api_test');//Passowrd: hot_api_test_2017 Username: hot_api_test_user
mongoose.Promise = global.Promise;


//mongodb://<hot_api_test_user>:<hot_api_test_2017>@ds123311.mlab.com:23311/hot_api_test
//https://www.youtube.com/watch?v=5HYMjwgusoM
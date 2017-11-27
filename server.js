'use strict'
let app = require('./app_start/app');

//Initialise routes
app.use('/api', require('./controller/basecontroller'));

//Error handling middleware
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).send({error: err.message});
    //https://webapplog.com/error-handling-and-running-an-express-js-app/
});


let port = process.env.PORT || 3000;

//Listen for request
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

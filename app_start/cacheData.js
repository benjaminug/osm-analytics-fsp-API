'use strict';

const mcache = require('memory-cache');
const settings = require('../common/settings');
let setup = settings();

//Duration in Minutes
module.exports = function (duration) {

    return function (req, res, next) {

        let searchObject = setup.generateSearchObject(req);

        console.log('Original request: ' + req.originalUrl || req.url);

        let key = '__express__' + JSON.stringify(searchObject);
        let cachedBody = mcache.get(key);
        if (cachedBody) {
            console.log('key ALREADY exists: ' + key);
            res.send(cachedBody);
        } else {
            res.sendResponse = res.send;
            res.send = function (body) {
                mcache.put(key, body, duration * 60000); //60000 Milliseconds = 1 Minute so we convert the minutes back to milliseconds
                res.sendResponse(body);
            };
            console.log('key DOES NOT exist: ' + key);
            next();
        }
    };

};
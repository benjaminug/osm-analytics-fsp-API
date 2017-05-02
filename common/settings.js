/**
 * Created by Morgan on 4/28/2017.
 */

module.exports = {
    max_request_count: 5,
    http_status: 429, //This means to many requests have been sent to the server
    retry_time: 3000 //Try again after 3 seconds
};


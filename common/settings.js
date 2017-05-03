/**
 * Created by Morgan on 4/28/2017.
 */

module.exports = {
    max_request_count: 5,
    http_status: 429, //This means to many requests have been sent to the server
    retry_time: 3000, //Try again after 3 seconds
    FspCategory: {  //https://stijndewitt.com/2014/01/26/enums-in-javascript/
        Save: 1,
        Borrow: 2,
        Withdraw: 3,
        Send: 4,
        Search: 5,
        properties: {
            1: {name: "Save", value: 1},
            2: {name: "Borrow", value: 2},
            3: {name: "Withdraw", value: 3},
            4: {name: "Send", value: 4},
            5: {name: "Search", value: 5}
        }  //http://patelshailesh.com/index.php/how-to-define-enum-in-javascript
    },
    emptyQueryMessage: "Overpass query can not be empty."
};


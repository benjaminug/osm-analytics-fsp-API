module.exports = function () {

    return {

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
        emptyQueryMessage: "Overpass query can not be empty.",
        cacheDuration: 1,//values expressed in minutes
        generateSearchObject: function (req) {
            let searchObj = null;
            let route = null;

            if (req.params.withdraw) {
                searchObj = req.params.withdraw;
                route = 'withdraw';
            }
            if (req.params.send) {
                searchObj = req.params.send;
                route = 'send';
            }
            if (req.params.borrow) {
                searchObj = req.params.borrow;
                route = 'borrow';
            }
            if (req.params.save) {
                searchObj = req.params.save;
                route = 'save';
            }
            if (req.params.finance) {
                searchObj = req.params.finance;
                route = 'finance';
            }

            let searchObject = JSON.parse(searchObj);//parse data to Json

            let lat = searchObject.lat.toString();
            let long = searchObject.long.toString();

            searchObject['lat'] = lat.substring(0, lat.indexOf('.') + 4);//Using the substring to get only 3 digits after the .
            searchObject['long'] = long.substring(0, long.indexOf('.') + 4);
            searchObject['route'] = route;

            return searchObject;
        }

    }
};


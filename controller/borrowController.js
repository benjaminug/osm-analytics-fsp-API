/**
 * Created by Morgan on 4/28/2017.
 */

var queryOverpass = require("query-overpass");
const borrowService = require('../services/borrowFSPs/borrow_service');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');

module.exports = {

    getBorrow_Data: function (req, res, next) {
        var borrowObject = JSON.parse(req.params.borrow);//parse data to Json

        //Validate the search data object
        var ValidationErrors = _geoJsonHelperService.dataValidator(borrowObject);
        if (ValidationErrors) {
            return next(new Error(ValidationErrors));
        }

        //Build the search query
        var query = borrowService.generateBorrowQuery(borrowObject);

        //Send query to Overpass API
        queryOverpass(query, function (err, geojson) {
            if (err) {
                return next(err);
            }

            //Process returned data
            var processedGeojson = _geoJsonHelperService.processGeojsonData(geojson);

            res.send(processedGeojson);
        });
    }
};

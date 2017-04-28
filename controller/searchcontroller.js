/**
 * Created by Morgan on 4/21/2017.
 */


var queryOverpass = require("query-overpass");
const searchService = require('../services/mobile_search_service/searchservice');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');

module.exports = {

    getFinancial_Data: function (req, res, next) {
        var searchObject = JSON.parse(req.params.search);//parse data to Json

        //Validate the search data object
        var ValidationErrors = _geoJsonHelperService.dataValidator(searchObject);

        if (ValidationErrors) {
            return next(new Error(ValidationErrors));
        }

        //Build the search query
        var query = searchService.generateSearchQuery(searchObject);

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



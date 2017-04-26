/**
 * Created by Morgan on 4/21/2017.
 */


var queryOverpass = require("query-overpass");
const searchDataValidator = require('../services/mobile_search_service/search_data_validation');
const searchService = require('../services/mobile_search_service/searchservice');

module.exports = {

    getBanks: function (req, res, next) {
        var searchObject = JSON.parse(req.params.search);//parse data to Json

        //Validate the search data object
        var ValidationErrors = searchDataValidator.searchDataValidator(searchObject);
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
            var processedGeojson = searchService.processGeojsonData(geojson);

            res.send(processedGeojson);
        });
    }
};



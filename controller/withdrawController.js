/**
 * Created by Morgan on 4/28/2017.
 */


var queryOverpass = require("query-overpass");
const withdrawService = require('../services/withdrawFSPs/withdraw_service');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');

module.exports = {

    getWithdraw_Data: function (req, res, next) {
        var withdrawObject = JSON.parse(req.params.withdraw);//parse data to Json

        //Validate the search data object
        var ValidationErrors = _geoJsonHelperService.dataValidator(withdrawObject);
        if (ValidationErrors) {
            return next(new Error(ValidationErrors));
        }

        //Build the search query
        var query = withdrawService.generateWithdrawQuery(withdrawObject);

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

/**
 * Created by Morgan on 4/28/2017.
 */

var queryOverpass = require("query-overpass");
const sendService = require('../services/sendFSPs/send_service');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');

module.exports = {

    getSend_Data: function (req, res, next) {
        var sendObject = JSON.parse(req.params.send);//parse data to Json

        //Validate the search data object
        var ValidationErrors = _geoJsonHelperService.dataValidator(sendObject);
        if (ValidationErrors) {
            return next(new Error(ValidationErrors));
        }

        //Build the search query
        var query = sendService.generateSendQuery(sendObject);

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

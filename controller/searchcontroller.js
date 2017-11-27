/**
 * Created by Morgan on 4/21/2017.
 */



const searchService = require('../services/mobile_search_service/searchservice');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');


module.exports = {

    getFinancial_Data: function (req, res, next) {
        var searchObject = JSON.parse(req.params.search);//parse data to Json

        //Validate the search data object
        _geoJsonHelperService.dataValidator(searchObject).then(function () {
            var client_radius = Number(searchObject.radius);
            searchService.processGeneralSearchRequest(searchObject, next, res, client_radius);

        }).catch(next);
    }
};




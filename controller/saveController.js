/**
 * Created by Morgan on 4/28/2017.
 */

const saveService = require('../services/saveFSPs/save_service');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');

module.exports = {

    getSave_Data: function (req, res, next) {
        var saveObject = JSON.parse(req.params.save);//parse data to Json

        //Validate the search data object
        var ValidationErrors = _geoJsonHelperService.dataValidator(saveObject);
        if (ValidationErrors) {
            return next(new Error(ValidationErrors));
        }

        var client_radius = Number(saveObject.radius);
        saveService.processSaveRequest(saveObject, next, res, client_radius);


    }
};

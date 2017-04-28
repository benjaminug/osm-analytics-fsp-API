/**
 * Created by Morgan on 4/28/2017.
 */

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

        var client_radius = Number(withdrawObject.radius);
        withdrawService.processWithdrawRequest(withdrawObject, next, res, client_radius);

    }
};

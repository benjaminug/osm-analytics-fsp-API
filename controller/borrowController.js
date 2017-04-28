/**
 * Created by Morgan on 4/28/2017.
 */

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


        var client_radius = Number(borrowObject.radius);
        borrowService.processBorrowRequest(borrowObject, next, res, client_radius);

    }
};

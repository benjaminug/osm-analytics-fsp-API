/**
 * Created by Morgan on 4/28/2017.
 */

const _geoJsonHelperService = require('../../services/overpass_jsonresult_helper/Geojson_helper_service');
const settings = require('../../common/settings');

module.exports = {

    processSaveRequest: function (searchObject, next, res, client_radius) {

        var queryType = settings.FspCategory.Save;

        _geoJsonHelperService.process_request(searchObject, queryType, next, res, client_radius);

    }
};
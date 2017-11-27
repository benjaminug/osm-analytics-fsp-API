/**
 * Created by Morgan on 4/28/2017.
 */

const sendService = require('../services/sendFSPs/send_service');
const _geoJsonHelperService = require('../services/overpass_jsonresult_helper/Geojson_helper_service');

module.exports = {

    getSend_Data: function (req, res, next) {
        var sendObject = JSON.parse(req.params.send);//parse data to Json

        //Validate the search data object
        _geoJsonHelperService.dataValidator(sendObject).then(function () {
            var client_radius = Number(sendObject.radius);
            sendService.processSendRequest(sendObject, next, res, client_radius);

        }).catch(next);

    }
};

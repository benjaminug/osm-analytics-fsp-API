
const sendService = require('../services/sendFSPs/sendService');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
const processor = geoJsonHelperService.coreProcessor();

module.exports = {

    getSend_Data: function (req, res, next) {
        let sendObject = JSON.parse(req.params.send);//parse data to Json

        //Validate the search data object
        processor.dataValidator(sendObject).then(function () {
            let client_radius = Number(sendObject.radius);
            sendService.processSendRequest(sendObject, next, res, client_radius);

        }).catch(next);

    }
};

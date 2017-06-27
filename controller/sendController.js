
const sendService = require('../services/sendFSPs/sendService');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
let processor = geoJsonHelperService();
let send = sendService();

module.exports = {

    getSend_Data: function (req, res, next) {
        let sendObject = JSON.parse(req.params.send);//parse data to Json

        //Validate the search data object
        processor.dataValidator(sendObject).then(function () {
            let client_radius = Number(sendObject.radius);
            send.processSendRequest(sendObject, next, res, client_radius);

        }).catch(next);

    }
};

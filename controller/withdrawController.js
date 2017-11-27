
const withdrawService = require('../services/withdrawFSPs/withdrawService');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
const processor = geoJsonHelperService();

let withdrawServiceClass = withdrawService();

module.exports = {

    getWithdraw_Data: function (req, res, next) {
        /*parse data to Json */
        let withdrawObject = JSON.parse(req.params.withdraw);

        /*Validate the search data object*/

        processor.dataValidator(withdrawObject).then(function () {
            let client_radius = Number(withdrawObject.radius);
            withdrawServiceClass.processWithdrawRequest(withdrawObject, next, res, client_radius);

        }).catch(next);

    }
};

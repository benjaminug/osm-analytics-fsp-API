
const geoJsonHelperService = require('../coreProcessor/GeojsonHelperService');
const settings = require('../../common/settings');
const processor = geoJsonHelperService.coreProcessor();
const setup = settings();

module.exports = {

    processSendRequest: function (searchObject, next, res, client_radius) {
        let queryType = setup.FspCategory.Send;

        processor.process_request(searchObject, queryType, next, res, client_radius);

    }
};

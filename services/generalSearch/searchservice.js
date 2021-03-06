
const geoJsonHelperService = require('../coreProcessor/GeojsonHelperService');
const settings = require('../../common/settings');
const processor = geoJsonHelperService();
const setup = settings();

module.exports = function (){

    return{
        processGeneralSearchRequest: function (searchObject, next, res, client_radius) {

            let queryType = setup.FspCategory.Search;

            processor.process_request(searchObject, queryType, next, res, client_radius);
        }
    }

};




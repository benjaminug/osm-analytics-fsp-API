
const geoJsonHelperService = require('../coreProcessor/GeojsonHelperService');
const settings = require('../../common/settings');
const processor = geoJsonHelperService();
const setup = settings();

module.exports = function (){

    return{
        processBorrowRequest: function (searchObject, next, res) {

            let queryType = setup.FspCategory.Borrow;
            let client_radius = Number(searchObject.radius);

            processor.process_request(searchObject, queryType, next, res, client_radius);

        }
    }

};
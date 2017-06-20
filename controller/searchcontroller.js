
const searchService = require('../services/generalSearch/searchservice');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
const processor = geoJsonHelperService.coreProcessor();


module.exports = {

    getFinancial_Data: function (req, res, next) {
        const searchObject = JSON.parse(req.params.search);//parse data to Json

        //Validate the search data object
        processor.dataValidator(searchObject).then(function () {
            const client_radius = Number(searchObject.radius);
            searchService.processGeneralSearchRequest(searchObject, next, res, client_radius);

        }).catch(next);
    }
};




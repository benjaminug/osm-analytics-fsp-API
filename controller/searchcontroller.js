
const searchService = require('../services/generalSearch/searchservice');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
const processor = geoJsonHelperService();
let searchClass = searchService();


module.exports = {

    getFinancial_Data: function (req, res, next) {
        const searchObject = JSON.parse(req.params.search);//parse data to Json

        //Validate the search data object
        processor.dataValidator(searchObject).then(function () {
            const client_radius = Number(searchObject.radius);
            searchClass.processGeneralSearchRequest(searchObject, next, res, client_radius);

        }).catch(next);
    }
};




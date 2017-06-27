
const saveService = require('../services/saveFSPs/saveService');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
let processor = geoJsonHelperService();
let save = saveService();

module.exports = {

    getSave_Data: function (req, res, next) {
        let saveObject = JSON.parse(req.params.save);//parse data to Json

        //Validate the search data object
        processor.dataValidator(saveObject).then(function () {
            let client_radius = Number(saveObject.radius);
            save.processSaveRequest(saveObject, next, res, client_radius);

        }).catch(next);

    }
};

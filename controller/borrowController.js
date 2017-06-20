
const borrowService = require('../services/borrowFSPs/borrowService');
const geoJsonHelperService = require('../services/coreProcessor/GeojsonHelperService');
let processor = geoJsonHelperService.coreProcessor();

module.exports = {

    getBorrow_Data: function (req, res, next) {
        const borrowObject = JSON.parse(req.params.borrow);//parse data to Json

        //Validate the search data object
        processor.dataValidator(borrowObject).then(function () {

            borrowService.processBorrowRequest(borrowObject, next, res);

        }).catch(next);
    }
};

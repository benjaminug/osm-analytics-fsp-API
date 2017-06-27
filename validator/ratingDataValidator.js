
const validator = require('fluent-validator');
module.exports = function (){

    return{
        ratingDataValidator: function (ratingObject) {

            return new Promise(function (fulfill, reject) {
                let validation = validator()
                    .validate(ratingObject).isNotEmpty("Rating object can not be null or empty")
                    .validate(ratingObject.rating).isNumeric().and.isNotEmpty('Rate value can not be empty');

                if (validation.hasErrors()) {

                    reject(new Error(JSON.stringify(validation.getErrors())));
                } else {
                    fulfill();
                }
            });

        }
    }
};


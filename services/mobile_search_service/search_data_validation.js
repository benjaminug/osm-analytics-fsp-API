/**
 * Created by Morgan on 4/25/2017.
 */

//https://www.youtube.com/watch?v=QqiNn3GfTMc
var validator = require('fluent-validator');


exports.searchDataValidator = function (searchObject) {

    var validation = validator()
        .validate(searchObject.search).isNotEmpty("Search query is can not be null or empty")
        .validate(searchObject.long).isFloat('Longitude must be a number').and.isNumeric('Longitude must be a number').or.isNotEmpty('Longitude can not be null or empty')
        .validate(searchObject.lat).isFloat('Latitude must be a number').and.isNumeric('Latitude must be a number').or.isNotEmpty('Latitude can not be empty')
        .validate(searchObject.radius).isInt('Radius must be a number').and.isNumeric('Radius must be a number').and.isPositive('Radius must be positive').or.isNotEmpty('Radius can not be empty');

    if (validation.hasErrors()) {
        console.log('Has errors');
        return JSON.stringify(validation.getErrors());
    }

    console.log('Has no errors');
};





















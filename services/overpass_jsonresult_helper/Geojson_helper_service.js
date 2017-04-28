/**
 * Created by Morgan on 4/28/2017.
 */
var validator = require('fluent-validator');

module.exports = {

    processGeojsonData: function (geojsonData, search_radius) {

        var data = [];

        var featuresCollection = geojsonData["features"];

        for (var i = 0; i < featuresCollection.length; i++) {

            var id = featuresCollection[i]["properties"].id;
            var tags = featuresCollection[i]["properties"]["tags"];
            var coordinates = featuresCollection[i]["geometry"].coordinates;

            tags.id = id;
            tags.radius = search_radius;
            tags.coordinates = coordinates;


            data.push(tags);
        }

        return data;

    },
    dataValidator: function (queryObject) {

        var validation = validator()
            .validate(queryObject.search).isNotEmpty("Search query is can not be null or empty")
            .validate(queryObject.long).isFloat('Longitude must be a number').and.isNumeric('Longitude must be a number').or.isNotEmpty('Longitude can not be null or empty')
            .validate(queryObject.lat).isFloat('Latitude must be a number').and.isNumeric('Latitude must be a number').or.isNotEmpty('Latitude can not be empty')
            .validate(queryObject.radius).isInt('Radius must be a number').and.isNumeric('Radius must be a number').and.isPositive('Radius must be positive').or.isNotEmpty('Radius can not be empty');

        if (validation.hasErrors()) {
            console.log('Has errors');
            return JSON.stringify(validation.getErrors());
        }

        console.log('Has no errors');
    }
};








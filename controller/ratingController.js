/**
 * Created by Morgan on 5/4/2017.
 */

var Rating = require('../models/rating');
var validation = require('../validator/rating_data_validator');


module.exports = {
    postRating: function (req, res, next) {

        ////Validate the rating data object
        //validation.ratingDataValidator(req.body).then(function () {

        Rating.create(req.body).then(function (data) {
            res.json(data);
        }).catch(next);

        // }).catch(next);

    }

}

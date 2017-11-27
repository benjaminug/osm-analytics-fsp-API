/**
 * Created by Morgan on 5/4/2017.
 */

const Rating = require('../models/rating');
const validationService = require('../validator/ratingDataValidator');
let validation = validationService();


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

/**
 * Created by Morgan on 5/4/2017.
 */

var mongoose = require('mongoose');
var RatingSchema = new mongoose.Schema({
    fspId: {
        type: Number,
        required: [true, 'fspId is required']
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
        min: [0, 'Minimum rating is zero'],
        max: [5, 'Maximum rating is five'],
        required: [true, 'Rating is required']
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    is_Active: {
        type: Boolean,
        default: true
    }
});

mongoose.model('Rating', RatingSchema);

module.exports = mongoose.model('Rating');

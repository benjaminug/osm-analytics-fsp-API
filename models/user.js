/**
 * Created by Morgan on 4/26/2017.
 */

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
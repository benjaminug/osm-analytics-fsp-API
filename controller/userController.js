/**
 * Created by Morgan on 4/26/2017.
 */

var User = require('../models/user');

module.exports = {

    getUsers: function (req, res, next) {
        //do something
        User.find({}).then(function (data) {
            res.render(data);
        }).catch(next);

        //User.find(callback).limit(10);
    },

    postUser: function (req, res, next) {
        //do something
        User.create(req.body).then(function (data) {
            res.json(data);
        }).catch(next);
    },

    getUser: function (req, res, next) {
        //do something
        User.findById({_id: req.params._id}).then(function (data) {
            res.json(data);
        }).catch(next);
    },

    updateUser: function (req, res, next) {
        //do something

        var data = req.body;

        var update = {
            name: data.name,
            email: data.email,
            password: data.password
        };

        User.findByIdAndUpdate({_id: req.params._id}, update, {}).then(function (data) {
            res.json(data);
        }).catch(next);
    },

    deleteUser: function (req, res, next) {
        //do something
        User.findByIdAndRemove({_id: req.params._id}).then(function (data) {
            res.json(data);
        }).catch(next);
    }


};

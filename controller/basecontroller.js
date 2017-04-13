/**
 * Created by Morgan on 4/12/2017.
 */
const express = require('express');
const router = express.Router();
var todoList = require('../controller/todoController');
//
//////const todRout = todoList(router);
////
//////Get a list of all Items based on location coordinates
////router.get('/ninjas', function (req, res, next) {
////
////    res.send({name:"morgan"});
////});
////
//
//module.exports = todoList;

router.route('/ninjas/:id').get(todoList.getMovie);
router.route('/ninjas').post(todoList.postMovie);
router.route('/ninjas').get(todoList.getMovies);
router.route('/ninjas').put(todoList.getMovies);

module.exports = router;




/**
 * Created by Morgan on 4/12/2017.
 */
const express = require('express');
const router = express.Router();
var todoList = require('../controller/todoController');
var searchcrtl = require('../controller/searchcontroller');


router.route('/ninjas/:id').get(todoList.getMovie);
router.route('/ninjas').post(todoList.postMovie);
router.route('/ninjas').get(todoList.getMovies);
router.route('/ninjas').put(todoList.getMovies);


router.route('/overpass/finance/:search').get(searchcrtl.getBanks);

module.exports = router;




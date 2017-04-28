/**
 * Created by Morgan on 4/12/2017.
 */
const express = require('express');
const router = express.Router();
var todoList = require('../controller/todoController');
var searchController = require('../controller/searchcontroller');
var userController = require('../controller/userController');
const borrowController = require('../controller/borrowController');
const saveController = require('../controller/saveController');
const sendController = require('../controller/sendController');
const withdrawController = require('../controller/withdrawController');


router.route('/ninjas/:id').get(todoList.getMovie);
router.route('/ninjas').post(todoList.postMovie);
router.route('/ninjas').get(todoList.getMovies);
router.route('/ninjas').put(todoList.getMovies);

//Home route
router.route('/').get(function (req, res) {
    res.send('<b>Hot Realtime Financial Service location</b>');
});


router.route('/overpass/finance/:search').get(searchController.getFinancial_Data);
router.route('/overpass/borrow/:borrow').get(borrowController.getBorrow_Data);
router.route('/overpass/save/:save').get(saveController.getSave_Data);
router.route('/overpass/send/:send').get(sendController.getSend_Data);
router.route('/overpass/withdraw/:withdraw').get(withdrawController.getWithdraw_Data);

//Users crude operation routes
router.route('/user')
    .get(userController.getUsers)
    .post(userController.postUser);
router.route('/user/:_id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;




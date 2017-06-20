
const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchcontroller');
const userController = require('../controller/userController');
const borrowController = require('../controller/borrowController');
const saveController = require('../controller/saveController');
const sendController = require('../controller/sendController');
const withdrawController = require('../controller/withdrawController');
const ratingController = require('../controller/ratingController');


//Home route
router.route('/').get(function (req, res) {
    res.send('<b>Hot Real time Financial Service location</b>');
});


//----------------Models----------------

/**
 * @swagger
 * definition:
 *   Search:
 *     properties:
 *       search:
 *         type: string
 *       lat:
 *         type: number
 *       long:
 *         type: number
 *       radius:
 *         type: number
 */


/**
 * @swagger
 * definition:
 *   Rating:
 *     properties:
 *       rating:
 *         type: number
 *       description:
 *         type: string
 *       fspId:
 *         type: number
 */


//-----------------End of Models----------------


/**
 * @swagger
 * /api/overpass/finance/{search}:
 *   get:
 *     tags:
 *       - General Search
 *     description: Makes the general search for all financial service providers  (FSPs)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: search term
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of financial service providers
 *         schema:
 *           $ref: '#/definitions/Search'
 *       429:
 *         description: Sending too many requests to overpass api from the same IP generates a 429 error
 */
router.route('/overpass/finance/:search').get(searchController.getFinancial_Data);

/**
 * @swagger
 * /api/overpass/borrow/{search}:
 *   get:
 *     tags:
 *       - Borrow
 *     description: Searches for all financial service providers that provide borrowing services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: borrow
 *         description: search term
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of financial service providers that provide borrowing services
 *         schema:
 *           $ref: '#/definitions/Search'
 *       429:
 *         description: Sending too many requests to overpass api from the same IP generates a 429 error
 */
router.route('/overpass/borrow/:borrow').get(borrowController.getBorrow_Data);

/**
 * @swagger
 * /api/overpass/save/{search}:
 *   get:
 *     tags:
 *       - Save
 *     description: Searches for all financial service providers that provide saving services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: save
 *         description: search term
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of financial service providers that provide saving services
 *         schema:
 *           $ref: '#/definitions/Search'
 *       429:
 *         description: Sending too many requests to overpass api from the same IP generates a 429 error
 */
router.route('/overpass/save/:save').get(saveController.getSave_Data);

/**
 * @swagger
 * /api/overpass/send/{search}:
 *   get:
 *     tags:
 *       - Send
 *     description: Searches for all financial service providers that provide money transfer services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: send
 *         description: search term
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of financial service providers that provide money transfer services
 *         schema:
 *           $ref: '#/definitions/Search'
 *       429:
 *         description: Sending too many requests to overpass api from the same IP generates a 429 error
 */
router.route('/overpass/send/:send').get(sendController.getSend_Data);

/**
 * @swagger
 * /api/overpass/withdraw/{search}:
 *   get:
 *     tags:
 *       - Money Withdraw
 *     description: Searches for all financial service providers that provide money withdraw services
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: withdraw
 *         description: search term
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of financial service providers that provide money withdraw services
 *         schema:
 *           $ref: '#/definitions/Search'
 *       429:
 *         description: Sending too many requests to overpass api from the same IP generates a 429 error
 */
router.route('/overpass/withdraw/:withdraw').get(withdrawController.getWithdraw_Data);

/**
 * @swagger
 * /api/rating:
 *   post:
 *     tags:
 *       - Rate
 *     description: End point for posting user service ratings
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: Rating
 *         description: New rating object to add
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Rating'
 *     responses:
 *       200:
 *         description: The new saved entity
 *         schema:
 *           $ref: '#/definitions/Rating'
 */
router.route('/rating').post(ratingController.postRating);

//Users crude operation routes
router.route('/user')
    .get(userController.getUsers)
    .post(userController.postUser);
router.route('/user/:_id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;




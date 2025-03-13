const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController')


// index
router.get('/', moviesController.index);


// show
router.get('/:id', moviesController.show);

// store new review 
router.post('/:id/reviews', moviesController.insertReview);

// esportiamo il modulo del router
module.exports = router;
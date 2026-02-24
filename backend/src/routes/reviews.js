const express = require('express');
const router = express.Router({ mergeParams: true });
const ReviewController = require('../controllers/reviewController');
const { reviewValidation } = require('../middleware/validation');

// GET  /api/movies/:slug/reviews  - get reviews for a movie
router.get('/', ReviewController.getByMovie);

// POST /api/movies/:slug/reviews  - submit a review for a movie
router.post('/', reviewValidation, ReviewController.create);

// PUT  /api/reviews/:id           - update a review (mounted separately)
// DELETE /api/reviews/:id         - delete a review (mounted separately)

module.exports = router;

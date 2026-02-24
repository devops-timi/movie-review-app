const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');
const { reviewValidation } = require('../middleware/validation');

// GET    /api/reviews/recent      - recent reviews across all movies
router.get('/recent', ReviewController.getRecent);

// PUT    /api/reviews/:id         - update a review
router.put('/:id', reviewValidation, ReviewController.update);

// DELETE /api/reviews/:id         - delete a review
router.delete('/:id', ReviewController.remove);

module.exports = router;

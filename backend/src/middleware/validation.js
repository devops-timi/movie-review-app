const { body } = require('express-validator');

const movieValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('release_year')
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage('Invalid release year'),
  body('director').trim().notEmpty().withMessage('Director is required').isLength({ max: 150 }),
  body('genre_id').isInt({ min: 1 }).withMessage('Valid genre_id is required'),
  body('duration_minutes').optional({ nullable: true }).isInt({ min: 1 }),
  body('poster_url').optional({ nullable: true }).isURL().withMessage('Invalid poster URL'),
];

const reviewValidation = [
  body('reviewer_name').trim().notEmpty().withMessage('Reviewer name is required').isLength({ max: 150 }),
  body('rating').isInt({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
  body('title').trim().notEmpty().withMessage('Review title is required').isLength({ max: 255 }),
  body('body').trim().notEmpty().withMessage('Review body is required').isLength({ min: 10 }),
];

module.exports = { movieValidation, reviewValidation };

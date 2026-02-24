const ReviewModel = require('../models/Review');
const MovieModel = require('../models/Movie');
const { validationResult } = require('express-validator');

const ReviewController = {
  async getByMovie(req, res, next) {
    try {
      const movie = await MovieModel.findBySlug(req.params.slug);
      if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

      const { page = 1, limit = 10 } = req.query;
      const data = await ReviewModel.findByMovieId(movie.id, { page: +page, limit: +limit });
      res.json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const movie = await MovieModel.findBySlug(req.params.slug);
      if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });

      const { reviewer_name, rating, title, body } = req.body;
      const review = await ReviewModel.create({ movie_id: movie.id, reviewer_name, rating, title, body });

      res.status(201).json({ success: true, review });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const review = await ReviewModel.findById(req.params.id);
      if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

      const { reviewer_name, rating, title, body } = req.body;
      const updated = await ReviewModel.update(req.params.id, { reviewer_name, rating, title, body });
      res.json({ success: true, review: updated });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const deleted = await ReviewModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Review not found' });
      res.json({ success: true, message: 'Review deleted' });
    } catch (err) {
      next(err);
    }
  },

  async getRecent(req, res, next) {
    try {
      const reviews = await ReviewModel.getRecent(req.query.limit || 5);
      res.json({ success: true, reviews });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ReviewController;

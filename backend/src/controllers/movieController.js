const slugify = require('slugify');
const MovieModel = require('../models/Movie');
const { validationResult } = require('express-validator');

const toSlug = (str) =>
  slugify(str, { lower: true, strict: true, trim: true });

const MovieController = {
  async getAll(req, res, next) {
    try {
      const { genre, year, page = 1, limit = 12 } = req.query;
      const data = await MovieModel.findAll({ genre, year, page: +page, limit: +limit });
      res.json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const movie = await MovieModel.findBySlug(req.params.slug);
      if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
      res.json({ success: true, movie });
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

      const { title, description, release_year, director, genre_id, poster_url, duration_minutes } = req.body;
      const slug = toSlug(title);

      const movie = await MovieModel.create({
        title, slug, description, release_year, director,
        genre_id, poster_url, duration_minutes,
      });

      res.status(201).json({ success: true, movie });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: 'A movie with that title already exists' });
      }
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const existing = await MovieModel.findById(req.params.id);
      if (!existing) return res.status(404).json({ success: false, message: 'Movie not found' });

      const updates = { ...req.body };
      if (updates.title) updates.slug = toSlug(updates.title);

      const movie = await MovieModel.update(req.params.id, updates);
      res.json({ success: true, movie });
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const deleted = await MovieModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Movie not found' });
      res.json({ success: true, message: 'Movie deleted' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = MovieController;

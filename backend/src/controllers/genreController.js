const GenreModel = require('../models/Genre');

const GenreController = {
  async getAll(req, res, next) {
    try {
      const genres = await GenreModel.findAll();
      res.json({ success: true, genres });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = GenreController;

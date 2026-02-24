const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genreController');

// GET /api/genres  - list all genres with movie counts
router.get('/', GenreController.getAll);

module.exports = router;

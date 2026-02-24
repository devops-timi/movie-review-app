const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');
const { movieValidation } = require('../middleware/validation');

// GET /api/movies         - list all movies (filterable, paginated)
router.get('/', MovieController.getAll);

// GET /api/movies/:slug   - single movie by slug
router.get('/:slug', MovieController.getBySlug);

// POST /api/movies        - create movie
router.post('/', movieValidation, MovieController.create);

// PUT /api/movies/:id     - update movie
router.put('/:id', movieValidation, MovieController.update);

// DELETE /api/movies/:id  - delete movie
router.delete('/:id', MovieController.remove);

module.exports = router;

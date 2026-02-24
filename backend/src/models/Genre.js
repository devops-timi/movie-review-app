const { pool } = require('../config/database');

const GenreModel = {
  async findAll() {
    const [rows] = await pool.query(
      `SELECT g.id, g.name, g.slug, COUNT(m.id) AS movie_count
       FROM genres g
       LEFT JOIN movies m ON m.genre_id = g.id
       GROUP BY g.id
       ORDER BY g.name ASC`
    );
    return rows;
  },

  async findById(id) {
    const [[genre]] = await pool.query('SELECT * FROM genres WHERE id = ?', [id]);
    return genre || null;
  },
};

module.exports = GenreModel;

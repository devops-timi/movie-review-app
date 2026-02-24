const { pool } = require('../config/database');

const ReviewModel = {
  async findByMovieId(movieId, { page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      `SELECT id, movie_id, reviewer_name, rating, title, body, created_at
       FROM reviews
       WHERE movie_id = ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [movieId, parseInt(limit, 10), offset]
    );

    const [[{ total }]] = await pool.query(
      'SELECT COUNT(*) AS total FROM reviews WHERE movie_id = ?',
      [movieId]
    );

    return { reviews: rows, total, page, limit };
  },

  async findById(id) {
    const [[review]] = await pool.query(
      `SELECT r.*, m.title AS movie_title, m.slug AS movie_slug
       FROM reviews r
       JOIN movies m ON r.movie_id = m.id
       WHERE r.id = ?`,
      [id]
    );
    return review || null;
  },

  async create({ movie_id, reviewer_name, rating, title, body }) {
    const [result] = await pool.query(
      `INSERT INTO reviews (movie_id, reviewer_name, rating, title, body)
       VALUES (?, ?, ?, ?, ?)`,
      [movie_id, reviewer_name, rating, title, body]
    );
    return this.findById(result.insertId);
  },

  async update(id, { reviewer_name, rating, title, body }) {
    await pool.query(
      `UPDATE reviews SET reviewer_name = ?, rating = ?, title = ?, body = ? WHERE id = ?`,
      [reviewer_name, rating, title, body, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async getRecent(limit = 5) {
    const [rows] = await pool.query(
      `SELECT r.id, r.reviewer_name, r.rating, r.title, r.created_at,
              m.title AS movie_title, m.slug AS movie_slug
       FROM reviews r
       JOIN movies m ON r.movie_id = m.id
       ORDER BY r.created_at DESC
       LIMIT ?`,
      [parseInt(limit, 10)]
    );
    return rows;
  },
};

module.exports = ReviewModel;

const { pool } = require('../config/database');

const MovieModel = {
  async findAll({ genre, year, page = 1, limit = 12 } = {}) {
    const offset = (page - 1) * limit;
    const conditions = [];
    const params = [];

    if (genre) {
      conditions.push('g.slug = ?');
      params.push(genre);
    }
    if (year) {
      conditions.push('m.release_year = ?');
      params.push(year);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [rows] = await pool.query(
      `SELECT m.id, m.title, m.slug, m.description, m.release_year,
              m.director, m.duration_minutes, m.poster_url, m.created_at,
              g.id AS genre_id, g.name AS genre_name, g.slug AS genre_slug,
              ROUND(AVG(r.rating), 1) AS avg_rating,
              COUNT(r.id) AS review_count
       FROM movies m
       JOIN genres g ON m.genre_id = g.id
       LEFT JOIN reviews r ON r.movie_id = m.id
       ${where}
       GROUP BY m.id
       ORDER BY m.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit, 10), offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(DISTINCT m.id) AS total
       FROM movies m
       JOIN genres g ON m.genre_id = g.id
       ${where}`,
      params
    );

    return { movies: rows, total, page, limit };
  },

  async findBySlug(slug) {
    const [[movie]] = await pool.query(
      `SELECT m.*, g.name AS genre_name, g.slug AS genre_slug,
              ROUND(AVG(r.rating), 1) AS avg_rating,
              COUNT(r.id) AS review_count
       FROM movies m
       JOIN genres g ON m.genre_id = g.id
       LEFT JOIN reviews r ON r.movie_id = m.id
       WHERE m.slug = ?
       GROUP BY m.id`,
      [slug]
    );
    return movie || null;
  },

  async findById(id) {
    const [[movie]] = await pool.query(
      `SELECT m.*, g.name AS genre_name, g.slug AS genre_slug
       FROM movies m
       JOIN genres g ON m.genre_id = g.id
       WHERE m.id = ?`,
      [id]
    );
    return movie || null;
  },

  async create({ title, slug, description, release_year, director, genre_id, poster_url, duration_minutes }) {
    const [result] = await pool.query(
      `INSERT INTO movies (title, slug, description, release_year, director, genre_id, poster_url, duration_minutes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, description, release_year, director, genre_id, poster_url || null, duration_minutes || null]
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const allowed = ['title', 'slug', 'description', 'release_year', 'director', 'genre_id', 'poster_url', 'duration_minutes'];
    const entries = Object.entries(fields).filter(([k]) => allowed.includes(k));
    if (!entries.length) return this.findById(id);

    const sets = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([, v]) => v);

    await pool.query(`UPDATE movies SET ${sets} WHERE id = ?`, [...values, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM movies WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = MovieModel;

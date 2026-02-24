'use client';
import { useEffect, useState } from 'react';
import { getMovies, getGenres, createMovie, deleteMovie } from '@/lib/api';
import { Movie, Genre } from '@/types';

export default function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', description: '', release_year: new Date().getFullYear().toString(),
    director: '', genre_id: '', duration_minutes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  async function load() {
    try {
      const [md, gd] = await Promise.all([getMovies({ limit: 50 }), getGenres()]);
      setMovies(md.movies);
      setGenres(gd.genres);
      if (!form.genre_id && gd.genres.length) {
        setForm((f) => ({ ...f, genre_id: String(gd.genres[0].id) }));
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      await createMovie({
        ...form,
        release_year: Number(form.release_year),
        genre_id: Number(form.genre_id),
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
      });
      setForm({ title: '', description: '', release_year: new Date().getFullYear().toString(), director: '', genre_id: genres[0]?.id?.toString() || '', duration_minutes: '' });
      await load();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this movie and all its reviews?')) return;
    await deleteMovie(id);
    await load();
  }

  if (loading) return <div className="loading-state container">Loading admin panel…</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Admin Panel</h1>
        <p>Manage movies in the database</p>
      </div>

      {error && <p className="form-error" style={{ marginBottom: '1rem' }}>{error}</p>}

      {/* Create Form */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Add New Movie</h2>
        {formError && <p className="form-error" style={{ marginBottom: '1rem' }}>{formError}</p>}
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" value={form.title} onChange={set('title')} required placeholder="Movie title" />
            </div>
            <div className="form-group">
              <label>Director</label>
              <input className="form-control" value={form.director} onChange={set('director')} required placeholder="Director name" />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <select className="form-control" value={form.genre_id} onChange={set('genre_id')} required>
                {genres.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Release Year</label>
              <input className="form-control" type="number" value={form.release_year} onChange={set('release_year')} required min={1888} max={2035} />
            </div>
            <div className="form-group">
              <label>Duration (minutes, optional)</label>
              <input className="form-control" type="number" value={form.duration_minutes} onChange={set('duration_minutes')} placeholder="e.g. 112" />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" value={form.description} onChange={set('description')} required rows={3} placeholder="Short synopsis" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Adding…' : '+ Add Movie'}
          </button>
        </form>
      </div>

      {/* Movie List */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)', textAlign: 'left' }}>
                {['Title', 'Year', 'Director', 'Genre', 'Reviews', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{m.title}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{m.release_year}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{m.director}</td>
                  <td style={{ padding: '0.75rem 1rem' }}><span className="badge">{m.genre_name}</span></td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{m.review_count}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <button className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }} onClick={() => handleDelete(m.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

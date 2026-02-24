'use client';
import { useState, FormEvent } from 'react';
import { createReview } from '@/lib/api';

interface Props {
  movieSlug: string;
  onSuccess: () => void;
}

export default function ReviewForm({ movieSlug, onSuccess }: Props) {
  const [form, setForm] = useState({ reviewer_name: '', rating: '7', title: '', body: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createReview(movieSlug, { ...form, rating: Number(form.rating) });
      setForm({ reviewer_name: '', rating: '7', title: '', body: '' });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Write a Review</h3>
      {error && <p className="form-error" style={{ marginBottom: '1rem' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Your Name</label>
          <input className="form-control" value={form.reviewer_name} onChange={set('reviewer_name')} required placeholder="e.g. Alex B." />
        </div>
        <div className="form-group">
          <label>Rating (1–10)</label>
          <select className="form-control" value={form.rating} onChange={set('rating')}>
            {Array.from({ length: 10 }, (_, i) => i + 1).reverse().map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Review Title</label>
        <input className="form-control" value={form.title} onChange={set('title')} required placeholder="Summarise your thoughts" />
      </div>
      <div className="form-group">
        <label>Your Review</label>
        <textarea className="form-control" value={form.body} onChange={set('body')} required rows={5} placeholder="Tell us what you thought..." />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}

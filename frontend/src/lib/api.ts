const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data as T;
}

// ── Movies ─────────────────────────────────────────────────────────────────
export function getMovies(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return request<any>(`/api/movies${qs ? `?${qs}` : ''}`);
}

export function getMovie(slug: string) {
  return request<any>(`/api/movies/${slug}`);
}

export function createMovie(data: object) {
  return request<any>('/api/movies', { method: 'POST', body: JSON.stringify(data) });
}

export function updateMovie(id: number, data: object) {
  return request<any>(`/api/movies/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export function deleteMovie(id: number) {
  return request<any>(`/api/movies/${id}`, { method: 'DELETE' });
}

// ── Reviews ────────────────────────────────────────────────────────────────
export function getReviews(slug: string, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return request<any>(`/api/movies/${slug}/reviews${qs ? `?${qs}` : ''}`);
}

export function createReview(slug: string, data: object) {
  return request<any>(`/api/movies/${slug}/reviews`, { method: 'POST', body: JSON.stringify(data) });
}

export function getRecentReviews(limit = 5) {
  return request<any>(`/api/reviews/recent?limit=${limit}`);
}

export function deleteReview(id: number) {
  return request<any>(`/api/reviews/${id}`, { method: 'DELETE' });
}

// ── Genres ─────────────────────────────────────────────────────────────────
export function getGenres() {
  return request<any>('/api/genres');
}

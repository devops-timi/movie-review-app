export const dynamic = 'force-dynamic'
import Link from 'next/link';
import { getMovies, getGenres, getRecentReviews } from '@/lib/api';
import MovieCard from '@/components/ui/MovieCard';
import ReviewCard from '@/components/ui/ReviewCard';

export const revalidate = 60;

export default async function HomePage() {
  const [moviesData, genresData, recentData] = await Promise.all([
    getMovies({ limit: 6 }),
    getGenres(),
    getRecentReviews(4),
  ]);

  const { movies } = moviesData;
  const { genres } = genresData;
  const { reviews } = recentData;

  return (
    <div className="container">
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem' }}>
          🎬 Welcome to <span style={{ color: 'var(--accent)' }}>CineVault</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', marginBottom: '2rem' }}>
          Discover fictional films. Rate them. Share your thoughts.
        </p>
        <Link href="/movies" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
          Browse All Movies
        </Link>
      </section>

      {/* Browse by Genre */}
      <section style={{ padding: '2rem 0' }}>
        <h2 style={{ marginBottom: '1rem', fontWeight: 700 }}>Browse by Genre</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {genres.map((g: any) => (
            <Link key={g.id} href={`/movies?genre=${g.slug}`} className="badge accent" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', textDecoration: 'none' }}>
              {g.name} <span style={{ opacity: 0.7 }}>({g.movie_count})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Movies */}
      <section style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{ fontWeight: 700 }}>Recent Additions</h2>
          <Link href="/movies" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>View all →</Link>
        </div>
        <div className="movie-grid">
          {movies.map((m: any) => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>

      {/* Recent Reviews */}
      <section style={{ padding: '2rem 0' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>Recent Reviews</h2>
        {reviews.map((r: any) => (
          <div key={r.id} style={{ marginBottom: '0.75rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <Link href={`/movies/${r.movie_slug}`} style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
                  {r.movie_title}
                </Link>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>★ {r.rating}/10</span>
              </div>
              <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{r.title}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>by {r.reviewer_name}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

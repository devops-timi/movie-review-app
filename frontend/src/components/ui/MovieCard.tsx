import Link from 'next/link';
import { Movie } from '@/types';
import { ratingColor, formatDuration } from '@/lib/utils';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const color = ratingColor(movie.avg_rating ? Number(movie.avg_rating) : null);

  return (
    <Link href={`/movies/${movie.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card">
        <div className="poster">🎥</div>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, flex: 1 }}>{movie.title}</h3>
            {movie.avg_rating && (
              <span className="rating-pill" style={{ color, flexShrink: 0 }}>
                ★ {movie.avg_rating}
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0.3rem 0' }}>
            {movie.release_year} · {movie.director}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <span className="badge">{movie.genre_name}</span>
            {movie.duration_minutes && (
              <span className="badge">{formatDuration(movie.duration_minutes)}</span>
            )}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {movie.review_count} review{movie.review_count !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </Link>
  );
}

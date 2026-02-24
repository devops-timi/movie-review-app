import { notFound } from 'next/navigation';
import { getMovie, getReviews } from '@/lib/api';
import { formatDuration, formatDate, ratingColor } from '@/lib/utils';
import ReviewCard from '@/components/ui/ReviewCard';
import ReviewSection from './ReviewSection';

export const revalidate = 30;

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props) {
  try {
    const { movie } = await getMovie(params.slug);
    return { title: movie.title };
  } catch {
    return { title: 'Movie Not Found' };
  }
}

export default async function MovieDetailPage({ params }: Props) {
  let movie, reviewsData;
  try {
    [{ movie }, reviewsData] = await Promise.all([
      getMovie(params.slug),
      getReviews(params.slug),
    ]);
  } catch {
    notFound();
  }

  const color = ratingColor(movie.avg_rating ? Number(movie.avg_rating) : null);

  return (
    <div className="container">
      <section className="movie-detail-hero">
        <div className="movie-detail-grid">
          {/* Poster */}
          <div className="card poster" style={{ height: '300px', fontSize: '4rem' }}>🎥</div>

          {/* Info */}
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span className="badge">{movie.genre_name}</span>
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, margin: '0.5rem 0' }}>{movie.title}</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7 }}>{movie.description}</p>

            <ul className="meta-list" style={{ marginBottom: '1.5rem' }}>
              <li><span>Director</span><span>{movie.director}</span></li>
              <li><span>Year</span><span>{movie.release_year}</span></li>
              <li><span>Runtime</span><span>{formatDuration(movie.duration_minutes)}</span></li>
              <li><span>Added</span><span>{formatDate(movie.created_at)}</span></li>
            </ul>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {movie.avg_rating ? (
                <span className="rating-pill" style={{ color, fontSize: '1.1rem', padding: '0.4rem 1rem' }}>
                  ★ {movie.avg_rating}/10
                </span>
              ) : (
                <span className="badge">No ratings yet</span>
              )}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {movie.review_count} review{movie.review_count !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews section (client component handles form + list) */}
      <ReviewSection slug={params.slug} initialReviews={reviewsData} />
    </div>
  );
}

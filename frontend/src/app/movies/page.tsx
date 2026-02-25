export const dynamic = 'force-dynamic'
import { getMovies, getGenres } from '@/lib/api';
import MovieCard from '@/components/ui/MovieCard';
import Link from 'next/link';

export const metadata = { title: 'Movies' };
export const revalidate = 60;

interface Props {
  searchParams: { genre?: string; year?: string; page?: string };
}

export default async function MoviesPage({ searchParams }: Props) {
  const page = Number(searchParams.page || 1);
  const genre = searchParams.genre || '';
  const year = searchParams.year || '';

  const [moviesData, genresData] = await Promise.all([
    getMovies({ ...(genre ? { genre } : {}), ...(year ? { year } : {}), page, limit: 12 }),
    getGenres(),
  ]);

  const { movies, total, limit } = moviesData;
  const { genres } = genresData;
  const totalPages = Math.ceil(total / limit);

  const buildUrl = (overrides: Record<string, any>) => {
    const params = new URLSearchParams({ ...(genre ? { genre } : {}), ...(year ? { year } : {}), page: String(page), ...overrides });
    return `/movies?${params}`;
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Movies</h1>
        <p>{total} film{total !== 1 ? 's' : ''} in the vault</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          className="form-control"
          style={{ width: 'auto' }}
          value={genre}
          onChange={() => {}}
        >
          <option value="">All Genres</option>
          {genres.map((g: any) => (
            <option key={g.id} value={g.slug}>{g.name}</option>
          ))}
        </select>
        <select className="form-control" style={{ width: 'auto' }} value={year} onChange={() => {}}>
          <option value="">All Years</option>
          {[2023, 2022, 2021, 2020, 2019].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        💡 Use genre/year filter links below — or append ?genre=action&year=2023 to the URL
      </p>

      {/* Genre quick links */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Link href="/movies" className={`badge ${!genre ? 'accent' : ''}`}>All</Link>
        {genres.map((g: any) => (
          <Link key={g.id} href={buildUrl({ genre: g.slug, page: 1 })} className={`badge ${genre === g.slug ? 'accent' : ''}`}>
            {g.name}
          </Link>
        ))}
      </div>

      {movies.length === 0 ? (
        <div className="empty-state">No movies found for those filters.</div>
      ) : (
        <div className="movie-grid">
          {movies.map((m: any) => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 && <Link href={buildUrl({ page: page - 1 })} className="btn btn-ghost">← Prev</Link>}
          <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Page {page} of {totalPages}
          </span>
          {page < totalPages && <Link href={buildUrl({ page: page + 1 })} className="btn btn-ghost">Next →</Link>}
        </div>
      )}
    </div>
  );
}

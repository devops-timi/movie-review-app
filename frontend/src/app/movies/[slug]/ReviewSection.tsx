'use client';
import { useState } from 'react';
import { getReviews } from '@/lib/api';
import ReviewCard from '@/components/ui/ReviewCard';
import ReviewForm from '@/components/ui/ReviewForm';
import { Review } from '@/types';

interface Props {
  slug: string;
  initialReviews: { reviews: Review[]; total: number; page: number; limit: number };
}

export default function ReviewSection({ slug, initialReviews }: Props) {
  const [reviewsData, setReviewsData] = useState(initialReviews);
  const [page, setPage] = useState(1);

  async function refresh(p = 1) {
    const data = await getReviews(slug, { page: p, limit: 10 });
    setReviewsData(data);
    setPage(p);
  }

  const totalPages = Math.ceil(reviewsData.total / reviewsData.limit);

  return (
    <section style={{ paddingBottom: '3rem' }}>
      <h2 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>
        Reviews ({reviewsData.total})
      </h2>

      <ReviewForm movieSlug={slug} onSuccess={() => refresh(1)} />

      {reviewsData.reviews.length === 0 ? (
        <div className="empty-state">No reviews yet — be the first!</div>
      ) : (
        reviewsData.reviews.map((r) => <ReviewCard key={r.id} review={r} />)
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button className="btn btn-ghost" onClick={() => refresh(page - 1)}>← Prev</button>
          )}
          <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', padding: '0 1rem', fontSize: '0.9rem' }}>
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <button className="btn btn-ghost" onClick={() => refresh(page + 1)}>Next →</button>
          )}
        </div>
      )}
    </section>
  );
}

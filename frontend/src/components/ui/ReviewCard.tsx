import { Review } from '@/types';
import { ratingColor, formatDate } from '@/lib/utils';

interface Props {
  review: Review;
  onDelete?: (id: number) => void;
}

export default function ReviewCard({ review, onDelete }: Props) {
  const color = ratingColor(review.rating);

  return (
    <div className="card review-card">
      <div className="review-header">
        <div>
          <span className="reviewer-name">{review.reviewer_name}</span>
          <p className="text-muted" style={{ fontSize: '0.8rem' }}>{formatDate(review.created_at)}</p>
        </div>
        <span className="rating-pill" style={{ color }}>★ {review.rating}/10</span>
      </div>
      <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{review.title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{review.body}</p>
      {onDelete && (
        <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
          <button className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }} onClick={() => onDelete(review.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

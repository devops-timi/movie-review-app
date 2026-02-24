export function formatYear(year: number) {
  return String(year);
}

export function formatDuration(minutes: number | null): string {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function ratingColor(rating: number | string | null): string {
  const n = Number(rating);
  if (!n) return '#6b7280';
  if (n >= 8) return '#16a34a';
  if (n >= 6) return '#d97706';
  return '#dc2626';
}

export function starLabel(rating: number): string {
  return '★'.repeat(Math.round(rating / 2)) + '☆'.repeat(5 - Math.round(rating / 2));
}

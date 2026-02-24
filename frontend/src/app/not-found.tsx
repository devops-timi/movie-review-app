import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
      <p style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎞️</p>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like this reel went missing.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}

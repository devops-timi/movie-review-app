import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="inner">
        <Link href="/" className="logo">🎬 CineVault</Link>
        <nav>
          <Link href="/movies">Movies</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

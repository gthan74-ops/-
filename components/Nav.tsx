'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const path = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: 'rgba(12,12,12,0.92)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="serif text-base tracking-widest" style={{ color: 'var(--accent)' }}>
          오늘의 시
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/poems"
            className="transition-colors hover:opacity-100"
            style={{ color: path === '/poems' || path?.startsWith('/poems/') ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            시 아카이브
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:opacity-100"
            style={{ color: path === '/about' ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            소개
          </Link>
          <Link
            href="/#subscribe"
            className="px-4 py-1.5 rounded-full text-sm transition-all border"
            style={{
              borderColor: 'var(--accent-dim)',
              color: 'var(--accent)',
              background: 'transparent',
            }}
          >
            구독하기
          </Link>
        </div>
      </div>
    </nav>
  );
}

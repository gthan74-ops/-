import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: '오늘의 시 — 모두의시',
  description: '매일 아침, 당신 곁에 한 편의 시. 100년 전 청년 시인의 목소리가 오늘의 당신에게 닿습니다.',
  openGraph: {
    title: '오늘의 시 — 모두의시',
    description: '매일 아침, 당신 곁에 한 편의 시.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="border-t py-10 mt-20" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="serif text-sm" style={{ color: 'var(--accent)' }}>오늘의 시 — 모두의시</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                수록 작품은 한국저작권위원회 공유마당 공유저작물입니다.
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              CC BY 작품은 저작자명 표기 필수 · © 2026 모두의시
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

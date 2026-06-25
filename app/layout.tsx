import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: '오늘의 시 — 모두의시',
  description: '매일 아침 7시, 100년 전 청년 시인의 시 한 편이 당신에게 도착합니다. 버티고 있는 당신을 위한 일상 속 안전기지.',
  openGraph: {
    title: '오늘의 시 — 모두의시',
    description: '버티고 있는 당신 곁에, 100년 전 청년 시인의 목소리가 닿습니다.',
    type: 'website',
  },
  keywords: ['오늘의 시', '시 뉴스레터', '윤동주', '이육사', '한용운', '김소월', '한국 현대시', '모두의시'],
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
        <footer className="border-t py-12 mt-20" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="serif text-sm mb-1" style={{ color: 'var(--accent)' }}>오늘의 시 — 모두의시</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  수록 작품은 한국저작권위원회 공유마당 공유저작물입니다.
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  CC BY 작품은 저작자명 표기 필수 · © 2026 모두의시
                </p>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                힘드신가요?{' '}
                <a href="tel:109" style={{ color: 'var(--accent)' }}>자살예방상담전화 109</a>
                {' '}· 24시간 무료
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

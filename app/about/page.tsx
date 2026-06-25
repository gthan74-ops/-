import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개 — 오늘의 시',
  description: '오늘의 시는 자신이 무가치하다고 느끼며 고독감과 싸우는 2030 청년을 위한 일상 속 안전기지입니다.',
};

const pillars = [
  {
    num: '01',
    title: '날 것의 위로',
    desc: '화려한 디자인도, 긍정 강요도 없습니다. 검은 화면 위 시 한 편, 새벽 빗소리, 나지막한 독백. 그것만으로 당신 곁에 서겠습니다.',
  },
  {
    num: '02',
    title: '100년 검증된 언어',
    desc: '100년 전 청년 시인들이 남긴 말들은 시대를 건너 지금도 유효합니다. 트렌드가 아닌 본질로, 유행이 아닌 진심으로 위로합니다.',
  },
  {
    num: '03',
    title: '사회적 안전망',
    desc: '위기의 순간, 자살예방상담전화(109)로 연결합니다. 콘텐츠 플랫폼과 생명 구호 기능을 함께 설계했습니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-12" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:opacity-80 transition-opacity">홈</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>소개</span>
        </div>

        {/* Header */}
        <header className="mb-16">
          <p className="text-xs tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>ABOUT</p>
          <h1 className="serif text-3xl md:text-4xl mb-6" style={{ color: 'var(--text)', lineHeight: 1.4 }}>
            오늘의 시,<br />모두의시
          </h1>
          <p className="text-base" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
            자신이 무가치하다고 느끼며 고독감과 싸우는 2030 청년을 위한
            일상 속 안전기지입니다.
          </p>
        </header>

        <div className="w-12 h-px mb-16" style={{ background: 'var(--accent-dim)' }} />

        {/* Why */}
        <section className="mb-16">
          <h2 className="serif text-xl mb-6" style={{ color: 'var(--accent)' }}>왜 만들었나요</h2>
          <div className="space-y-5 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2.1 }}>
            <p>
              통계청 기준 2030 청년 사망원인 1위는 수년째 자살입니다.
              대한민국은 OECD 청년 자살률 최상위권에 머물고 있습니다.
            </p>
            <p>
              물질적 풍요 속에서도 상대적 박탈감, 취업난, 경쟁으로 인한
              정서적 고립과 무기력증은 깊어지고 있습니다.
              이는 개인 의지의 문제가 아닌,
              일상 속 정서적 안전기지의 부재에서 비롯된 구조적 사회 문제입니다.
            </p>
            <p>
              기존 해결책들은 진입 장벽이 너무 높거나 한국 청년의 정서와 맞지 않습니다.
              심리상담은 회당 10만 원 이상, 글로벌 명상 앱은 서구식 접근,
              SNS 감성 콘텐츠는 오히려 괴리감을 줍니다.
            </p>
          </div>
        </section>

        {/* What */}
        <section className="mb-16">
          <h2 className="serif text-xl mb-6" style={{ color: 'var(--accent)' }}>무엇인가요</h2>
          <div className="space-y-5 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2.1 }}>
            <p>
              오늘의 시는 저작권이 만료된 국내 근대 시 — 윤동주, 이육사, 한용운, 김소월 등
              541명의 시인이 쓴 6,998편 — 을 매일 아침 한 편씩 당신에게 전합니다.
            </p>
            <p>
              100년 전에도 같은 밤을 견뎌낸 청년 시인들의 목소리가
              지금 이 순간을 버티고 있는 당신에게 조용히 닿을 수 있도록.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section className="mb-16">
          <h2 className="serif text-xl mb-8" style={{ color: 'var(--accent)' }}>우리가 다른 이유</h2>
          <div className="space-y-4">
            {pillars.map((item) => (
              <div
                key={item.num}
                className="flex gap-6 p-6 rounded-xl border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <span className="serif text-lg shrink-0 mt-0.5" style={{ color: 'var(--accent-dim)' }}>
                  {item.num}
                </span>
                <div>
                  <h3 className="serif text-base mb-2" style={{ color: 'var(--text)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="serif text-xl mb-6" style={{ color: 'var(--accent)' }}>어떻게 작동하나요</h2>
          <div className="space-y-5 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2.1 }}>
            <p>매일 오전 7시, 시 한 편이 메일함에 도착합니다. 무료입니다. 광고도 없습니다.</p>
            <p>
              프리미엄 구독자(월 4,900원)에게는 AI로 제작한 초고화질 배경화면,
              ASMR 낭송 오디오, 익명 필사 커뮤니티를 제공합니다.
            </p>
            <p>
              모든 작품은 한국저작권위원회 공유마당의 공유저작물로,
              저작권 걱정 없이 자유롭게 감상할 수 있습니다.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 py-10 border-t border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="serif text-3xl mb-2" style={{ color: 'var(--accent)' }}>6,998</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>수록 작품</p>
            </div>
            <div>
              <p className="serif text-3xl mb-2" style={{ color: 'var(--accent)' }}>541</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>시인</p>
            </div>
            <div>
              <p className="serif text-3xl mb-2" style={{ color: 'var(--accent)' }}>100년</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>한국 근현대시</p>
            </div>
          </div>
        </section>

        {/* Source */}
        <section className="mb-16">
          <h2 className="serif text-xl mb-6" style={{ color: 'var(--accent)' }}>시 데이터 출처</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
            모든 수록 작품은 한국저작권위원회 공유마당의 공유저작물 데이터베이스를 기반으로 합니다.
            저작권이 만료되었거나 저작권자가 자유이용을 허락한 작품만을 수록합니다.
          </p>
        </section>

        {/* Crisis */}
        <section
          className="p-6 rounded-xl border mb-16"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--text)' }}>지금 많이 힘드신가요?</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
            자살예방상담전화{' '}
            <a href="tel:109" style={{ color: 'var(--accent)' }}>109</a>
            {' '}(24시간 무료)로 언제든지 연락하세요.
            당신의 이야기를 들을 준비가 되어 있습니다.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/#subscribe"
            className="inline-block px-8 py-3 rounded-full text-sm transition-all"
            style={{ background: 'var(--accent)', color: '#0c0c0c' }}
          >
            무료 구독 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { getTodayPoem, getRandomPoems } from '@/lib/poems';
import SubscribeForm from '@/components/SubscribeForm';

function gradeLabel(grade: string): string {
  if (grade.includes('만료')) return '자유이용';
  if (grade.includes('CC BY')) return 'CC BY';
  if (grade.includes('기증')) return '기증저작물';
  return grade;
}

export default function HomePage() {
  const today = getTodayPoem();
  const morePoems = getRandomPoems(3, today.id);

  const lines = today.text.split('\n').filter(Boolean);
  const previewLines = lines.slice(0, 8).join('\n');
  const hasMore = lines.length > 8;

  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="min-h-[65vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs tracking-[0.3em] mb-8" style={{ color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </p>
        <h1
          className="serif text-5xl md:text-7xl mb-6 tracking-wide"
          style={{ color: 'var(--text)', lineHeight: 1.2 }}
        >
          오늘의 시
        </h1>
        <p className="text-base md:text-lg max-w-md mt-2 mb-10" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
          모두가 자신의 무가치함과 싸우고 있습니다.<br />
          100년 전, 같은 밤을 견뎌낸 시인의 목소리가<br />
          오늘 당신 곁에 닿습니다.
        </p>
        <a
          href="#subscribe"
          className="inline-block px-8 py-3 rounded-full text-sm transition-all border hover:opacity-80"
          style={{ borderColor: 'var(--accent-dim)', color: 'var(--accent)' }}
        >
          매일 아침 시 한 편 받기 →
        </a>
      </section>

      {/* Today's Poem */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div
          className="rounded-2xl p-8 md:p-12 border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="serif text-2xl md:text-3xl" style={{ color: 'var(--text)' }}>
                {today.title}
              </h2>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                {today.author}
                {today.year && today.year !== 'None' && today.year !== '0' ? ` · ${today.year}년` : ''}
              </p>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full border mt-1 shrink-0"
              style={{ borderColor: 'var(--accent-dim)', color: 'var(--accent)' }}
            >
              {gradeLabel(today.grade)}
            </span>
          </div>

          <div className="poem-text text-base md:text-lg" style={{ color: 'var(--text)', opacity: 0.9 }}>
            {previewLines}
          </div>

          {hasMore && (
            <div className="mt-4" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              ···
            </div>
          )}

          <div
            className="mt-10 pt-8 border-t flex items-center justify-between"
            style={{ borderColor: 'var(--border)' }}
          >
            <Link
              href={`/poems/${today.id}`}
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: 'var(--accent)' }}
            >
              전문 읽기 →
            </Link>
            {today.url && (
              <a
                href={today.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                출처
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="py-24 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>DAILY POEM</p>
          <h2 className="serif text-3xl md:text-4xl mb-4" style={{ color: 'var(--text)' }}>
            매일 아침, 당신에게
          </h2>
          <p className="mb-2 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            오전 7시, 시 한 편이 메일함에 도착합니다.
          </p>
          <p className="mb-10 text-sm" style={{ color: 'var(--text-muted)' }}>
            무료 · 광고 없음 · 언제든 구독 취소
          </p>
          <SubscribeForm />
          <div
            className="mt-8 p-5 rounded-xl border text-left mx-auto max-w-sm"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            <p className="text-xs tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>PREMIUM · 월 4,900원</p>
            <ul className="space-y-2 text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>· 초고화질 배경화면 다운로드 (매일 업데이트)</li>
              <li>· ASMR 낭송 풀버전 청취</li>
              <li>· 익명 필사 커뮤니티 참여</li>
            </ul>
          </div>
        </div>
      </section>

      {/* More Poems */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="serif text-xl" style={{ color: 'var(--text)' }}>함께 읽어볼 시</h2>
          <Link href="/poems" className="text-sm" style={{ color: 'var(--accent)' }}>
            전체 보기 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {morePoems.map((poem) => (
            <Link
              key={poem.id}
              href={`/poems/${poem.id}`}
              className="block rounded-xl p-6 border transition-all hover:opacity-80"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                {poem.author}
                {poem.year && poem.year !== 'None' && poem.year !== '0' ? ` · ${poem.year}` : ''}
              </p>
              <h3 className="serif text-lg mb-4" style={{ color: 'var(--text)' }}>
                {poem.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-4" style={{ color: 'var(--text-muted)' }}>
                {poem.text.replace(/\n+/g, ' ').slice(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t py-20 px-6" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.2em] mb-6" style={{ color: 'var(--text-muted)' }}>WHY</p>
          <h2
            className="serif text-2xl md:text-3xl mb-8"
            style={{ color: 'var(--text)', lineHeight: 1.7 }}
          >
            "힘내"가 아닌,<br />
            "버티고 있는 네가<br />이미 충분하다"
          </h2>
          <div className="space-y-5 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
            <p>
              대한민국 2030 청년 사망원인 1위는 수년째 자살입니다.
              물질적 풍요 속에서도 정서적 고립과 무기력증은 깊어지고 있습니다.
            </p>
            <p>
              오늘의 시는 100년 전에도 같은 밤을 견뎌낸 윤동주, 이육사, 한용운, 김소월의 목소리로
              지금 이 순간을 버티고 있는 당신 곁에 조용히 서 있으려 합니다.
            </p>
            <p>가식적인 위로 없이. 과도한 긍정 없이. 있는 그대로.</p>
          </div>
          <div className="mt-10 flex gap-8 text-sm" style={{ color: 'var(--text-muted)' }}>
            <div>
              <p className="serif text-2xl" style={{ color: 'var(--accent)' }}>6,998</p>
              <p className="mt-1">수록 작품</p>
            </div>
            <div>
              <p className="serif text-2xl" style={{ color: 'var(--accent)' }}>541</p>
              <p className="mt-1">시인</p>
            </div>
            <div>
              <p className="serif text-2xl" style={{ color: 'var(--accent)' }}>100<span className="text-base">년</span></p>
              <p className="mt-1">한국 근현대시</p>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/about" className="text-sm" style={{ color: 'var(--accent)' }}>
              오늘의 시 이야기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis Support */}
      <section className="py-8 px-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          지금 많이 힘드신가요?{' '}
          <a href="tel:109" style={{ color: 'var(--accent)', opacity: 0.9 }}>
            자살예방상담전화 109
          </a>{' '}
          (24시간 무료 운영)
        </p>
      </section>
    </div>
  );
}

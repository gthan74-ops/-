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
  const morePeoms = getRandomPoems(3, today.id);

  const lines = today.text.split('\n').filter(Boolean);
  const previewLines = lines.slice(0, 8).join('\n');
  const hasMore = lines.length > 8;

  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-xs tracking-[0.3em] mb-6" style={{ color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
        </p>
        <h1
          className="serif text-5xl md:text-7xl mb-4 tracking-wide"
          style={{ color: 'var(--text)', lineHeight: 1.2 }}
        >
          오늘의 시
        </h1>
        <p className="text-base max-w-sm mt-4" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
          버텨내고 있는 당신 곁에,<br />
          100년 전 청년 시인의 목소리가 닿습니다.
        </p>
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

          <div className="mt-10 pt-8 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
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
      <section id="subscribe" className="py-20 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>DAILY POEM</p>
          <h2 className="serif text-3xl md:text-4xl mb-4" style={{ color: 'var(--text)' }}>
            매일 아침, 당신에게
          </h2>
          <p className="mb-3 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            하루 한 편, 오전 7시에 배달됩니다.
          </p>
          <p className="mb-10 text-sm" style={{ color: 'var(--text-muted)' }}>
            무료 · 광고 없음 · 언제든 구독 취소
          </p>
          <SubscribeForm />
          <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            프리미엄 구독 (월 4,900원): 고화질 배경화면 · ASMR 낭송 · 필사 커뮤니티
          </p>
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
          {morePeoms.map((poem) => (
            <Link
              key={poem.id}
              href={`/poems/${poem.id}`}
              className="block rounded-xl p-6 border transition-colors hover:border-opacity-60"
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

      {/* About */}
      <section className="border-t py-20 px-6" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.2em] mb-6" style={{ color: 'var(--text-muted)' }}>ABOUT</p>
          <h2 className="serif text-2xl md:text-3xl mb-8" style={{ color: 'var(--text)', lineHeight: 1.6 }}>
            "힘내"가 아닌,<br />"버티고 있는 네가<br />이미 충분하다"
          </h2>
          <div className="space-y-4 text-sm" style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
            <p>
              오늘의 시는 자신이 무가치하다고 느끼며 고독감과 싸우는 2030 청년을 위한 일상 속 안전기지입니다.
            </p>
            <p>
              윤동주, 이육사, 한용운, 김소월 — 100년 전에도 같은 밤을 견뎌낸 청년 시인들의 목소리가
              오늘 당신 곁에 닿을 수 있도록, 매일 아침 한 편씩 전합니다.
            </p>
            <p>
              가식적인 위로 없이. 과도한 긍정 없이. 있는 그대로.
            </p>
          </div>
          <div className="mt-10 flex gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
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
        </div>
      </section>
    </div>
  );
}

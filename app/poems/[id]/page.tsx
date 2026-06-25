import { getPoemById, getAllPoemsIndex, getRandomPoems } from '@/lib/poems';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const poem = getPoemById(Number(id));
  if (!poem) return { title: '시를 찾을 수 없습니다' };
  return {
    title: `${poem.title} — ${poem.author} | 오늘의 시`,
    description: poem.text.slice(0, 120).replace(/\n/g, ' '),
  };
}

export const dynamic = 'force-dynamic';

function gradeLabel(grade: string) {
  if (grade.includes('만료')) return '자유이용 (저작권 만료)';
  if (grade.includes('CC BY')) return 'CC BY — 출처 표시 필수';
  if (grade.includes('기증')) return '기증저작물 자유이용';
  return grade;
}

export default async function PoemPage({ params }: Props) {
  const { id } = await params;
  const poem = getPoemById(Number(id));
  if (!poem) notFound();

  const related = getRandomPoems(3, poem.id).filter((p) => p.author === poem.author || true).slice(0, 3);

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs mb-12" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:opacity-80 transition-opacity">홈</Link>
          <span>/</span>
          <Link href="/poems" className="hover:opacity-80 transition-opacity">시 아카이브</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{poem.title}</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>
            {poem.year && poem.year !== 'None' && poem.year !== '0' ? `${poem.year}년` : ''}
          </p>
          <h1 className="serif text-3xl md:text-4xl mb-4" style={{ color: 'var(--text)', lineHeight: 1.3 }}>
            {poem.title}
          </h1>
          <p className="serif text-lg" style={{ color: 'var(--accent)' }}>
            {poem.author}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span
              className="text-xs px-2.5 py-1 rounded-full border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              {gradeLabel(poem.grade)}
            </span>
            {poem.charCount > 0 && (
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {poem.charCount.toLocaleString()}자
              </span>
            )}
          </div>
        </header>

        {/* Divider */}
        <div className="w-12 h-px mb-12" style={{ background: 'var(--accent-dim)' }} />

        {/* Poem text */}
        <article
          className="poem-text text-base md:text-lg"
          style={{ color: 'var(--text)', opacity: 0.92, minHeight: '30vh' }}
        >
          {poem.text}
        </article>

        {/* License note */}
        {poem.grade.includes('CC BY') && (
          <div
            className="mt-12 p-4 rounded-lg border text-xs"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}
          >
            이 작품은 CC BY 라이선스 적용 작품입니다. 활용 시 저작자명({poem.author})을 반드시 표기해 주세요.
          </div>
        )}

        {/* Source */}
        {poem.url && (
          <div className="mt-8 pt-8 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              출처: 한국저작권위원회 공유마당
            </span>
            <a
              href={poem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: 'var(--accent)' }}
            >
              원문 보기 →
            </a>
          </div>
        )}

        {/* Subscribe CTA */}
        <div
          className="mt-16 p-8 rounded-2xl border text-center"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <p className="serif text-lg mb-2" style={{ color: 'var(--text)' }}>
            내일 아침에도 이런 시 한 편이?
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            매일 오전 7시, 당신에게 시 한 편을 배달합니다.
          </p>
          <Link
            href="/#subscribe"
            className="inline-block px-8 py-3 rounded-full text-sm transition-all"
            style={{ background: 'var(--accent)', color: '#0c0c0c' }}
          >
            무료 구독하기
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="serif text-lg mb-6" style={{ color: 'var(--text)' }}>함께 읽어볼 시</h2>
            <div className="grid gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/poems/${r.id}`}
                  className="flex items-center gap-4 p-5 rounded-xl border transition-all hover:opacity-80"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{r.author}</p>
                    <p className="serif text-base" style={{ color: 'var(--text)' }}>{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

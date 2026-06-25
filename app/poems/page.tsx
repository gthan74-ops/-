import { getAllPoemsIndex } from '@/lib/poems';
import PoemSearch from '@/components/PoemSearch';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시 아카이브 — 오늘의 시',
  description: '6,998편 한국 근현대 시 아카이브. 윤동주, 이육사, 한용운, 김소월 외 541명의 시인.',
};

export default function PoemsPage() {
  const poems = getAllPoemsIndex();

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs tracking-[0.2em] mb-4" style={{ color: 'var(--text-muted)' }}>ARCHIVE</p>
          <h1 className="serif text-3xl md:text-4xl" style={{ color: 'var(--text)' }}>
            시 아카이브
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            6,998편 · 541명 시인 · 한국저작권위원회 공유마당
          </p>
        </div>
        <PoemSearch poems={poems} />
      </div>
    </div>
  );
}

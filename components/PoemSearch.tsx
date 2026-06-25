'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { PoemIndex } from '@/lib/poems';

interface Props {
  poems: PoemIndex[];
}

function gradeColor(grade: string) {
  if (grade.includes('CC BY')) return 'var(--accent)';
  if (grade.includes('기증')) return '#8aab8a';
  return 'var(--text-muted)';
}

function gradeLabel(grade: string) {
  if (grade.includes('만료')) return '자유이용';
  if (grade.includes('CC BY')) return 'CC BY';
  if (grade.includes('기증')) return '기증';
  return grade;
}

const PER_PAGE = 24;

export default function PoemSearch({ poems }: Props) {
  const [query, setQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [page, setPage] = useState(1);

  const authors = useMemo(() => {
    const set = new Set(poems.map((p) => p.author));
    return [...set].sort();
  }, [poems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return poems.filter((p) => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
      const matchAuthor = !authorFilter || p.author === authorFilter;
      return matchQ && matchAuthor;
    });
  }, [poems, query, authorFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(v: string) {
    setQuery(v);
    setPage(1);
  }

  function handleAuthor(v: string) {
    setAuthorFilter(v);
    setPage(1);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="시 제목 또는 시인 검색..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg text-sm outline-none border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />
        <select
          value={authorFilter}
          onChange={(e) => handleAuthor(e.target.value)}
          className="px-4 py-3 rounded-lg text-sm outline-none border min-w-[140px]"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: authorFilter ? 'var(--text)' : 'var(--text-muted)' }}
        >
          <option value="">전체 시인</option>
          {authors.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
        {filtered.length.toLocaleString()}편
        {(query || authorFilter) && ' 검색됨'}
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginated.map((poem) => (
          <Link
            key={poem.id}
            href={`/poems/${poem.id}`}
            className="block rounded-xl p-5 border transition-all hover:opacity-90"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {poem.author}{poem.year && poem.year !== 'None' && poem.year !== '0' ? ` · ${poem.year}` : ''}
              </p>
              <span className="text-xs shrink-0" style={{ color: gradeColor(poem.grade) }}>
                {gradeLabel(poem.grade)}
              </span>
            </div>
            <h3 className="serif text-base" style={{ color: 'var(--text)', lineHeight: 1.5 }}>
              {poem.title}
            </h3>
            {poem.charCount > 0 && (
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                {poem.charCount.toLocaleString()}자
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg text-sm border transition-colors disabled:opacity-30"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            이전
          </button>
          <span className="text-sm px-3" style={{ color: 'var(--text-muted)' }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg text-sm border transition-colors disabled:opacity-30"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

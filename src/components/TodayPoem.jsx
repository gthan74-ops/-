import { useState } from 'react';
import { getTodayPoem } from '../data/poems';
import useReveal from '../hooks/useReveal';

export default function TodayPoem() {
  const poem = getTodayPoem();
  const [showBackground, setShowBackground] = useState(false);
  const ref = useReveal();

  return (
    <section id="today" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className="reveal text-center mb-20">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">TODAY'S POEM</span>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-4" />
        </div>

        <RevealBlock delay={0}>
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] tracking-[0.3em] text-mist/50 font-light border border-mist/20 px-3 py-1">
              {poem.tag}
            </span>
            <span className="text-[10px] tracking-[0.2em] text-ink-600 font-light">{poem.mood}</span>
          </div>
        </RevealBlock>

        <RevealBlock delay={100}>
          <div className="mb-14">
            <h2 className="font-serif font-light text-4xl md:text-5xl text-ink-100 tracking-wider mb-4">
              〈{poem.title}〉
            </h2>
            <p className="text-sm font-light tracking-[0.2em] text-ink-500">
              {poem.poet} · {poem.year}
            </p>
          </div>
        </RevealBlock>

        <RevealBlock delay={200}>
          <div className="poem-text text-base md:text-lg text-ink-200 mb-16 space-y-1">
            {poem.lines.map((line, i) => (
              <p
                key={i}
                className={`transition-opacity ${line === '' ? 'h-5' : ''}`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={300}>
          <div className="border-t border-white/5 pt-10">
            <button
              onClick={() => setShowBackground(!showBackground)}
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-mist/50 hover:text-mist/80 font-light transition-colors group"
            >
              <span className={`w-4 h-px bg-mist/40 transition-all duration-300 group-hover:w-6 ${showBackground ? 'w-6' : ''}`} />
              {showBackground ? '배경 이야기 닫기' : '이 시의 배경 이야기'}
              <span className={`transition-transform duration-300 ${showBackground ? 'rotate-180' : ''}`}>↓</span>
            </button>

            {showBackground && (
              <div className="mt-8 pl-4 border-l border-mist/20">
                <p className="text-sm font-light text-ink-400 leading-8 whitespace-pre-line tracking-wide">
                  {poem.background}
                </p>
              </div>
            )}
          </div>
        </RevealBlock>

        <RevealBlock delay={350}>
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={() => {
                const text = `〈${poem.title}〉 — ${poem.poet}\n\n${poem.lines.join('\n')}\n\n오늘의 시`;
                navigator.clipboard?.writeText(text);
              }}
              className="flex items-center gap-2 text-xs tracking-[0.15em] text-ink-500 hover:text-ink-300 font-light transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              시 복사하기
            </button>
            <button
              onClick={() => {
                document.querySelector('#subscribe')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs tracking-[0.15em] text-mist/60 hover:text-mist font-light transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              매일 받아보기
            </button>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function RevealBlock({ children, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

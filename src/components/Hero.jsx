import { useState, useEffect } from 'react';
import { getTodayPoem } from '../data/poems';

const TAGLINE = "버텨내고 있는 당신이 이미 충분합니다.";

export default function Hero() {
  const poem = getTodayPoem();
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | done

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TAGLINE.length) {
        setDisplayedText(TAGLINE.slice(0, i + 1));
        i++;
      } else {
        setPhase('done');
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  const scrollToToday = () => {
    document.querySelector('#today')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSubscribe = () => {
    document.querySelector('#subscribe')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
      {/* Top label */}
      <div
        className="mb-12 opacity-0"
        style={{ animation: 'fadeIn 1.2s ease 0.3s forwards' }}
      >
        <span className="text-xs tracking-[0.35em] text-mist/60 font-light">
          오늘의 시 · 매일 아침 한 편
        </span>
      </div>

      {/* Main title */}
      <div
        className="mb-8 opacity-0"
        style={{ animation: 'fadeIn 1.4s ease 0.6s forwards' }}
      >
        <h1 className="font-serif font-light text-6xl md:text-8xl tracking-[0.08em] text-ink-100 leading-tight">
          오늘의 시
        </h1>
      </div>

      {/* Divider */}
      <div
        className="w-12 h-px bg-gradient-to-r from-transparent via-mist/40 to-transparent mb-10 opacity-0"
        style={{ animation: 'fadeIn 1s ease 1s forwards' }}
      />

      {/* Typewriter tagline */}
      <div className="h-8 mb-14 flex items-center justify-center">
        <p
          className={`text-base md:text-lg font-serif font-light text-ink-300 tracking-wide ${
            phase === 'typing' ? 'cursor-blink' : ''
          }`}
        >
          {displayedText}
        </p>
      </div>

      {/* Today's poem preview */}
      <div
        className="max-w-sm mx-auto mb-16 glass-card p-8 opacity-0"
        style={{ animation: 'fadeIn 1.2s ease 1.6s forwards' }}
      >
        <div className="text-xs tracking-[0.3em] text-mist/50 mb-5 font-light">
          {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
        </div>
        <div className="poem-text text-sm text-ink-200 mb-6 space-y-1">
          {poem.lines.slice(0, 4).map((line, i) => (
            <p key={i} className={line === '' ? 'h-3' : ''}>
              {line}
            </p>
          ))}
          <p className="text-ink-500">…</p>
        </div>
        <div className="text-xs tracking-[0.2em] text-mist/60 font-light">
          — {poem.poet}, 〈{poem.title}〉
        </div>
      </div>

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row gap-4 items-center opacity-0"
        style={{ animation: 'fadeIn 1s ease 2s forwards' }}
      >
        <button
          onClick={scrollToToday}
          className="text-xs tracking-[0.25em] font-light bg-mist-dark/80 hover:bg-mist-dark text-ink-100 px-8 py-3.5 transition-all duration-300 hover:scale-[1.02]"
        >
          오늘 시 읽기
        </button>
        <button
          onClick={scrollToSubscribe}
          className="text-xs tracking-[0.25em] font-light border border-ink-600 text-ink-400 hover:border-ink-300 hover:text-ink-200 px-8 py-3.5 transition-all duration-300"
        >
          무료 구독하기
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: 'fadeIn 1s ease 2.4s forwards' }}
      >
        <span className="text-[10px] tracking-[0.3em] text-ink-600 font-light">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-ink-600 to-transparent animate-pulse" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

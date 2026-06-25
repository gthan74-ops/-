import { useState } from 'react';
import useReveal from '../hooks/useReveal';

export default function Crisis() {
  const [expanded, setExpanded] = useState(false);
  const ref = useReveal();

  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto">
        <div ref={ref} className="reveal">
          <div
            className={`border transition-all duration-500 ${
              expanded ? 'border-mist/20 bg-mist/5' : 'border-white/5'
            }`}
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between px-8 py-6 group"
            >
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-mist/40 animate-pulse flex-shrink-0" />
                <span className="text-xs tracking-[0.2em] font-light text-ink-400 group-hover:text-ink-200 transition-colors">
                  지금 많이 힘드신가요?
                </span>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`text-ink-600 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {expanded && (
              <div className="px-8 pb-8">
                <div className="pl-6 border-l border-mist/20">
                  <p className="text-sm font-light text-ink-400 leading-8 tracking-wide mb-8">
                    지금 이 순간이 너무 무거우시다면,<br />
                    혼자 짊어지지 않아도 됩니다.<br />
                    당신의 이야기를 들어줄 사람이 있습니다.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="tel:109"
                      className="flex items-center gap-5 group"
                    >
                      <div className="w-10 h-10 border border-mist/20 flex items-center justify-center flex-shrink-0 group-hover:border-mist/50 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mist/60">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16h.42z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-serif font-light text-ink-200 tracking-wider group-hover:text-white transition-colors">
                          자살예방상담전화 · 109
                        </div>
                        <div className="text-[11px] font-light text-ink-600 tracking-wide mt-0.5">
                          24시간 · 무료 · 익명
                        </div>
                      </div>
                    </a>

                    <a
                      href="tel:1393"
                      className="flex items-center gap-5 group"
                    >
                      <div className="w-10 h-10 border border-mist/20 flex items-center justify-center flex-shrink-0 group-hover:border-mist/50 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mist/60">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-serif font-light text-ink-200 tracking-wider group-hover:text-white transition-colors">
                          정신건강 위기상담 · 1393
                        </div>
                        <div className="text-[11px] font-light text-ink-600 tracking-wide mt-0.5">
                          24시간 · 무료
                        </div>
                      </div>
                    </a>
                  </div>

                  <p className="mt-8 text-xs font-light text-ink-600 leading-7 tracking-wide">
                    오늘의 시는 위기 키워드 감지 시 자동으로<br />
                    상담 안내를 제공하는 AI 기능을 개발 중입니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

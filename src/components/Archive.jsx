import { useState } from 'react';
import { poems, getTodayPoem } from '../data/poems';
import useReveal from '../hooks/useReveal';

function PoemCard({ poem, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left glass-card p-6 transition-all duration-400 hover:border-mist/20 group ${
        isActive ? 'border-mist/30 bg-white/5' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-mist/50 font-light mb-2">{poem.tag}</p>
          <h3 className="font-serif font-light text-lg text-ink-100 tracking-wider group-hover:text-white transition-colors">
            〈{poem.title}〉
          </h3>
        </div>
        <span className="text-[10px] tracking-[0.15em] text-ink-600 font-light mt-1">{poem.year}</span>
      </div>
      <p className="text-xs font-light tracking-[0.15em] text-ink-500 mb-4">{poem.poet}</p>
      <div className="poem-text text-xs text-ink-500 space-y-1 line-clamp-3">
        {poem.lines.slice(0, 3).map((line, i) => (
          <p key={i} className={line === '' ? 'h-2' : ''}>{line}</p>
        ))}
      </div>
      <div
        className="mt-4 text-[10px] tracking-[0.2em] font-light transition-colors"
        style={{ color: poem.accentColor, opacity: 0.7 }}
      >
        {poem.mood}
      </div>
    </button>
  );
}

export default function Archive() {
  const today = getTodayPoem();
  const [selected, setSelected] = useState(null);
  const headerRef = useReveal();
  const gridRef = useReveal();

  const others = poems.filter((p) => p.id !== today.id);

  const selectedPoem = selected ? poems.find((p) => p.id === selected) : null;

  return (
    <section id="archive" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-20">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">ARCHIVE</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-4">
            시 아카이브
          </h2>
          <p className="text-sm font-light text-ink-500 tracking-wide">
            100년 전 청년 시인들의 목소리가 지금 당신에게 닿습니다.
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-6" />
        </div>

        <div ref={gridRef} className="reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((poem) => (
              <PoemCard
                key={poem.id}
                poem={poem}
                isActive={selected === poem.id}
                onClick={() => setSelected(selected === poem.id ? null : poem.id)}
              />
            ))}
          </div>
        </div>

        {/* Expanded poem view */}
        {selectedPoem && (
          <div className="mt-8 glass-card p-10 reveal visible">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-mist/50 font-light mb-2">{selectedPoem.tag}</p>
                <h3 className="font-serif font-light text-3xl text-ink-100 tracking-wider">
                  〈{selectedPoem.title}〉
                </h3>
                <p className="text-sm font-light tracking-[0.2em] text-ink-500 mt-2">
                  {selectedPoem.poet} · {selectedPoem.year}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-ink-600 hover:text-ink-300 transition-colors p-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="poem-text text-base text-ink-200 space-y-1">
              {selectedPoem.lines.map((line, i) => (
                <p key={i} className={line === '' ? 'h-5' : ''}>{line}</p>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-sm font-light text-ink-400 leading-8 whitespace-pre-line tracking-wide">
                {selectedPoem.background}
              </p>
            </div>
          </div>
        )}

        {/* CTA to subscribe */}
        <div className="text-center mt-16">
          <p className="text-sm font-light text-ink-500 tracking-wide mb-6">
            매일 아침 새로운 시가 뉴스레터로 배달됩니다.
          </p>
          <button
            onClick={() => document.querySelector('#subscribe')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs tracking-[0.25em] font-light border border-ink-600 text-ink-400 hover:border-mist/50 hover:text-mist/80 px-8 py-3 transition-all duration-300"
          >
            뉴스레터 구독하기
          </button>
        </div>
      </div>
    </section>
  );
}

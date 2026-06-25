import useReveal from '../hooks/useReveal';

const stats = [
  { figure: '1위', desc: '2030 청년 사망 원인', sub: '(수년째 자살 — 통계청)' },
  { figure: 'OECD', desc: '청년 자살률 최상위권', sub: '대한민국' },
  { figure: '10만원↑', desc: '심리상담 1회 비용', sub: '실제 이용률 극히 저조' },
  { figure: '35초', desc: '오늘의 시 숏폼', sub: '일상 속 마음 방역' },
];

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: '날 것의 위로',
    desc: '"힘내라"가 아니라\n"버텨내고 있는 네가 이미 충분하다"',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: '1분 이내',
    desc: '일상 속에서 자연스럽게\n스며드는 무해하고 깊은 콘텐츠',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: '편집저작권 IP',
    desc: '100년 전 시인의 언어를\nAI로 재해석한 독점 감성 자산',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16h.42z" />
      </svg>
    ),
    title: 'AI 위기 감지',
    desc: '위기 키워드 감지 시\n자살예방상담전화(109) 연계',
  },
];

function RevealBlock({ children, delay = 0 }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Mission() {
  const headerRef = useReveal();

  return (
    <section id="mission" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-24">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">MISSION</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-6">
            시 한 편으로<br />오늘을 버티게 하는 일
          </h2>
          <p className="text-sm font-light text-ink-400 leading-8 max-w-lg mx-auto tracking-wide">
            저작권이 만료된 근대 시를 생성형 AI로 재해석해,<br />
            매일 아침 2030 청년의 일상에 스며드는 마음 방역 플랫폼.
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-24">
          {stats.map((s, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <div className="bg-[#0a0a08] p-8 text-center">
                <div className="font-serif text-3xl font-light text-ink-100 mb-2" style={{ color: '#8b9ab0' }}>
                  {s.figure}
                </div>
                <div className="text-xs font-light text-ink-300 tracking-wider mb-1">{s.desc}</div>
                <div className="text-[10px] font-light text-ink-600 tracking-wide">{s.sub}</div>
              </div>
            </RevealBlock>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {values.map((v, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div className="glass-card p-8 group hover:border-white/10 transition-colors">
                <div className="text-mist/50 mb-5 group-hover:text-mist/70 transition-colors">{v.icon}</div>
                <h3 className="font-serif font-light text-lg text-ink-100 tracking-wider mb-3">{v.title}</h3>
                <p className="text-sm font-light text-ink-500 leading-7 whitespace-pre-line tracking-wide">{v.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>

        <RevealBlock delay={200}>
          <div className="text-center border border-white/5 p-12">
            <blockquote className="font-serif font-light text-xl md:text-2xl text-ink-200 tracking-wide leading-relaxed mb-6">
              "모두가 자신의 무가치함과 싸우고 있다."
            </blockquote>
            <p className="text-xs tracking-[0.25em] text-ink-600 font-light">
              100년 전 청년 시인의 언어가, 지금 당신에게 닿습니다.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

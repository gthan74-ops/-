import useReveal from '../hooks/useReveal';

const roadmap = [
  {
    phase: '1단계',
    period: '2026 하반기',
    title: '팬덤 확보',
    color: '#8b9ab0',
    goals: ['무료 구독자 10,000명', 'SNS 팔로워 5,000명'],
    tasks: [
      '뉴스레터 인프라 구축',
      '숏폼 일 1편 업로드',
      '베타 테스트 & 피드백',
    ],
    status: 'current',
  },
  {
    phase: '2단계',
    period: '2027년',
    title: '수익화',
    color: '#6b8b6b',
    goals: ['유료 전환 3% (300명)', 'POD 월 매출 300만원'],
    tasks: [
      '프리미엄 구독 론칭',
      '굿즈 커머스 오픈',
      '필사 커뮤니티 앱 MVP',
    ],
    status: 'upcoming',
  },
  {
    phase: '3단계',
    period: '2028년~',
    title: 'B2G 도약',
    color: '#8b7a5a',
    goals: ['B2G MOU 체결', 'AI 위기감지 특허 출원'],
    tasks: [
      'AI 위기감지 특허 출원',
      '복지부 · 수원시 연계',
      '공공 멘탈케어 사업',
    ],
    status: 'future',
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

export default function Roadmap() {
  const headerRef = useReveal();

  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-20">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">ROADMAP</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-4">
            성장 로드맵
          </h2>
          <p className="text-sm font-light text-ink-500 tracking-wide">
            팬덤 → 수익화 → 사회적 영향력
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-mist/20 via-mist/10 to-transparent hidden md:block" />

          <div className="space-y-10">
            {roadmap.map((phase, i) => (
              <RevealBlock key={i} delay={i * 150}>
                <div className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Phase card */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div
                      className={`glass-card p-8 transition-all duration-300 hover:border-white/10 ${
                        phase.status === 'current' ? 'border-opacity-50' : ''
                      }`}
                      style={{ borderColor: phase.status === 'current' ? phase.color + '40' : undefined }}
                    >
                      {phase.status === 'current' && (
                        <div className="flex items-center gap-2 mb-4" style={{ justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: phase.color }} />
                          <span className="text-[10px] tracking-[0.25em] font-light" style={{ color: phase.color }}>
                            진행 중
                          </span>
                        </div>
                      )}

                      <div className="mb-5">
                        <p className="text-[10px] tracking-[0.3em] font-light text-ink-600 mb-2">{phase.period}</p>
                        <h3 className="font-serif font-light text-xl text-ink-100 tracking-wider">{phase.title}</h3>
                      </div>

                      {/* Goals */}
                      <div className="mb-6">
                        {phase.goals.map((g, j) => (
                          <p key={j} className="text-sm font-light tracking-wide text-ink-300 mb-1" style={{ color: phase.color, opacity: 0.85 }}>
                            ✓ {g}
                          </p>
                        ))}
                      </div>

                      {/* Tasks */}
                      <div className={`space-y-2 ${i % 2 === 0 ? 'md:items-end' : ''} flex flex-col`}>
                        {phase.tasks.map((t, j) => (
                          <span key={j} className="text-xs font-light text-ink-500 tracking-wide">
                            · {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 flex-col items-center">
                    <div
                      className="w-3 h-3 border-2 rounded-full"
                      style={{
                        borderColor: phase.color,
                        backgroundColor: phase.status === 'current' ? phase.color : '#0a0a08',
                      }}
                    />
                  </div>

                  {/* Phase badge */}
                  <div className={`flex-1 flex items-start pt-8 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:justify-end'} hidden md:flex`}>
                    <div className="border px-4 py-2" style={{ borderColor: phase.color + '30' }}>
                      <p className="text-xs font-light tracking-[0.2em]" style={{ color: phase.color }}>
                        {phase.phase}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Revenue simulation */}
        <RevealBlock delay={200}>
          <div className="mt-16 border border-white/5 p-10">
            <p className="text-xs tracking-[0.3em] text-ink-600 font-light mb-6 text-center">2027년 수익 시뮬레이션</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: '무료 구독자', value: '10,000명', sub: '× 유료 전환율 3%' },
                { label: '프리미엄 구독', value: '월 147만원', sub: '300명 × ₩4,900' },
                { label: 'POD 커머스', value: '월 300만원', sub: '200건 × ₩15,000' },
              ].map((item, i) => (
                <div key={i} className="text-center py-6">
                  <div className="font-serif text-2xl font-light text-mist/80 mb-2">{item.value}</div>
                  <div className="text-xs font-light text-ink-300 tracking-wider mb-1">{item.label}</div>
                  <div className="text-[10px] font-light text-ink-600 tracking-wide">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 pt-4 border-t border-white/5">
              <p className="text-sm font-serif font-light text-ink-200 tracking-wide">
                합계 <span className="text-mist/80">월 약 450만원</span>
                <span className="text-ink-500 text-xs ml-2">→ B2B 계약 추가 시 스케일업</span>
              </p>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

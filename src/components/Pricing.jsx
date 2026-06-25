import useReveal from '../hooks/useReveal';

const plans = [
  {
    name: '무료',
    price: '₩0',
    period: '/ 월',
    description: '매일 아침 시와 함께 하루를 시작하세요.',
    features: [
      '매일 아침 시 텍스트 뉴스레터',
      'AI 감성 이미지 기본 제공',
      '시인 배경 이야기',
      '시 복사 & 공유',
    ],
    cta: '무료로 시작하기',
    ctaAction: '#subscribe',
    highlight: false,
  },
  {
    name: '프리미엄',
    price: '₩4,900',
    period: '/ 월',
    description: '더 깊이, 더 가까이.',
    features: [
      '모든 무료 혜택 포함',
      '초고화질 AI 배경화면 다운로드',
      'ASMR 낭송 풀버전 (나지막한 독백)',
      '익명 필사 커뮤니티',
      '빗소리 · 초침 사운드스케이프',
      '월간 필사 엽서 PDF',
    ],
    cta: '프리미엄 시작하기',
    ctaAction: '#subscribe',
    highlight: true,
  },
  {
    name: 'B2B',
    price: '문의',
    period: '',
    description: '임직원 멘탈케어 솔루션',
    features: [
      '기업 HR 구독 서비스',
      '임직원 맞춤 큐레이션',
      '팀 필사 소모임 지원',
      '사용 리포트 제공',
      '보건복지부 연계 가능',
    ],
    cta: '도입 문의하기',
    ctaAction: '#subscribe',
    highlight: false,
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

export default function Pricing() {
  const headerRef = useReveal();

  return (
    <section id="pricing" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-20">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">PRICING</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-4">
            구독 플랜
          </h2>
          <p className="text-sm font-light text-ink-500 tracking-wide">
            가식 없이, 부담 없이. 당신의 페이스대로.
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <RevealBlock key={i} delay={i * 100}>
              <div
                className={`relative flex flex-col h-full p-8 transition-all duration-300 hover:scale-[1.01] ${
                  plan.highlight
                    ? 'border border-mist/30 bg-mist-dark/10'
                    : 'glass-card'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] tracking-[0.25em] bg-mist-dark text-ink-100 px-4 py-1 font-light">
                      추천
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <p className="text-xs tracking-[0.25em] text-mist/50 font-light mb-4">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-serif text-3xl font-light text-ink-100">{plan.price}</span>
                    <span className="text-xs font-light text-ink-500">{plan.period}</span>
                  </div>
                  <p className="text-xs font-light text-ink-500 leading-6 tracking-wide">{plan.description}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs font-light text-ink-400 tracking-wide">
                      <span className="text-mist/50 mt-0.5 flex-shrink-0">·</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector(plan.ctaAction)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full text-xs tracking-[0.2em] font-light py-3.5 transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-mist-dark/80 hover:bg-mist-dark text-ink-100'
                      : 'border border-ink-600 text-ink-400 hover:border-ink-400 hover:text-ink-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Note */}
        <RevealBlock delay={300}>
          <p className="text-center text-xs font-light text-ink-600 mt-10 tracking-wide">
            구독은 언제든 해지 가능 · 카드 정보 저장 없음 · 14일 환불 보장
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

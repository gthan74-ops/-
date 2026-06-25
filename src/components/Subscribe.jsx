import { useState } from 'react';
import useReveal from '../hooks/useReveal';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const headerRef = useReveal();
  const formRef = useReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    // Simulate API call (real Stibee API integration goes here)
    await new Promise((r) => setTimeout(r, 1200));

    if (email) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="subscribe" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-xl mx-auto text-center">
        <div ref={headerRef} className="reveal mb-16">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">SUBSCRIBE</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-6">
            매일 아침, 한 편의 시
          </h2>
          <p className="text-sm font-light text-ink-400 leading-8 tracking-wide">
            새벽 빗소리처럼 조용히 받아보세요.<br />
            스팸 없음. 광고 없음. 시만 있습니다.
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-6" />
        </div>

        <div ref={formRef} className="reveal">
          {status === 'success' ? (
            <div className="glass-card p-12 text-center">
              <div className="text-mist/60 mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="font-serif font-light text-xl text-ink-100 tracking-wider mb-4">
                내일 아침을 기다려 주세요.
              </h3>
              <p className="text-sm font-light text-ink-500 leading-7 tracking-wide">
                구독해 주셔서 감사합니다.<br />
                첫 시는 내일 아침에 도착합니다.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 text-xs tracking-[0.2em] font-light text-mist/50 hover:text-mist/80 transition-colors"
              >
                다른 메일도 구독하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className="flex-1 bg-transparent border border-ink-700 focus:border-mist/40 outline-none px-5 py-3.5 text-sm font-light text-ink-200 placeholder:text-ink-600 tracking-wide transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="text-xs tracking-[0.2em] font-light bg-mist-dark/80 hover:bg-mist-dark text-ink-100 px-7 py-3.5 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'loading' ? '구독 중…' : '무료 구독'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-xs font-light text-red-400/70 tracking-wide">
                  오류가 발생했습니다. 다시 시도해 주세요.
                </p>
              )}

              <p className="text-[11px] font-light text-ink-600 tracking-wide leading-6">
                구독하면{' '}
                <span className="text-ink-500">개인정보 처리방침</span>에 동의하는 것으로 간주됩니다.
                언제든 구독 해지 가능합니다.
              </p>
            </form>
          )}

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {['매일 아침 배달', 'AI 감성 이미지', '시인 배경 이야기', '무료 · 즉시 시작'].map((b) => (
              <span key={b} className="text-[10px] tracking-[0.2em] font-light text-ink-600 border border-ink-800 px-3 py-1.5">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

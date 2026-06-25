export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          <div>
            <h3 className="font-serif font-light text-xl tracking-[0.15em] text-ink-200 mb-3">
              오늘의 시
            </h3>
            <p className="text-xs font-light text-ink-600 tracking-wide leading-6 max-w-xs">
              매일 아침 한 편의 시가 당신 곁에 머뭅니다.<br />
              버텨내고 있는 당신이 이미 충분합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.3em] text-ink-600 font-light">서비스</p>
              {['오늘의 시', '시 아카이브', '구독 플랜'].map((l) => (
                <button key={l} className="block text-xs font-light text-ink-500 hover:text-ink-200 tracking-wide transition-colors">
                  {l}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.3em] text-ink-600 font-light">회사</p>
              {['우리의 이야기', '제휴·협업 문의', '개인정보처리방침'].map((l) => (
                <button key={l} className="block text-xs font-light text-ink-500 hover:text-ink-200 tracking-wide transition-colors">
                  {l}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.3em] text-ink-600 font-light">소셜</p>
              {['인스타그램', '유튜브 쇼츠', '뉴스레터'].map((l) => (
                <button key={l} className="block text-xs font-light text-ink-500 hover:text-ink-200 tracking-wide transition-colors">
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4 border-y border-white/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-mist/40" />
          <p className="text-[11px] font-light text-ink-600 tracking-wide">
            지금 힘드시다면 → 자살예방상담전화{' '}
            <a href="tel:109" className="text-mist/60 hover:text-mist/80 transition-colors">109</a>
            {' '}· 정신건강 위기상담{' '}
            <a href="tel:1393" className="text-mist/60 hover:text-mist/80 transition-colors">1393</a>
            {' '}(24시간 · 무료)
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] font-light text-ink-700 tracking-wide">
            © {year} 오늘의 시. All rights reserved.
          </p>
          <p className="text-[11px] font-light text-ink-700 tracking-wide">
            수록된 시는 저작권 만료 공유저작물입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

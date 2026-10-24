import { useState, useEffect } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#today', label: '오늘의 시' },
    { href: '#archive', label: '아카이브' },
    { href: '#community', label: '필사' },
    { href: '#pricing', label: '구독' },
  ];

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a08]/90 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-xl font-light tracking-[0.15em] text-ink-100 hover:text-white transition-colors"
        >
          오늘의 시
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-xs font-light tracking-[0.18em] text-ink-400 hover:text-ink-100 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#subscribe')}
            className="text-xs font-light tracking-[0.2em] border border-ink-600 text-ink-300 px-5 py-2 hover:border-ink-300 hover:text-ink-100 transition-all"
          >
            무료 구독
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span className={`block w-5 h-px bg-ink-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-ink-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0a]/95 backdrop-blur-lg border-b border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-light tracking-[0.15em] text-ink-300 hover:text-ink-100 text-left transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#subscribe')}
            className="text-sm font-light tracking-[0.15em] border border-ink-600 text-ink-300 px-5 py-2.5 hover:border-ink-300 hover:text-ink-100 transition-all w-fit"
          >
            무료 구독
          </button>
        </div>
      )}
    </nav>
  );
}

import { useState } from 'react';
import useReveal from '../hooks/useReveal';

const SAMPLE_POSTS = [
  {
    id: 1,
    poem: '서시',
    poet: '윤동주',
    line: '죽는 날까지 하늘을 우러러\n한 점 부끄럼이 없기를,',
    note: '오늘 면접을 망쳤는데, 이 구절이 자꾸 머릿속에 맴돌았다. 부끄럼 없이 살기란 얼마나 어려운 일인지.',
    time: '새벽 2:17',
    likes: 47,
  },
  {
    id: 2,
    poem: '진달래꽃',
    poet: '김소월',
    line: '나 보기가 역겨워\n가실 때에는\n말없이 고이 보내 드리오리다.',
    note: '말이 없는 게 더 클 때가 있다. 오늘 그런 날이었다.',
    time: '오전 6:03',
    likes: 83,
  },
  {
    id: 3,
    poem: '청포도',
    poet: '이육사',
    line: '내 그를 맞아 이 포도를 따 먹으면\n두 손은 함뿍 적셔도 좋으련,',
    note: '기다리는 사람이 있다는 것만으로 하루를 버틸 수 있다는 걸 알았다.',
    time: '오후 11:44',
    likes: 31,
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

export default function Community() {
  const [liked, setLiked] = useState({});
  const [writing, setWriting] = useState(false);
  const [draft, setDraft] = useState('');
  const headerRef = useReveal();

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="community" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-20">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">COMMUNITY</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-4">
            익명 필사
          </h2>
          <p className="text-sm font-light text-ink-500 tracking-wide">
            시를 옮겨 적고, 오늘의 마음을 남겨두세요.<br />
            이름 없이도, 누군가에게 닿습니다.
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-6" />
        </div>

        {/* Community posts */}
        <div className="space-y-6 mb-10">
          {SAMPLE_POSTS.map((post, i) => (
            <RevealBlock key={post.id} delay={i * 100}>
              <div className="glass-card p-8 group hover:border-white/8 transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border border-ink-700 flex items-center justify-center">
                      <div className="w-2 h-2 bg-ink-600 rounded-full" />
                    </div>
                    <span className="text-[10px] font-light text-ink-600 tracking-[0.2em]">익명의 독자</span>
                  </div>
                  <span className="text-[10px] font-light text-ink-700 tracking-[0.15em]">{post.time}</span>
                </div>

                {/* Poem quote */}
                <blockquote className="poem-text text-sm text-ink-300 mb-5 pl-4 border-l border-mist/20 whitespace-pre-line">
                  {post.line}
                </blockquote>
                <p className="text-[10px] font-light text-ink-600 tracking-wide mb-5">
                  — {post.poet}, 〈{post.poem}〉
                </p>

                {/* Personal note */}
                <p className="text-xs font-light text-ink-400 leading-7 tracking-wide mb-6">{post.note}</p>

                {/* Like */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 group/like transition-colors"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill={liked[post.id] ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={liked[post.id] ? 'text-mist/70' : 'text-ink-600 group-hover/like:text-ink-400'}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className={`text-[10px] font-light tracking-wider ${liked[post.id] ? 'text-mist/70' : 'text-ink-600'}`}>
                      {post.likes + (liked[post.id] ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Write section - premium teaser */}
        <RevealBlock delay={200}>
          {!writing ? (
            <div className="text-center border border-dashed border-ink-800 py-10 px-6">
              <p className="text-xs font-light text-ink-600 tracking-wide mb-5">
                오늘의 시를 필사하고 마음을 남겨보세요
              </p>
              <button
                onClick={() => setWriting(true)}
                className="text-xs tracking-[0.2em] font-light border border-mist/30 text-mist/60 hover:border-mist/60 hover:text-mist/80 px-6 py-2.5 transition-all"
              >
                필사하기 (프리미엄)
              </button>
            </div>
          ) : (
            <div className="glass-card p-8">
              <p className="text-[10px] tracking-[0.3em] text-ink-600 font-light mb-5">익명으로 남겨집니다</p>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="오늘의 시를 옮겨 적고, 마음을 남겨두세요…"
                className="w-full bg-transparent text-sm font-light text-ink-300 placeholder:text-ink-700 outline-none resize-none leading-8 tracking-wide min-h-[120px]"
              />
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => { setWriting(false); setDraft(''); }}
                  className="text-[11px] font-light text-ink-600 hover:text-ink-400 tracking-wide transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert('프리미엄 구독 후 이용 가능합니다.');
                    setWriting(false);
                    setDraft('');
                    document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[11px] tracking-[0.2em] font-light bg-mist-dark/50 hover:bg-mist-dark/80 text-ink-200 px-5 py-2 transition-all"
                >
                  남기기
                </button>
              </div>
            </div>
          )}
        </RevealBlock>
      </div>
    </section>
  );
}

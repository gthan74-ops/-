import { useState, useEffect, useRef } from 'react';
import { getTodayPoem } from '../data/poems';
import useReveal from '../hooks/useReveal';

const PREVIEW_LINES = [
  "죽는 날까지 하늘을 우러러",
  "한 점 부끄럼이 없기를,",
  "잎새에 이는 바람에도",
  "나는 괴로워했다.",
];

export default function Shortform() {
  const poem = getTodayPoem();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progRef = useRef(null);
  const headerRef = useReveal();
  const cardRef = useReveal();

  const lines = poem.lines.filter(l => l !== '').slice(0, 4);

  const startPlay = () => {
    setIsPlaying(true);
    setCurrentLine(0);
    setProgress(0);

    let lineIdx = 0;
    let prog = 0;

    progRef.current = setInterval(() => {
      prog += 1;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(progRef.current);
        setIsPlaying(false);
        setCurrentLine(-1);
        setProgress(0);
        return;
      }
    }, 350);

    intervalRef.current = setInterval(() => {
      lineIdx += 1;
      if (lineIdx >= lines.length) {
        clearInterval(intervalRef.current);
        return;
      }
      setCurrentLine(lineIdx);
    }, 8750);
  };

  const stopPlay = () => {
    clearInterval(intervalRef.current);
    clearInterval(progRef.current);
    setIsPlaying(false);
    setCurrentLine(-1);
    setProgress(0);
  };

  useEffect(() => () => {
    clearInterval(intervalRef.current);
    clearInterval(progRef.current);
  }, []);

  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal text-center mb-20">
          <span className="text-xs tracking-[0.35em] text-mist/50 font-light">SHORTFORM</span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink-100 tracking-wider mt-5 mb-4">
            35초의 위로
          </h2>
          <p className="text-sm font-light text-ink-500 tracking-wide">
            매일 아침 인스타그램 릴스 · 유튜브 쇼츠로 찾아옵니다.
          </p>
          <div className="w-8 h-px bg-mist/20 mx-auto mt-6" />
        </div>

        <div ref={cardRef} className="reveal flex flex-col md:flex-row items-center gap-12">
          {/* Phone mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-56 h-96 border border-ink-700 bg-[#060606] overflow-hidden shadow-2xl"
              style={{ borderRadius: '28px' }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-3 pb-1">
                <span className="text-[9px] text-ink-600">9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-1.5 border border-ink-700 rounded-sm">
                    <div className="w-3/4 h-full bg-ink-600 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Video content */}
              <div className="relative h-[calc(100%-32px)] flex flex-col items-center justify-center px-6">
                {/* Rain visual */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="rain-drop"
                      style={{
                        left: `${8 + i * 8}%`,
                        height: `${30 + Math.random() * 30}px`,
                        animationDuration: `${5 + i * 0.4}s`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.06 + i * 0.004,
                      }}
                    />
                  ))}
                </div>

                {/* Poem lines */}
                <div className="relative z-10 space-y-3 text-center">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className="poem-text text-xs transition-all duration-700"
                      style={{
                        color: isPlaying
                          ? currentLine === i
                            ? '#e8e8e0'
                            : currentLine > i
                            ? '#3c3c38'
                            : '#5a5a54'
                          : '#5a5a54',
                        opacity: isPlaying ? (currentLine === i ? 1 : 0.5) : 0.6,
                        transform: isPlaying && currentLine === i ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Poet credit */}
                <div className="absolute bottom-10 left-0 right-0 text-center">
                  <p className="text-[9px] tracking-[0.2em] text-ink-600 font-light">
                    — {poem.poet}, 〈{poem.title}〉
                  </p>
                </div>

                {/* Play button */}
                {!isPlaying && (
                  <button
                    onClick={startPlay}
                    className="absolute inset-0 flex items-end justify-end p-4"
                  >
                    <div className="w-8 h-8 border border-ink-600 flex items-center justify-center bg-black/40">
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-ink-400 ml-0.5">
                        <path d="M0 0l10 6-10 6V0z" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Progress bar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink-800">
                    <div
                      className="h-full bg-mist/60 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                {/* Stop button */}
                {isPlaying && (
                  <button
                    onClick={stopPlay}
                    className="absolute top-2 right-3 w-6 h-6 flex items-center justify-center"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-600">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <p className="text-center text-[10px] text-ink-600 font-light tracking-[0.2em] mt-4">
              ▶ 탭하여 미리보기
            </p>
          </div>

          {/* Description */}
          <div className="flex-1 space-y-8">
            {[
              {
                icon: '🎙',
                title: '나지막한 독백',
                desc: 'ElevenLabs AI 보이스로 기계음 탈피,\n숨결이 섞인 새벽 낭독 톤',
              },
              {
                icon: '🌧',
                title: '새벽 사운드스케이프',
                desc: '빗소리 · 초침 소리 환경음만,\n인위적 BGM 완전 배제',
              },
              {
                icon: '🎨',
                title: 'AI 감성 아트워크',
                desc: 'Midjourney v6 — 시의 은유를 9:16 세로형\n영상 배경으로 변환',
              },
              {
                icon: '✍',
                title: '타이핑 자막',
                desc: '검은 화면 위 흰 자막,\n화려함 없는 날 것의 연출',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-lg mt-0.5 opacity-60">{item.icon}</span>
                <div>
                  <h4 className="text-sm font-serif font-light text-ink-200 tracking-wider mb-1">{item.title}</h4>
                  <p className="text-xs font-light text-ink-500 leading-6 tracking-wide whitespace-pre-line">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';

function createRainSound(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.12;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 800;
  lowpass.Q.value = 0.5;

  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = 200;

  const gain = ctx.createGain();
  gain.gain.value = 0.18;

  source.connect(lowpass);
  lowpass.connect(highpass);
  highpass.connect(gain);
  gain.connect(ctx.destination);
  source.start();

  return { source, gain };
}

export default function AmbientToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = async () => {
    if (!playing) {
      if (!audioRef.current) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const nodes = createRainSound(ctx);
        audioRef.current = { ctx, ...nodes };
      } else if (audioRef.current.ctx.state === 'suspended') {
        await audioRef.current.ctx.resume();
      }
      setPlaying(true);
    } else {
      if (audioRef.current?.ctx) {
        await audioRef.current.ctx.suspend();
      }
      setPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current?.ctx?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 border flex items-center justify-center transition-all duration-300 group ${
        playing
          ? 'border-mist/50 bg-mist-dark/20'
          : 'border-ink-700 bg-transparent hover:border-ink-500'
      }`}
      aria-label={playing ? '빗소리 끄기' : '빗소리 켜기'}
      title={playing ? '빗소리 끄기' : '빗소리 켜기'}
    >
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mist/70">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-500 group-hover:text-ink-300 transition-colors">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M9 9v9l3-3 3 3V9" opacity=".5" />
          <path d="M21 15V5l-7 1.17" />
        </svg>
      )}
      {playing && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-mist/60 rounded-full animate-pulse" />
      )}
    </button>
  );
}
